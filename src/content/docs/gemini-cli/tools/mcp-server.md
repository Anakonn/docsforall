---
title: "MCP 서버 연동 가이드"
description: "Gemini CLI에서 MCP(Model Context Protocol) 서버를 연동·설정·활용하는 방법과 구조, 주요 옵션, 문제 해결 안내."
---

# Gemini CLI의 MCP 서버 연동

이 문서는 Gemini CLI에서 Model Context Protocol(MCP) 서버를 연동·설정·활용하는 방법을 안내합니다.

## MCP 서버란?

MCP 서버는 Gemini CLI가 Model Context Protocol을 통해 외부 시스템/데이터 소스와 상호작용할 수 있도록 도구와 리소스를 노출하는 애플리케이션입니다. Gemini 모델과 로컬 환경, API 등 외부 서비스 간 브릿지 역할을 합니다.

MCP 서버를 통해 Gemini CLI는 다음을 수행할 수 있습니다:
- **도구 탐색:** 표준화된 스키마로 도구 목록, 설명, 파라미터 확인
- **도구 실행:** 인자와 함께 도구 호출, 구조화된 응답 수신
- **리소스 접근:** (주로 도구 실행에 집중)

MCP 서버를 활용하면 데이터베이스, API, 커스텀 스크립트, 특화 워크플로 등 내장 기능을 넘어 Gemini CLI의 기능을 확장할 수 있습니다.

## 코어 통합 구조

Gemini CLI는 core 패키지(`packages/core/src/tools/`)에 내장된 탐색/실행 시스템을 통해 MCP 서버와 연동합니다.

### 탐색 레이어(`mcp-client.ts`)

- `discoverMcpTools()`가 다음을 수행:
  1. `settings.json`의 `mcpServers` 목록 순회
  2. 서버별 전송 방식(표준입출력, SSE, HTTP 스트리밍)로 연결
  3. MCP 프로토콜로 도구 정의 가져오기
  4. Gemini API 호환성 검증/정제
  5. 충돌 해결하며 글로벌 레지스트리에 등록

### 실행 레이어(`mcp-tool.ts`)

- 각 MCP 도구는 `DiscoveredMCPTool` 인스턴스로 래핑되어:
  - 신뢰 설정/사용자 확인 로직 처리
  - 도구 실행 및 응답 가공
  - 연결 상태/타임아웃 관리

### 전송 방식

- **표준입출력:** 서브프로세스 생성, stdin/stdout으로 통신
- **SSE:** Server-Sent Events 엔드포인트 연결
- **HTTP 스트리밍:** HTTP 스트림으로 통신

## MCP 서버 설정 방법

`settings.json`의 `mcpServers` 설정을 통해 MCP 서버를 등록합니다(글로벌: `~/.gemini/settings.json`, 프로젝트별: `.gemini/settings.json`).

### 설정 구조 예시

```json
{
  "mcpServers": {
    "serverName": {
      "command": "path/to/server",
      "args": ["--arg1", "value1"],
      "env": { "API_KEY": "$MY_API_TOKEN" },
      "cwd": "./server-directory",
      "timeout": 30000,
      "trust": false
    }
  }
}
```

- **필수:**
  - `command`(표준입출력), `url`(SSE), `httpUrl`(HTTP 스트리밍) 중 하나
- **선택:**
  - `args`, `headers`, `env`, `cwd`, `timeout`, `trust` 등

#### 다양한 예시(파이썬, Node.js, Docker, HTTP)

(원문 예시 JSON 참고)

## 탐색 프로세스 상세

1. 서버별 상태 추적 및 연결 시도
2. 도구 목록/스키마 가져오기 및 검증
3. 이름 충돌 시 첫 등록 우선, 이후는 접두사(`serverName__toolName`) 자동 부여
4. 스키마 정제(불필요 속성 제거 등)
5. 연결 유지/정리

## 도구 실행 흐름

1. 모델이 `FunctionCall`로 도구명/인자 지정
2. 코어가 파라미터 검증 후 MCP 서버에 호출
3. 결과를 LLM/사용자에 맞게 가공해 반환

## 확인 및 신뢰 설정

- `trust` 옵션이 true면 모든 확인 생략(신뢰 서버만 권장)
- 서버/도구별 allow-list로 세분화 가능
- 사용자 선택: 1회 실행/도구 항상 허용/서버 항상 허용/취소

## /mcp 명령어로 상태 확인

- 서버 목록, 연결 상태, 도구 목록, 탐색 상태 등 표시
- 예시 출력 참고

## 상태 모니터링 및 문제 해결

- 연결 상태: DISCONNECTED/CONNECTING/CONNECTED
- 탐색 상태: NOT_STARTED/IN_PROGRESS/COMPLETED
- 주요 문제(연결 불가, 도구 미탐색, 실행 실패, 샌드박스 호환 등)와 해결법 안내
- 디버그 모드, 로그 확인, 독립 테스트, 점진적 구축 권장

## 참고사항

- **보안:** trust 옵션, API 키/토큰 관리, 샌드박스 내 MCP 서버 준비, 민감 정보 노출 주의
- **성능:** 연결 유지, 미사용 서버 자동 정리, 타임아웃/리소스 관리
- **스키마 호환:** 불필요 속성 자동 제거, 이름 정제, 충돌 자동 해결

이처럼 MCP 서버 연동은 Gemini CLI의 확장성과 보안, 신뢰성을 모두 만족시키는 강력한 방법입니다. 