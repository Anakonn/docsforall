---
title: "Gemini CLI 설정"
description: "Gemini CLI의 환경 변수, 명령줄 인수, 설정 파일을 통한 동작 구성 방법을 안내합니다."
---

# Gemini CLI 설정

Gemini CLI는 환경 변수, 명령줄 인수, 설정 파일을 포함한 여러 방법으로 동작을 구성할 수 있습니다. 이 문서는 다양한 구성 방법과 사용 가능한 설정을 설명합니다.

## 구성 계층

구성은 다음 우선순위 순서로 적용됩니다(낮은 숫자는 높은 숫자에 의해 덮어씀):

1. **기본값:** 애플리케이션 내 하드코딩된 기본값
2. **사용자 설정 파일:** 현재 사용자의 전역 설정
3. **프로젝트 설정 파일:** 프로젝트별 설정
4. **환경 변수:** 시스템 전체 또는 세션별 변수, `.env` 파일에서 로드될 수 있음
5. **명령줄 인수:** CLI 실행 시 전달된 값

## 사용자 설정 파일과 프로젝트 설정 파일

Gemini CLI는 영구 구성을 위해 `settings.json` 파일을 사용합니다. 이 파일들은 두 위치에 있습니다:

- **사용자 설정 파일:**
  - **위치:** `~/.gemini/settings.json` (`~`는 홈 디렉토리)
  - **범위:** 현재 사용자의 모든 Gemini CLI 세션에 적용
- **프로젝트 설정 파일:**
  - **위치:** 프로젝트 루트 디렉토리 내 `.gemini/settings.json`
  - **범위:** 해당 특정 프로젝트에서 Gemini CLI를 실행할 때만 적용. 프로젝트 설정이 사용자 설정을 덮어씀

**설정에서 환경 변수 참고:** `settings.json` 파일의 문자열 값은 `$VAR_NAME` 또는 `${VAR_NAME}` 구문을 사용해 환경 변수를 참조할 수 있습니다. 이 변수들은 설정이 로드될 때 자동으로 해석됩니다. 예를 들어, 환경 변수 `MY_API_TOKEN`이 있다면 `settings.json`에서 다음과 같이 사용할 수 있습니다: `"apiKey": "$MY_API_TOKEN"`

### 프로젝트의 `.gemini` 디렉토리

프로젝트 설정 파일 외에도, 프로젝트의 `.gemini` 디렉토리는 Gemini CLI 운영과 관련된 다른 프로젝트별 파일들을 포함할 수 있습니다:

