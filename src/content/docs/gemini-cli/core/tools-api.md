---
title: "Gemini CLI 코어: 도구 API"
description: "Gemini CLI core의 도구 정의, 등록, 실행 구조와 확장 방법, 주요 내장 도구 및 실행 흐름 설명."
---

# Gemini CLI 코어: 도구 API

Gemini CLI core(`packages/core`)는 도구를 정의, 등록, 실행하는 강력한 시스템을 제공합니다. 이 도구들은 Gemini 모델이 로컬 환경과 상호작용하거나 웹 콘텐츠를 가져오는 등 다양한 작업을 수행할 수 있게 해줍니다.

## 핵심 개념

- **도구(`tools.ts`)**: 모든 도구의 계약을 정의하는 인터페이스 및 기본 클래스(`BaseTool`). 각 도구는 다음을 가져야 합니다:
  - `name`: 내부적으로 고유한 이름(API 호출 시 사용)
  - `displayName`: 사용자 친화적 이름
  - `description`: 도구의 기능 설명(모델에 제공)
  - `parameterSchema`: 도구가 받는 파라미터의 JSON 스키마(모델이 올바르게 호출할 수 있도록 필수)
  - `validateToolParams()`: 파라미터 유효성 검사 메서드
  - `getDescription()`: 특정 파라미터로 실행 전 설명 반환
  - `shouldConfirmExecute()`: 실행 전 사용자 확인 필요 여부 반환(파괴적 작업 등)
  - `execute()`: 도구의 핵심 동작을 수행하고 `ToolResult` 반환

- **`ToolResult`(`tools.ts`)**: 도구 실행 결과 구조 정의
  - `llmContent`: LLM에 전달할 사실 기반 문자열(대화 이력에 포함)
  - `returnDisplay`: 사용자에게 보여줄 문자열(마크다운 등) 또는 특수 객체(예: `FileDiff`)

- **도구 레지스트리(`tool-registry.ts`)**: `ToolRegistry` 클래스는 다음을 담당합니다:
  - **도구 등록:** 내장 도구(`ReadFileTool`, `ShellTool` 등) 관리
  - **도구 동적 탐색:**
    - **명령 기반 탐색:** `settings.json`에 `toolDiscoveryCommand`가 설정되면, 해당 명령 실행 결과(JSON)를 파싱해 커스텀 도구(`DiscoveredTool`)로 등록
    - **MCP 기반 탐색:** `mcpServerCommand`가 설정된 경우, MCP 서버에 연결해 도구(`DiscoveredMCPTool`) 등록
  - **스키마 제공:** 모든 등록 도구의 `FunctionDeclaration` 스키마를 모델에 제공
  - **도구 조회:** 이름으로 도구를 검색해 실행

## 내장 도구

코어에는 `packages/core/src/tools/`에 위치한 다양한 내장 도구가 포함되어 있습니다:

- **파일 시스템 도구:**
  - `LSTool`(`ls.ts`): 디렉토리 목록 조회
  - `ReadFileTool`(`read-file.ts`): 파일 내용 읽기(절대 경로 필요)
  - `WriteFileTool`(`write-file.ts`): 파일 내용 쓰기
  - `GrepTool`(`grep.ts`): 패턴 검색
  - `GlobTool`(`glob.ts`): glob 패턴으로 파일 찾기
  - `EditTool`(`edit.ts`): 파일 인플레이스 수정(확인 필요)
  - `ReadManyFilesTool`(`read-many-files.ts`): 여러 파일/패턴 내용 읽기 및 결합(`@` 명령에서 사용)
- **실행 도구:**
  - `ShellTool`(`shell.ts`): 임의 셸 명령 실행(샌드박싱 및 확인 필요)
- **웹 도구:**
  - `WebFetchTool`(`web-fetch.ts`): URL에서 콘텐츠 가져오기
  - `WebSearchTool`(`web-search.ts`): 웹 검색
- **메모리 도구:**
  - `MemoryTool`(`memoryTool.ts`): AI 메모리와 상호작용

각 도구는 `BaseTool`을 상속하며, 고유 기능에 맞는 메서드를 구현합니다.

## 도구 실행 흐름

1. **모델 요청:** Gemini 모델이 도구 스키마를 참고해 도구 사용을 결정, `FunctionCall` 형태로 요청 반환
2. **코어 수신:** 코어가 해당 요청을 파싱
3. **도구 조회:** `ToolRegistry`에서 도구 검색
4. **파라미터 검증:** 도구의 `validateToolParams()` 실행
5. **실행 전 확인(필요시):**
    - `shouldConfirmExecute()` 결과에 따라 CLI에 사용자 확인 요청
    - 사용자의 결정(진행/취소 등)을 코어에 전달
6. **실행:** 검증 및 확인 후, 도구의 `execute()`를 인자와 `AbortSignal`과 함께 호출
7. **결과 처리:** `ToolResult`를 코어가 수신
8. **모델 응답:** `llmContent`를 `FunctionResponse`로 모델에 전달
9. **사용자 표시:** `returnDisplay`를 CLI에 전달해 결과 표시

## 커스텀 도구 확장

일반 사용자가 직접 도구를 등록하는 워크플로우는 명시적이지 않으나, 아키텍처상 확장이 가능합니다:

- **명령 기반 탐색:** 고급 사용자는 `settings.json`에 `toolDiscoveryCommand`를 정의해, 명령 실행 결과(JSON)를 커스텀 도구로 등록할 수 있습니다. 실제 실행은 `toolCallCommand`가 담당합니다.
- **MCP 서버:** 복잡한 환경에서는 하나 이상의 MCP 서버를 `mcpServers` 설정에 추가해, 해당 서버에서 제공하는 도구를 사용할 수 있습니다. 여러 MCP 서버가 있을 경우, 도구 이름은 서버 별칭이 접두사로 붙습니다(예: `serverAlias__actualToolName`).

이 도구 시스템을 통해 Gemini CLI는 다양한 작업에 대응하는 유연하고 강력한 어시스턴트가 됩니다. 