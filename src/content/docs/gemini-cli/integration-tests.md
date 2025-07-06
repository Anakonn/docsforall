---
title: "통합 테스트"
description: "이 문서는 Gemini CLI의 통합 테스트 프레임워크와 실행 방법을 안내합니다."
---

# 통합 테스트

이 문서는 이 프로젝트에서 사용되는 통합 테스트 프레임워크에 대한 정보를 제공합니다.

## 개요

통합 테스트는 Gemini CLI의 엔드 투 엔드 기능을 검증하기 위해 설계되었습니다. 이 테스트들은 빌드된 바이너리를 제어된 환경에서 실행하고, 파일 시스템과 상호작용할 때 기대한 대로 동작하는지 확인합니다.

테스트는 `integration-tests` 디렉토리에 위치하며, 커스텀 테스트 러너로 실행됩니다.

## 테스트 실행 방법

통합 테스트는 기본 `npm run test` 명령어에 포함되어 있지 않습니다. 반드시 `npm run test:integration:all` 스크립트를 사용해 명시적으로 실행해야 합니다.

다음과 같은 단축 명령어로도 실행할 수 있습니다:

```bash
npm run test:e2e
```

## 특정 테스트 세트 실행

테스트 파일의 일부만 실행하려면 `npm run <integration test command> <file_name1> ...` 형식으로 실행할 수 있습니다. `<integration test command>`는 `test:e2e` 또는 `test:integration*` 중 하나이고, `<file_name>`은 `integration-tests/` 디렉토리 내의 `.test.js` 파일명입니다. 예시:

```bash
npm run test:e2e list_directory write_file
```

### 테스트 이름으로 단일 테스트 실행

테스트 이름으로 단일 테스트를 실행하려면 `--test-name-pattern` 플래그를 사용하세요:

```bash
npm run test:e2e -- --test-name-pattern "reads a file"
```

### 전체 테스트 실행

모든 통합 테스트를 실행하려면 다음 명령어를 사용하세요:

```bash
npm run test:integration:all
```

### 샌드박스 매트릭스

`all` 명령어는 `no sandboxing`, `docker`, `podman` 환경에서 테스트를 실행합니다.
각 환경별로 개별 실행도 가능합니다:

```bash
npm run test:integration:sandbox:none
```

```bash
npm run test:integration:sandbox:docker
```

```bash
npm run test:integration:sandbox:podman
```

## 진단 옵션

통합 테스트 러너는 테스트 실패 원인 분석을 돕기 위한 다양한 진단 옵션을 제공합니다.

### 테스트 출력 보존

테스트 실행 중 생성된 임시 파일을 보존하여 파일 시스템 작업 문제를 디버깅할 수 있습니다.
`--keep-output` 플래그 또는 `KEEP_OUTPUT` 환경 변수를 `true`로 설정하세요.

```bash
# 플래그 사용
npm run test:integration:sandbox:none -- --keep-output

# 환경 변수 사용
KEEP_OUTPUT=true npm run test:integration:sandbox:none
```

출력이 보존되면, 테스트 러너가 해당 테스트 실행의 고유 디렉토리 경로를 출력합니다.

### 자세한 출력(Verbose)

더 상세한 디버깅을 위해 `--verbose` 플래그를 사용하면 `gemini` 명령의 실시간 출력을 콘솔에 스트리밍합니다.

```bash
npm run test:integration:sandbox:none -- --verbose
```

`--verbose`와 `--keep-output`을 함께 사용하면, 콘솔에 출력이 스트리밍되고 테스트 임시 디렉토리 내 로그 파일에도 저장됩니다.

자세한 출력은 다음과 같이 구분되어 표시됩니다:

```
--- TEST: <file-name-without-js>:<test-name> ---
... gemini 명령의 출력 ...
--- END TEST: <file-name-without-js>:<test-name> ---
```

## 린트 및 포매팅

코드 품질과 일관성을 위해 통합 테스트 파일은 메인 빌드 프로세스에서 린트가 수행됩니다. 수동으로 린터와 자동 수정도 실행할 수 있습니다.

### 린터 실행

린트 오류를 확인하려면 다음 명령어를 실행하세요:

```bash
npm run lint
```

자동 수정 가능한 린트 오류를 고치려면 `--fix` 플래그를 추가하세요:

```bash
npm run lint --fix
```

## 디렉토리 구조

통합 테스트는 각 테스트 실행마다 `.integration-tests` 디렉토리 내에 고유 디렉토리를 생성합니다. 이 디렉토리 내에 각 테스트 파일별 하위 디렉토리, 그리고 그 안에 각 테스트 케이스별 하위 디렉토리가 생성됩니다.

이 구조 덕분에 특정 테스트 실행, 파일, 케이스의 산출물을 쉽게 찾을 수 있습니다.

```
.integration-tests/
└── <run-id>/
    └── <test-file-name>.test.js/
        └── <test-case-name>/
            ├── output.log
            └── ...기타 테스트 산출물...
```

## 지속적 통합(CI)

통합 테스트가 항상 실행되도록 `.github/workflows/e2e.yml`에 GitHub Actions 워크플로우가 정의되어 있습니다. 이 워크플로우는 모든 pull request와 main 브랜치로의 push 시 자동으로 통합 테스트를 실행합니다.

워크플로우는 다양한 샌드박스 환경에서 테스트를 실행하여 Gemini CLI가 각 환경에서 정상 동작하는지 검증합니다:

- `sandbox:none`: 샌드박스 없이 테스트 실행
- `sandbox:docker`: Docker 컨테이너에서 테스트 실행
- `sandbox:podman`: Podman 컨테이너에서 테스트 실행 