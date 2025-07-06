---
title: "Gemini CLI 실행 및 배포"
description: "Gemini CLI를 실행하는 방법과 Gemini CLI가 사용하는 배포 아키텍처를 설명합니다."
---

# Gemini CLI 실행 및 배포

이 문서는 Gemini CLI를 실행하는 방법을 설명하고 Gemini CLI가 사용하는 배포 아키텍처를 설명합니다.

## Gemini CLI 실행

Gemini CLI를 실행하는 여러 가지 방법이 있습니다. 선택하는 옵션은 Gemini CLI를 어떻게 사용하려는지에 따라 달라집니다.

---

### 1. 표준 설치 (일반 사용자에게 권장)

이는 최종 사용자가 Gemini CLI를 설치하는 권장 방법입니다. NPM 레지스트리에서 Gemini CLI 패키지를 다운로드하는 것을 포함합니다.

- **전역 설치:**

  ```bash
  # CLI를 전역으로 설치
  npm install -g @google/gemini-cli

  # 이제 어디서든 CLI를 실행할 수 있습니다
  gemini
  ```

- **NPX 실행:**
  ```bash
  # 전역 설치 없이 NPM에서 최신 버전을 실행
  npx @google/gemini-cli
  ```

---

### 2. 샌드박스에서 실행 (Docker/Podman)

보안과 격리를 위해 Gemini CLI는 컨테이너 내에서 실행할 수 있습니다. 이는 CLI가 부작용이 있을 수 있는 도구를 실행하는 기본 방법입니다.

- **레지스트리에서 직접:**
  게시된 샌드박스 이미지를 직접 실행할 수 있습니다. 이는 Docker만 있고 CLI를 실행하고 싶은 환경에서 유용합니다.
  ```bash
  # 게시된 샌드박스 이미지 실행
  docker run --rm -it us-docker.pkg.dev/gemini-code-dev/gemini-cli/sandbox:0.1.1
  ```
- **`--sandbox` 플래그 사용:**
  로컬에 Gemini CLI가 설치되어 있다면(위의 표준 설치 사용), 샌드박스 컨테이너 내에서 실행하도록 지시할 수 있습니다.
  ```bash
  gemini --sandbox -y -p "your prompt here"
  ```

---

### 3. 소스에서 실행 (Gemini CLI 기여자에게 권장)

프로젝트 기여자는 소스 코드에서 직접 CLI를 실행하고 싶을 것입니다.

- **개발 모드:**
  이 방법은 핫 리로딩을 제공하며 활성 개발에 유용합니다.
  ```bash
  # 저장소 루트에서
  npm run start
  ```
- **프로덕션 유사 모드 (링크된 패키지):**
  이 방법은 로컬 패키지를 링크하여 전역 설치를 시뮬레이션합니다. 프로덕션 워크플로우에서 로컬 빌드를 테스트하는 데 유용합니다.

  ```bash
  # 로컬 cli 패키지를 전역 node_modules에 링크
  npm link packages/cli

  # 이제 `gemini` 명령어를 사용하여 로컬 버전을 실행할 수 있습니다
  gemini
  ```

---

### 4. GitHub에서 최신 Gemini CLI 커밋 실행

GitHub 저장소에서 직접 가장 최근에 커밋된 Gemini CLI 버전을 실행할 수 있습니다. 이는 아직 개발 중인 기능을 테스트하는 데 유용합니다.

```bash
# GitHub의 main 브랜치에서 직접 CLI 실행
npx https://github.com/google-gemini/gemini-cli
```

## 배포 아키텍처

위에서 설명한 실행 방법들은 다음 아키텍처 구성 요소와 프로세스로 가능해집니다:

**NPM 패키지**

Gemini CLI 프로젝트는 NPM 레지스트리에 두 개의 핵심 패키지를 게시하는 모노레포입니다:

- `@google/gemini-cli-core`: 백엔드, 로직 처리 및 도구 실행을 담당합니다.
- `@google/gemini-cli`: 사용자 대면 프론트엔드입니다.

이 패키지들은 표준 설치를 수행할 때와 소스에서 Gemini CLI를 실행할 때 사용됩니다.

**빌드 및 패키징 프로세스**

배포 채널에 따라 두 가지 구별되는 빌드 프로세스가 사용됩니다:

- **NPM 게시:** NPM 레지스트리에 게시하기 위해 `@google/gemini-cli-core`와 `@google/gemini-cli`의 TypeScript 소스 코드는 TypeScript 컴파일러(`tsc`)를 사용하여 표준 JavaScript로 변환됩니다. 결과 `dist/` 디렉토리가 NPM 패키지에 게시됩니다. 이는 TypeScript 라이브러리의 표준 접근 방식입니다.

- **GitHub `npx` 실행:** GitHub에서 직접 Gemini CLI의 최신 버전을 실행할 때, `package.json`의 `prepare` 스크립트에 의해 다른 프로세스가 트리거됩니다. 이 스크립트는 `esbuild`를 사용하여 전체 애플리케이션과 그 의존성을 단일 자체 포함 JavaScript 파일로 번들링합니다. 이 번들은 사용자의 머신에서 즉시 생성되며 저장소에 체크인되지 않습니다.

**Docker 샌드박스 이미지**

Docker 기반 실행 방법은 `gemini-cli-sandbox` 컨테이너 이미지로 지원됩니다. 이 이미지는 컨테이너 레지스트리에 게시되며 사전 설치된 Gemini CLI의 전역 버전을 포함합니다. `scripts/prepare-cli-packagejson.js` 스크립트는 게시 전에 CLI의 `package.json`에 이 이미지의 URI를 동적으로 주입하므로, CLI는 `--sandbox` 플래그가 사용될 때 어떤 이미지를 가져올지 알 수 있습니다.

## 릴리스 프로세스

통합 스크립트 `npm run publish:release`가 릴리스 프로세스를 조율합니다. 이 스크립트는 다음 작업을 수행합니다:

1. `tsc`를 사용하여 NPM 패키지를 빌드합니다.
2. Docker 이미지 URI로 CLI의 `package.json`을 업데이트합니다.
3. `gemini-cli-sandbox` Docker 이미지를 빌드하고 태그합니다.
4. Docker 이미지를 컨테이너 레지스트리에 푸시합니다.
5. NPM 패키지를 아티팩트 레지스트리에 게시합니다. 