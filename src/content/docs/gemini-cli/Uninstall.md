---
title: "CLI 제거 방법"
description: "npx 또는 전역 npm 설치 방식에 따른 Gemini CLI 제거 방법을 안내합니다."
---

## CLI 제거 방법

CLI 실행 방식에 따라 제거 방법이 다릅니다. npx 또는 전역 npm 설치 방식에 따라 아래 안내를 따르세요.

### 방법 1: npx 사용 시

npx는 패키지를 임시 캐시에 저장해 실행하므로, "제거"하려면 이 캐시를 삭제해야 합니다. 이 작업은 gemini-cli뿐 아니라 npx로 실행한 모든 패키지에 적용됩니다.

npx 캐시는 메인 npm 캐시 폴더 내 `_npx` 디렉토리입니다. 경로는 `npm config get cache` 명령어로 확인할 수 있습니다.

**macOS / Linux**

```bash
# 일반적으로 ~/.npm/_npx 경로
rm -rf "$(npm config get cache)/_npx"
```

**Windows**

_Command Prompt_

```cmd
:: 일반적으로 %LocalAppData%\npm-cache\_npx
rmdir /s /q "%LocalAppData%\npm-cache\_npx"
```

_PowerShell_

```powershell
# 일반적으로 $env:LocalAppData\npm-cache\_npx
Remove-Item -Path (Join-Path $env:LocalAppData "npm-cache\_npx") -Recurse -Force
```

### 방법 2: npm(전역 설치) 사용 시

전역 설치(`npm install -g @google/gemini-cli`)한 경우, `-g` 플래그와 함께 `npm uninstall` 명령어로 제거할 수 있습니다.

```bash
npm uninstall -g @google/gemini-cli
```

이 명령어는 시스템에서 패키지를 완전히 삭제합니다. 