- [커스텀 샌드박스 프로필](#sandboxing) (예: `.gemini/sandbox-macos-custom.sb`, `.gemini/sandbox.Dockerfile`)

### `settings.json`에서 사용 가능한 설정:

- **`contextFileName`** (문자열 또는 문자열 배열):
  - **설명:** 컨텍스트 파일의 파일명을 지정합니다(예: `GEMINI.md`, `AGENTS.md`). 단일 파일명 또는 허용된 파일명 목록일 수 있습니다.
  - **기본값:** `GEMINI.md`
  - **예시:** `"contextFileName": "AGENTS.md"`

- **`bugCommand`** (객체):
  - **설명:** `/bug` 명령어의 기본 URL을 덮어씁니다.
  - **기본값:** `"urlTemplate": "https://github.com/google-gemini/gemini-cli/issues/new?template=bug_report.yml&title={title}&info={info}"`
  - **속성:**
    - **`urlTemplate`** (문자열): `{title}`과 `{info}` 플레이스홀더를 포함할 수 있는 URL
  - **예시:**
    ```json
    "bugCommand": {
      "urlTemplate": "https://bug.example.com/new?title={title}&info={info}"
    }
    ```

- **`fileFiltering`** (객체):
  - **설명:** @ 명령어와 파일 검색 도구에 대한 git 인식 파일 필터링 동작을 제어합니다.
  - **기본값:** `"respectGitIgnore": true, "enableRecursiveFileSearch": true`
  - **속성:**
    - **`respectGitIgnore`** (불린): 파일 검색 시 .gitignore 패턴을 존중할지 여부. `true`로 설정하면 git-ignored 파일(`node_modules/`, `dist/`, `.env` 등)이 @ 명령어와 파일 목록 작업에서 자동으로 제외됩니다.
    - **`enableRecursiveFileSearch`** (불린): 프롬프트에서 @ 접두사를 완성할 때 현재 트리 아래에서 파일명을 재귀적으로 검색할지 여부
  - **예시:**
    ```json
    "fileFiltering": {
      "respectGitIgnore": true,
      "enableRecursiveFileSearch": false
    }
    ```

- **`coreTools`** (문자열 배열):
  - **설명:** 모델에 사용 가능하게 할 핵심 도구 이름 목록을 지정할 수 있습니다. 내장 도구 세트를 제한하는 데 사용할 수 있습니다. 핵심 도구 목록은 [내장 도구](/gemini-cli/core/tools-api#built-in-tools)를 참고하세요. `ShellTool`과 같이 지원하는 도구에 대해 명령별 제한도 지정할 수 있습니다. 예를 들어, `"coreTools": ["ShellTool(ls -l)"]`은 `ls -l` 명령어만 실행을 허용합니다.
  - **기본값:** Gemini 모델이 사용할 수 있는 모든 도구
  - **예시:** `"coreTools": ["ReadFileTool", "GlobTool", "ShellTool(ls)"]`

- **`excludeTools`** (문자열 배열):
  - **설명:** 모델에서 제외할 핵심 도구 이름 목록을 지정할 수 있습니다. `excludeTools`와 `coreTools` 모두에 나열된 도구는 제외됩니다. `ShellTool`과 같이 지원하는 도구에 대해 명령별 제한도 지정할 수 있습니다. 예를 들어, `"excludeTools": ["ShellTool(rm -rf)"]`는 `rm -rf` 명령어를 차단합니다.
  - **기본값**: 제외된 도구 없음
  - **예시:** `"excludeTools": ["run_shell_command", "findFiles"]`
  - **보안 참고:** `excludeTools`에서 `run_shell_command`의 명령별 제한은 단순 문자열 매칭을 기반으로 하며 쉽게 우회될 수 있습니다. 이 기능은 **보안 메커니즘이 아니며** 신뢰할 수 없는 코드를 안전하게 실행하는 데 의존해서는 안 됩니다. 실행할 수 있는 명령어를 명시적으로 선택하기 위해 `coreTools`를 사용하는 것을 권장합니다.

- **`autoAccept`** (불린):
  - **설명:** CLI가 안전한 것으로 간주되는 도구 호출(예: 읽기 전용 작업)을 명시적인 사용자 확인 없이 자동으로 수락하고 실행할지 제어합니다. `true`로 설정하면 CLI가 안전한 것으로 간주되는 도구에 대한 확인 프롬프트를 건너뜁니다.
  - **기본값:** `false`
  - **예시:** `"autoAccept": true`

- **`theme`** (문자열):
  - **설명:** Gemini CLI의 시각적 [테마](/gemini-cli/cli/themes)를 설정합니다.
  - **기본값:** `"Default"`
  - **예시:** `"theme": "GitHub"`

- **`sandbox`** (불린 또는 문자열):
  - **설명:** 도구 실행을 위한 샌드박싱 사용 여부와 방법을 제어합니다. `true`로 설정하면 Gemini CLI는 사전 빌드된 `gemini-cli-sandbox` Docker 이미지를 사용합니다. 자세한 내용은 [샌드박싱](#sandboxing)을 참고하세요.
  - **기본값:** `false`
  - **예시:** `"sandbox": "docker"`

- **`toolDiscoveryCommand`** (문자열):
  - **설명:** 프로젝트에서 도구를 검색하기 위한 커스텀 셸 명령어를 정의합니다. 셸 명령어는 `stdout`에서 [함수 선언](https://ai.google.dev/gemini-api/docs/function-calling#function-declarations)의 JSON 배열을 반환해야 합니다. 도구 래퍼는 선택사항입니다.
  - **기본값:** 비어있음
  - **예시:** `"toolDiscoveryCommand": "bin/get_tools"`

- **`toolCallCommand`** (문자열):
  - **설명:** `toolDiscoveryCommand`를 사용해 검색된 특정 도구를 호출하기 위한 커스텀 셸 명령어를 정의합니다. 셸 명령어는 다음 기준을 충족해야 합니다:
    - 첫 번째 명령줄 인수로 함수 `name`([함수 선언](https://ai.google.dev/gemini-api/docs/function-calling#function-declarations)과 정확히 동일)을 받아야 합니다.
    - `stdin`에서 JSON으로 함수 인수를 읽어야 합니다([`functionCall.args`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#functioncall)와 유사).
    - `stdout`에서 JSON으로 함수 출력을 반환해야 합니다([`functionResponse.response.content`](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference#functionresponse)와 유사).
  - **기본값:** 비어있음
  - **예시:** `"toolCallCommand": "bin/call_tool"`

- **`mcpServers`** (객체):
  - **설명:** 커스텀 도구 검색 및 사용을 위한 하나 이상의 Model-Context Protocol (MCP) 서버 연결을 구성합니다. Gemini CLI는 사용 가능한 도구를 검색하기 위해 각 구성된 MCP 서버에 연결을 시도합니다. 여러 MCP 서버가 동일한 이름의 도구를 노출하는 경우, 충돌을 피하기 위해 도구 이름에 구성에서 정의한 서버 별칭이 접두사로 붙습니다(예: `serverAlias__actualToolName`). 시스템이 호환성을 위해 MCP 도구 정의에서 특정 스키마 속성을 제거할 수 있습니다.
  - **기본값:** 비어있음
  - **속성:**
    - **`<SERVER_NAME>`** (객체): 명명된 서버의 서버 매개변수
      - `command` (문자열, 필수): MCP 서버를 시작하기 위해 실행할 명령어
      - `args` (문자열 배열, 선택사항): 명령어에 전달할 인수
      - `env` (객체, 선택사항): 서버 프로세스에 설정할 환경 변수
      - `cwd` (문자열, 선택사항): 서버를 시작할 작업 디렉토리
      - `timeout` (숫자, 선택사항): 이 MCP 서버에 대한 요청의 타임아웃(밀리초)
      - `trust` (불린, 선택사항): 이 서버를 신뢰하고 모든 도구 호출 확인을 건너뜀
  - **예시:**
    ```json
    "mcpServers": {
      "myPythonServer": {
        "command": "python",
        "args": ["mcp_server.py", "--port", "8080"],
        "cwd": "./mcp_tools/python",
        "timeout": 5000
      },
      "myNodeServer": {
        "command": "node",
        "args": ["mcp_server.js"],
        "cwd": "./mcp_tools/node"
      },
      "myDockerServer": {
        "command": "docker",
        "args": ["run", "i", "--rm", "-e", "API_KEY", "ghcr.io/foo/bar"],
        "env": {
          "API_KEY": "$MY_API_TOKEN"
        }
      }
    }
    ```

- **`checkpointing`** (객체):
  - **설명:** 대화 및 파일 상태를 저장하고 복원할 수 있는 체크포인팅 기능을 구성합니다. 자세한 내용은 [체크포인팅 문서](/gemini-cli/checkpointing)를 참고하세요.
  - **기본값:** `{"enabled": false}`
  - **속성:**
    - **`enabled`** (불린): `true`일 때 `/restore` 명령어가 사용 가능합니다.

- **`preferredEditor`** (문자열):
  - **설명:** diff 보기에 사용할 선호 편집기를 지정합니다.
  - **기본값:** `vscode`
  - **예시:** `"preferredEditor": "vscode"`

- **`telemetry`** (객체)
  - **설명:** Gemini CLI의 로깅 및 메트릭 수집을 구성합니다. 자세한 내용은 [텔레메트리](/gemini-cli/telemetry)를 참고하세요.
  - **기본값:** `{"enabled": false, "target": "local", "otlpEndpoint": "http://localhost:4317", "logPrompts": true}`
  - **속성:**
    - **`enabled`** (불린): 텔레메트리 활성화 여부
    - **`target`** (문자열): 수집된 텔레메트리의 대상. 지원되는 값은 `local`과 `gcp`입니다.
    - **`otlpEndpoint`** (문자열): OTLP Exporter의 엔드포인트
    - **`logPrompts`** (불린): 로그에 사용자 프롬프트 내용을 포함할지 여부
  - **예시:**
    ```json
    "telemetry": {
      "enabled": true,
      "target": "local",
      "otlpEndpoint": "http://localhost:16686",
      "logPrompts": false
    }
    ```

- **`usageStatisticsEnabled`** (불린):
  - **설명:** 사용 통계 수집을 활성화하거나 비활성화합니다. 자세한 내용은 [사용 통계](#usage-statistics)를 참고하세요.
  - **기본값:** `true`
  - **예시:**
    ```json
    "usageStatisticsEnabled": false
    ```

- **`hideTips`** (불린):
  - **설명:** CLI 인터페이스의 도움말 팁을 활성화하거나 비활성화합니다.
  - **기본값:** `false`
  - **예시:**
    ```json
    "hideTips": true
    ```

### `settings.json` 예시:

```json
{
  "theme": "GitHub",
  "sandbox": "docker",
  "toolDiscoveryCommand": "bin/get_tools",
  "toolCallCommand": "bin/call_tool",
  "mcpServers": {
    "mainServer": {
      "command": "bin/mcp_server.py"
    },
    "anotherServer": {
      "command": "node",
      "args": ["mcp_server.js", "--verbose"]
    }
  },
  "telemetry": {
    "enabled": true,
    "target": "local",
    "otlpEndpoint": "http://localhost:4317",
    "logPrompts": true
  },
  "usageStatisticsEnabled": true,
  "hideTips": false
}
```

## 셸 히스토리

CLI는 실행한 셸 명령어의 히스토리를 유지합니다. 다른 프로젝트 간의 충돌을 피하기 위해 이 히스토리는 사용자 홈 폴더 내 프로젝트별 디렉토리에 저장됩니다.

- **위치:** `~/.gemini/tmp/<project_hash>/shell_history`
  - `<project_hash>`는 프로젝트 루트 경로에서 생성된 고유 식별자입니다.
  - 히스토리는 `shell_history`라는 파일에 저장됩니다.

## 환경 변수 및 `.env` 파일

환경 변수는 애플리케이션을 구성하는 일반적인 방법으로, 특히 API 키와 같은 민감한 정보나 환경 간에 변경될 수 있는 설정에 유용합니다.

CLI는 `.env` 파일에서 환경 변수를 자동으로 로드합니다. 로드 순서는 다음과 같습니다:

1. 현재 작업 디렉토리의 `.env` 파일
2. 찾지 못한 경우, `.env` 파일을 찾거나 프로젝트 루트(`.git` 폴더로 식별) 또는 홈 디렉토리에 도달할 때까지 상위 디렉토리에서 위로 검색
3. 여전히 찾지 못한 경우, `~/.env`(사용자 홈 디렉토리)를 찾음

- **`GEMINI_API_KEY`** (필수):
  - Gemini API용 API 키
  - **운영에 중요.** 이 없으면 CLI가 작동하지 않습니다.
  - 셸 프로필(예: `~/.bashrc`, `~/.zshrc`) 또는 `.env` 파일에 설정하세요.
- **`GEMINI_MODEL`**:
  - 사용할 기본 Gemini 모델을 지정합니다.
  - 하드코딩된 기본값을 덮어씀
  - 예시: `export GEMINI_MODEL="gemini-2.5-flash"`
- **`GOOGLE_API_KEY`**:
  - Google Cloud API 키
  - Express 모드에서 Vertex AI 사용에 필요
  - 필요한 권한이 있고 `GOOGLE_GENAI_USE_VERTEXAI=true` 환경 변수를 설정했는지 확인하세요.
  - 예시: `export GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY"`
- **`GOOGLE_CLOUD_PROJECT`**:
  - Google Cloud 프로젝트 ID
  - Code Assist 또는 Vertex AI 사용에 필요
  - Vertex AI를 사용하는 경우 필요한 권한이 있고 `GOOGLE_GENAI_USE_VERTEXAI=true` 환경 변수를 설정했는지 확인하세요.
  - 예시: `export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"`
- **`GOOGLE_APPLICATION_CREDENTIALS`** (문자열):
  - **설명:** Google Application Credentials JSON 파일의 경로
  - **예시:** `export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/credentials.json"`
- **`OTLP_GOOGLE_CLOUD_PROJECT`**:
  - Google Cloud의 텔레메트리용 Google Cloud 프로젝트 ID
  - 예시: `export OTLP_GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"`
- **`GOOGLE_CLOUD_LOCATION`**:
  - Google Cloud 프로젝트 위치(예: us-central1)
  - 비-express 모드에서 Vertex AI 사용에 필요
  - Vertex AI를 사용하는 경우 필요한 권한이 있고 `GOOGLE_GENAI_USE_VERTEXAI=true` 환경 변수를 설정했는지 확인하세요.
  - 예시: `export GOOGLE_CLOUD_LOCATION="YOUR_PROJECT_LOCATION"`
- **`GEMINI_SANDBOX`**:
  - `settings.json`의 `sandbox` 설정 대안
  - `true`, `false`, `docker`, `podman` 또는 커스텀 명령어 문자열을 받음
- **`SEATBELT_PROFILE`** (macOS 전용):
  - macOS에서 Seatbelt(`sandbox-exec`) 프로필을 전환합니다.
  - `permissive-open`: (기본값) 프로젝트 폴더에 대한 쓰기를 제한하지만 다른 작업을 허용합니다(`packages/cli/src/utils/sandbox-macos-permissive-open.sb` 참고).
  - `strict`: 기본적으로 작업을 거부하는 엄격한 프로필을 사용합니다.
  - `<profile_name>`: 커스텀 프로필을 사용합니다. 커스텀 프로필을 정의하려면 프로젝트의 `.gemini/` 디렉토리에 `sandbox-macos-<profile_name>.sb`라는 파일을 생성하세요(예: `my-project/.gemini/sandbox-macos-custom.sb`).
- **`DEBUG` 또는 `DEBUG_MODE`** (기본 라이브러리나 CLI 자체에서 자주 사용):
  - `true` 또는 `1`로 설정하여 문제 해결에 도움이 되는 자세한 디버그 로깅을 활성화합니다.
- **`NO_COLOR`**:
  - CLI의 모든 색상 출력을 비활성화하려면 어떤 값으로든 설정하세요.
- **`CLI_TITLE`**:
  - CLI의 제목을 커스터마이징하려면 문자열로 설정하세요.
- **`CODE_ASSIST_ENDPOINT`**:
  - 코드 어시스트 서버의 엔드포인트를 지정합니다.
  - 개발 및 테스트에 유용합니다.

## 명령줄 인수

CLI 실행 시 직접 전달된 인수는 해당 특정 세션의 다른 구성을 덮어쓸 수 있습니다.

- **`--model <model_name>`** (**`-m <model_name>`**):
  - 이 세션에 사용할 Gemini 모델을 지정합니다.
  - 예시: `npm start -- --model gemini-1.5-pro-latest`
- **`--prompt <your_prompt>`** (**`-p <your_prompt>`**):
  - 명령어에 프롬프트를 직접 전달하는 데 사용됩니다. 이는 Gemini CLI를 비상호작용 모드로 호출합니다.
- **`--sandbox`** (**`-s`**):
  - 이 세션에 대해 샌드박스 모드를 활성화합니다.
- **`--sandbox-image`**:
  - 샌드박스 이미지 URI를 설정합니다.
- **`--debug_mode`** (**`-d`**):
  - 이 세션에 대해 디버그 모드를 활성화하여 더 자세한 출력을 제공합니다.
- **`--all_files`** (**`-a`**):
  - 설정되면 현재 디렉토리 내의 모든 파일을 프롬프트의 컨텍스트로 재귀적으로 포함합니다.
- **`--help`** (또는 **`-h`**):
  - 명령줄 인수에 대한 도움말 정보를 표시합니다.
- **`--show_memory_usage`**:
  - 현재 메모리 사용량을 표시합니다.
- **`--yolo`**:
  - 모든 도구 호출을 자동으로 승인하는 YOLO 모드를 활성화합니다.
- **`--telemetry`**:
  - [텔레메트리](/gemini-cli/telemetry)를 활성화합니다.
- **`--telemetry-target`**:
  - 텔레메트리 대상을 설정합니다. 자세한 내용은 [텔레메트리](/gemini-cli/telemetry)를 참고하세요.
- **`--telemetry-otlp-endpoint`**:
  - 텔레메트리의 OTLP 엔드포인트를 설정합니다. 자세한 내용은 [텔레메트리](/gemini-cli/telemetry)를 참고하세요.
- **`--telemetry-log-prompts`**:
  - 텔레메트리를 위한 프롬프트 로깅을 활성화합니다. 자세한 내용은 [텔레메트리](/gemini-cli/telemetry)를 참고하세요.
- **`--checkpointing`**:
  - [체크포인팅](/gemini-cli/cli/commands#checkpointing-commands)을 활성화합니다.
- **`--version`**:
  - CLI의 버전을 표시합니다.

## 컨텍스트 파일 (계층적 지시 컨텍스트)

CLI의 _동작_에 대한 엄격한 구성은 아니지만, 컨텍스트 파일(기본적으로 `GEMINI.md`이지만 `contextFileName` 설정을 통해 구성 가능)은 Gemini 모델에 제공되는 _지시 컨텍스트_(또한 "메모리"라고도 함)를 구성하는 데 중요합니다. 이 강력한 기능을 통해 프로젝트별 지시사항, 코딩 스타일 가이드, 또는 AI에 관련 배경 정보를 제공하여 응답을 더 맞춤형이고 정확하게 만들 수 있습니다. CLI는 로드된 컨텍스트 파일 수를 표시하는 푸터의 표시기와 같은 UI 요소를 포함하여 활성 컨텍스트에 대한 정보를 제공합니다.

- **목적:** 이 Markdown 파일들은 Gemini 모델이 상호작용 중에 인식하기를 원하는 지시사항, 가이드라인 또는 컨텍스트를 포함합니다. 시스템은 이 지시 컨텍스트를 계층적으로 관리하도록 설계되었습니다.

### 컨텍스트 파일 내용 예시 (예: `GEMINI.md`)

TypeScript 프로젝트 루트에 있는 컨텍스트 파일이 포함할 수 있는 개념적 예시입니다:

```markdown
# 프로젝트: My Awesome TypeScript Library

## 일반 지시사항:

- 새로운 TypeScript 코드를 생성할 때 기존 코딩 스타일을 따르세요.
- 모든 새로운 함수와 클래스에 JSDoc 주석이 있는지 확인하세요.
- 적절한 경우 함수형 프로그래밍 패러다임을 선호하세요.
- 모든 코드는 TypeScript 5.0 및 Node.js 20+와 호환되어야 합니다.

## 코딩 스타일:

- 들여쓰기에 2칸 공백을 사용하세요.
- 인터페이스 이름에는 `I` 접두사를 붙이세요(예: `IUserService`).
- private 클래스 멤버에는 언더스코어(`_`) 접두사를 붙이세요.
- 항상 엄격한 동등성(`===` 및 `!==`)을 사용하세요.

## 특정 컴포넌트: `src/api/client.ts`

- 이 파일은 모든 아웃바운드 API 요청을 처리합니다.
- 새로운 API 호출 함수를 추가할 때 강력한 오류 처리 및 로깅이 포함되어 있는지 확인하세요.
- 모든 GET 요청에 기존 `fetchWithRetry` 유틸리티를 사용하세요.

## 의존성 관련:

- 절대적으로 필요한 경우가 아니면 새로운 외부 의존성을 도입하지 마세요.
- 새로운 의존성이 필요한 경우 이유를 명시하세요.
```

이 예시는 일반적인 프로젝트 컨텍스트, 특정 코딩 규칙, 심지어 특정 파일이나 컴포넌트에 대한 메모를 제공할 수 있는 방법을 보여줍니다. 컨텍스트 파일이 더 관련성 있고 정확할수록 AI가 더 잘 도움을 줄 수 있습니다. 규칙과 컨텍스트를 설정하기 위해 프로젝트별 컨텍스트 파일을 강력히 권장합니다.

- **계층적 로딩 및 우선순위:** CLI는 여러 위치에서 컨텍스트 파일(예: `GEMINI.md`)을 로드하여 정교한 계층적 메모리 시스템을 구현합니다. 이 목록에서 낮은 위치(더 구체적)의 파일 내용이 일반적으로 높은 위치(더 일반적)의 파일 내용을 덮어쓰거나 보완합니다. 정확한 연결 순서와 최종 컨텍스트는 `/memory show` 명령어를 사용해 검사할 수 있습니다. 일반적인 로딩 순서는 다음과 같습니다:
  1. **전역 컨텍스트 파일:**
     - 위치: `~/.gemini/<contextFileName>` (예: 사용자 홈 디렉토리의 `~/.gemini/GEMINI.md`)
     - 범위: 모든 프로젝트에 대한 기본 지시사항 제공
  2. **프로젝트 루트 및 상위 컨텍스트 파일:**
     - 위치: CLI는 현재 작업 디렉토리에서 구성된 컨텍스트 파일을 검색한 다음, 프로젝트 루트(`.git` 폴더로 식별) 또는 홈 디렉토리에 도달할 때까지 각 상위 디렉토리에서 검색합니다.
     - 범위: 전체 프로젝트 또는 프로젝트의 상당 부분에 관련된 컨텍스트 제공
  3. **하위 디렉토리 컨텍스트 파일 (컨텍스트/로컬):**
     - 위치: CLI는 또한 현재 작업 디렉토리 _아래_의 하위 디렉토리에서 구성된 컨텍스트 파일을 스캔합니다(`node_modules`, `.git` 등과 같은 일반적인 무시 패턴을 존중).
     - 범위: 프로젝트의 특정 컴포넌트, 모듈 또는 하위 섹션과 관련된 매우 구체적인 지시사항을 허용
- **연결 및 UI 표시:** 발견된 모든 컨텍스트 파일의 내용이 연결되고(원본과 경로를 나타내는 구분자 포함) Gemini 모델에 대한 시스템 프롬프트의 일부로 제공됩니다. CLI 푸터는 로드된 컨텍스트 파일 수를 표시하여 활성 지시 컨텍스트에 대한 빠른 시각적 신호를 제공합니다.
- **메모리 관리 명령어:**
  - `/memory refresh`를 사용하여 모든 구성된 위치에서 모든 컨텍스트 파일의 재스캔 및 다시 로드를 강제합니다. 이는 AI의 지시 컨텍스트를 업데이트합니다.
  - `/memory show`를 사용하여 현재 로드된 결합된 지시 컨텍스트를 표시하여 AI가 사용하는 계층 구조와 내용을 확인할 수 있습니다.
  - `/memory` 명령어와 하위 명령어(`show` 및 `refresh`)에 대한 전체 세부사항은 [명령어 문서](/gemini-cli/cli/commands#memory)를 참고하세요.

이러한 구성 계층과 컨텍스트 파일의 계층적 특성을 이해하고 활용함으로써 AI의 메모리를 효과적으로 관리하고 Gemini CLI의 응답을 특정 요구사항과 프로젝트에 맞게 조정할 수 있습니다.

## 샌드박싱

Gemini CLI는 시스템을 보호하기 위해 잠재적으로 안전하지 않은 작업(셸 명령어 및 파일 수정과 같은)을 샌드박스 환경 내에서 실행할 수 있습니다.

샌드박싱은 기본적으로 비활성화되어 있지만 몇 가지 방법으로 활성화할 수 있습니다:

- `--sandbox` 또는 `-s` 플래그 사용
- `GEMINI_SANDBOX` 환경 변수 설정
- 샌드박스는 `--yolo` 모드에서 기본적으로 활성화됨

기본적으로 사전 빌드된 `gemini-cli-sandbox` Docker 이미지를 사용합니다.

프로젝트별 샌드박싱 요구사항의 경우, 프로젝트 루트 디렉토리의 `.gemini/sandbox.Dockerfile`에 커스텀 Dockerfile을 생성할 수 있습니다. 이 Dockerfile은 기본 샌드박스 이미지를 기반으로 할 수 있습니다:

```dockerfile
FROM gemini-cli-sandbox

# 여기에 커스텀 의존성 또는 구성을 추가하세요
# 예시:
# RUN apt-get update && apt-get install -y some-package
# COPY ./my-config /app/my-config
```

`.gemini/sandbox.Dockerfile`이 존재하는 경우, Gemini CLI를 실행할 때 `BUILD_SANDBOX` 환경 변수를 사용하여 커스텀 샌드박스 이미지를 자동으로 빌드할 수 있습니다:

```bash
BUILD_SANDBOX=1 gemini -s
```

## 사용 통계

Gemini CLI를 개선하는 데 도움을 주기 위해 익명화된 사용 통계를 수집합니다. 이 데이터는 CLI가 어떻게 사용되는지 이해하고, 일반적인 문제를 식별하며, 새로운 기능의 우선순위를 정하는 데 도움이 됩니다.

**수집하는 내용:**

- **도구 호출:** 호출된 도구의 이름, 성공 또는 실패 여부, 실행에 걸린 시간을 로그합니다. 도구에 전달된 인수나 도구에서 반환된 데이터는 수집하지 않습니다.
- **API 요청:** 각 요청에 사용된 Gemini 모델, 요청 지속 시간, 성공 여부를 로그합니다. 프롬프트나 응답의 내용은 수집하지 않습니다.
- **세션 정보:** 활성화된 도구 및 승인 모드와 같은 CLI 구성에 대한 정보를 수집합니다.

**수집하지 않는 내용:**

- **개인 식별 정보(PII):** 이름, 이메일 주소, API 키와 같은 개인 정보는 수집하지 않습니다.
- **프롬프트 및 응답 내용:** 프롬프트의 내용이나 Gemini 모델의 응답을 로그하지 않습니다.
- **파일 내용:** CLI가 읽거나 쓰는 파일의 내용을 로그하지 않습니다.

**옵트아웃 방법:**

`settings.json` 파일에서 `usageStatisticsEnabled` 속성을 `false`로 설정하여 언제든지 사용 통계 수집에서 옵트아웃할 수 있습니다:

```json
{
  "usageStatisticsEnabled": false
}
``` 