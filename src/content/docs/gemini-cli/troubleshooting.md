---
title: "문제 해결 가이드"
description: "Gemini CLI의 자주 발생하는 문제, 오류 메시지, 디버깅 팁을 안내합니다."
---

# 문제 해결 가이드

이 가이드는 자주 발생하는 문제와 디버깅 팁을 제공합니다.

## 인증 관련

- **오류: `Failed to login. Message: Request contains an invalid argument`**
  - Google Workspace 계정 또는 Gmail과 연결된 Google Cloud 계정 사용자는 Google Code Assist 무료 플랜을 활성화하지 못할 수 있습니다.
  - Google Cloud 계정의 경우, `GOOGLE_CLOUD_PROJECT`를 프로젝트 ID로 설정하면 해결할 수 있습니다.
  - [AI Studio](https://aistudio.google.com/app/apikey)에서 API 키를 발급받아 별도의 무료 티어를 사용할 수도 있습니다.

## 자주 묻는 질문(FAQ)

- **Q: Gemini CLI를 최신 버전으로 업데이트하려면?**
  - A: 전역 npm 설치 시 `npm install -g @google/gemini-cli@latest`로 업데이트하세요. 소스에서 실행 시에는 저장소를 pull한 뒤 `npm run build`로 빌드하세요.

- **Q: Gemini CLI 설정 파일은 어디에 저장되나요?**
  - A: 홈 디렉토리와 프로젝트 루트의 `.gemini/` 폴더 내 `settings.json` 파일에 저장됩니다. 자세한 내용은 [CLI 설정](/gemini-cli/cli/configuration) 문서를 참고하세요.

- **Q: stats 출력에 캐시 토큰 카운트가 보이지 않아요.**
  - A: 캐시 토큰 정보는 캐시 토큰이 사용될 때만 표시됩니다. 이 기능은 API 키 사용자(Gemini API 키, Vertex AI)에게만 제공되며, OAuth 사용자(개인/기업 Google 계정)는 지원되지 않습니다. 전체 토큰 사용량은 `/stats` 명령어로 확인할 수 있습니다.

## 일반적인 오류 메시지 및 해결법

- **오류: `EADDRINUSE` (Address already in use) - MCP 서버 시작 시**
  - **원인:** 이미 해당 포트를 사용하는 프로세스가 있음
  - **해결:** 해당 프로세스를 종료하거나 MCP 서버의 포트를 변경하세요.

- **오류: Command not found (Gemini CLI 실행 시)**
  - **원인:** Gemini CLI가 올바르게 설치되지 않았거나 PATH에 없음
  - **해결:**
    1. 설치가 정상적으로 완료됐는지 확인
    2. 전역 설치 시 npm 글로벌 바이너리 경로가 PATH에 포함됐는지 확인
    3. 소스 실행 시 올바른 명령어 사용(예: `node packages/cli/dist/index.js ...`)

- **오류: `MODULE_NOT_FOUND` 또는 import 오류**
  - **원인:** 의존성 미설치 또는 빌드 미실행
  - **해결:**
    1. `npm install`로 의존성 설치
    2. `npm run build`로 프로젝트 빌드

- **오류: "Operation not permitted", "Permission denied" 등**
  - **원인:** 샌드박스 활성화 시, 프로젝트 디렉토리 또는 시스템 임시 디렉토리 외부 접근 시도
  - **해결:** [샌드박싱](/gemini-cli/cli/configuration#sandboxing) 문서에서 샌드박스 설정 방법 참고

- **CLI가 CI 환경에서 상호작용하지 않음**
  - **문제:** `CI_`로 시작하는 환경 변수가 설정된 경우, CLI가 비상호작용 모드로 동작
  - **원인:** UI 프레임워크에서 `CI`, `CONTINUOUS_INTEGRATION`, `CI_` 접두 환경 변수를 감지해 비상호작용 환경으로 인식
  - **해결:** 해당 변수가 필요 없다면, 명령 실행 시 임시로 해제하세요. 예: `env -u CI_TOKEN gemini`

## 디버깅 팁

- **CLI 디버깅:**
  - CLI 명령에 `--verbose` 플래그 사용
  - 사용자별 설정/캐시 디렉토리의 CLI 로그 확인

- **코어 디버깅:**
  - 서버 콘솔 출력에서 에러 메시지/스택트레이스 확인
  - 로그 레벨을 높여 상세 정보 확인
  - Node.js 디버깅 도구(예: `node --inspect`)로 서버 코드 단계별 실행

- **도구 문제:**
  - 특정 도구가 실패할 경우, 해당 명령/작업을 단순화해 직접 실행해보세요.
  - `run_shell_command`는 셸에서 직접 명령이 동작하는지 확인
  - 파일 시스템 도구는 경로/권한을 재확인

- **사전 점검:**
  - 커밋 전 항상 `npm run preflight` 실행. 포맷, 린트, 타입 오류 등 대부분의 문제를 사전에 잡을 수 있습니다.

문서에 없는 문제는 GitHub 이슈 트래커에서 검색하거나, 상세 정보를 포함해 새 이슈를 등록해 주세요. 