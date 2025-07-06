---
title: "튜토리얼"
description: "Gemini CLI와 상호작용하는 방법에 대한 튜토리얼을 제공합니다."
---

# 튜토리얼

이 페이지는 Gemini CLI와 상호작용하기 위한 튜토리얼을 포함합니다.

## Model Context Protocol (MCP) 서버 설정

> [!CAUTION]
> 타사 MCP 서버를 사용하기 전에 해당 소스를 신뢰하고 제공하는 도구를 이해했는지 확인하세요. 타사 서버 사용은 본인의 책임입니다.

이 튜토리얼은 [GitHub MCP 서버](https://github.com/github/github-mcp-server)를 예시로 사용하여 MCP 서버를 설정하는 방법을 보여줍니다. GitHub MCP 서버는 이슈 생성 및 풀 리퀘스트에 댓글 달기와 같은 GitHub 저장소와의 상호작용을 위한 도구를 제공합니다.

### 사전 요구사항

시작하기 전에 다음이 설치되고 구성되어 있는지 확인하세요:

- **Docker:** [Docker]를 설치하고 실행하세요.
- **GitHub Personal Access Token (PAT):** 필요한 범위가 있는 새로운 [classic] 또는 [fine-grained] PAT를 생성하세요.

[Docker]: https://www.docker.com/
[classic]: https://github.com/settings/tokens/new
[fine-grained]: https://github.com/settings/personal-access-tokens/new

### 가이드

#### `settings.json`에서 MCP 서버 구성

프로젝트 루트 디렉토리에서 [`.gemini/settings.json` 파일](/gemini/cli/configuration)을 생성하거나 엽니다. 파일 내에서 GitHub MCP 서버를 시작하는 방법에 대한 지시사항을 제공하는 `mcpServers` 구성 블록을 추가하세요.

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}"
      }
    }
  }
}
```

#### GitHub 토큰 설정

> [!CAUTION]
> 개인 및 비공개 저장소에 접근할 수 있는 광범위한 범위의 개인 액세스 토큰을 사용하면 비공개 저장소의 정보가 공개 저장소로 유출될 수 있습니다. 공개 및 비공개 저장소 모두에 대한 접근을 공유하지 않는 세밀한 액세스 토큰을 사용하는 것을 권장합니다.

환경 변수를 사용하여 GitHub PAT를 저장하세요:

```bash
GITHUB_PERSONAL_ACCESS_TOKEN="pat_YourActualGitHubTokenHere"
```

Gemini CLI는 `settings.json` 파일에서 정의한 `mcpServers` 구성에서 이 값을 사용합니다.

#### Gemini CLI 시작 및 연결 확인

Gemini CLI를 시작하면 자동으로 구성을 읽고 백그라운드에서 GitHub MCP 서버를 시작합니다. 그런 다음 자연어 프롬프트를 사용하여 Gemini CLI에 GitHub 작업을 수행하도록 요청할 수 있습니다. 예시:

```bash
"get all open issues assigned to me in the 'foo/bar' repo and prioritize them"
``` 