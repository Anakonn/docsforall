---
title: "Gemini CLI 확장"
description: "Gemini CLI의 기능을 구성하고 확장하는 데 사용할 수 있는 확장 기능을 지원합니다."
---

# Gemini CLI 확장

Gemini CLI는 기능을 구성하고 확장하는 데 사용할 수 있는 확장 기능을 지원합니다.

## 작동 방식

시작 시 Gemini CLI는 두 위치에서 확장 기능을 찾습니다:

1. `<workspace>/.gemini/extensions`
2. `<home>/.gemini/extensions`

Gemini CLI는 두 위치에서 모든 확장 기능을 로드합니다. 동일한 이름의 확장 기능이 두 위치에 모두 존재하는 경우, 워크스페이스 디렉토리의 확장 기능이 우선순위를 가집니다.

각 위치 내에서 개별 확장 기능은 `gemini-extension.json` 파일을 포함하는 디렉토리로 존재합니다. 예시:

`<workspace>/.gemini/extensions/my-extension/gemini-extension.json`

### `gemini-extension.json`

`gemini-extension.json` 파일은 확장 기능의 구성을 포함합니다. 파일은 다음과 같은 구조를 가집니다:

```json
{
  "name": "my-extension",
  "version": "1.0.0",
  "mcpServers": {
    "my-server": {
      "command": "node my-server.js"
    }
  },
  "contextFileName": "GEMINI.md",
  "excludeTools": ["run_shell_command"]
}
```

- `name`: 확장 기능의 이름입니다. 이는 확장 기능을 고유하게 식별하는 데 사용됩니다. 확장 기능 디렉토리의 이름과 일치해야 합니다.
- `version`: 확장 기능의 버전입니다.
- `mcpServers`: 구성할 MCP 서버의 맵입니다. 키는 서버의 이름이고, 값은 서버 구성입니다. 이 서버들은 [`settings.json` 파일](./cli/configuration)에서 구성된 MCP 서버와 마찬가지로 시작 시 로드됩니다. 확장 기능과 `settings.json` 파일이 모두 동일한 이름의 MCP 서버를 구성하는 경우, `settings.json` 파일에 정의된 서버가 우선순위를 가집니다.
- `contextFileName`: 확장 기능의 컨텍스트를 포함하는 파일의 이름입니다. 이는 워크스페이스에서 컨텍스트를 로드하는 데 사용됩니다. 이 속성이 사용되지 않지만 확장 기능 디렉토리에 `GEMINI.md` 파일이 있는 경우, 해당 파일이 로드됩니다.
- `excludeTools`: 모델에서 제외할 도구 이름의 배열입니다. `run_shell_command` 도구와 같이 지원하는 도구에 대해 명령별 제한을 지정할 수도 있습니다. 예를 들어, `"excludeTools": ["run_shell_command(rm -rf)"]`는 `rm -rf` 명령어를 차단합니다.

Gemini CLI가 시작되면 모든 확장 기능을 로드하고 구성을 병합합니다. 충돌이 있는 경우 워크스페이스 구성이 우선순위를 가집니다. 