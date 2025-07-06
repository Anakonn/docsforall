---
title: "Gemini CLI 관측성(텔레메트리) 가이드"
description: "Gemini CLI의 텔레메트리(관측성) 설정, 활용, 로그/메트릭 구조를 안내합니다."
---

# Gemini CLI 관측성(텔레메트리) 가이드

텔레메트리는 Gemini CLI의 성능, 상태, 사용 현황에 대한 데이터를 제공합니다. 이를 활성화하면 트레이스, 메트릭, 구조화 로그를 통해 운영 모니터링, 문제 디버깅, 도구 사용 최적화가 가능합니다.

Gemini CLI의 텔레메트리 시스템은 **[OpenTelemetry] (OTEL)** 표준을 기반으로 하며, 호환 백엔드로 데이터를 전송할 수 있습니다.

[OpenTelemetry]: https://opentelemetry.io/

## 텔레메트리 활성화 방법

여러 방법으로 텔레메트리를 활성화할 수 있습니다. 주로 [`.gemini/settings.json` 파일](/gemini-cli/cli/configuration)과 환경 변수로 관리하며, CLI 플래그로 세션별로 덮어쓸 수 있습니다.

### 우선순위

아래 항목이 위에 있을수록 더 높은 우선순위를 가집니다:

1. **CLI 플래그:**
    - `--telemetry` / `--no-telemetry`: telemetry.enabled 덮어쓰기
    - `--telemetry-target <local|gcp>`: telemetry.target 덮어쓰기
    - `--telemetry-otlp-endpoint <URL>`: telemetry.otlpEndpoint 덮어쓰기
    - `--telemetry-log-prompts` / `--no-telemetry-log-prompts`: telemetry.logPrompts 덮어쓰기
2. **환경 변수:**
    - `OTEL_EXPORTER_OTLP_ENDPOINT`: telemetry.otlpEndpoint 덮어쓰기
3. **워크스페이스 설정 파일(`.gemini/settings.json`)**
4. **사용자 설정 파일(`~/.gemini/settings.json`)**
5. **기본값:**
    - telemetry.enabled: false
    - telemetry.target: local
    - telemetry.otlpEndpoint: http://localhost:4317
    - telemetry.logPrompts: true

**`npm run telemetry -- --target=<gcp|local>` 스크립트:**
이 스크립트의 `--target` 인자는 해당 스크립트 실행 동안에만 telemetry.target을 덮어쓰며, settings.json을 영구적으로 변경하지 않습니다.

### 예시 설정

아래 코드를 워크스페이스(`.gemini/settings.json`) 또는 사용자(`~/.gemini/settings.json`) 설정에 추가해 텔레메트리를 활성화하고 출력을 Google Cloud로 전송할 수 있습니다:

```json
{
  "telemetry": {
    "enabled": true,
    "target": "gcp"
  },
  "sandbox": false
}
```

## OTEL Collector 실행

OTEL Collector는 텔레메트리 데이터를 수신, 처리, 내보내는 서비스입니다. CLI는 OTLP/gRPC 프로토콜로 데이터를 전송합니다.

자세한 표준 구성은 [공식 문서][otel-config-docs] 참고.

[otel-config-docs]: https://opentelemetry.io/docs/languages/sdk-configuration/otlp-exporter/

### 로컬

`npm run telemetry -- --target=local` 명령어로 로컬 텔레메트리 파이프라인을 자동으로 구성할 수 있습니다. 이 스크립트는 `otelcol-contrib`(OpenTelemetry Collector)와 `jaeger`(트레이스 UI)를 설치합니다.

1. **명령 실행:**
    ```bash
    npm run telemetry -- --target=local
    ```
    - Jaeger, OTEL 다운로드 및 실행
    - Jaeger UI: http://localhost:16686
    - Collector 로그: `~/.gemini/tmp/<projectHash>/otel/collector.log`
    - 종료 시 Ctrl+C

### Google Cloud

`npm run telemetry -- --target=gcp` 명령어로 Google Cloud로 데이터를 전송하는 Collector를 자동 구성할 수 있습니다.

1. **사전 준비:**
    - Google Cloud 프로젝트 ID 필요
    - 환경 변수 설정:
      ```bash
      export OTLP_GOOGLE_CLOUD_PROJECT="your-project-id"
      ```
    - Google Cloud 인증 필요 (예: `gcloud auth application-default login`)
    - IAM 역할: "Cloud Trace Agent", "Monitoring Metric Writer", "Logs Writer"

1. **명령 실행:**
    ```bash
    npm run telemetry -- --target=gcp
    ```
    - Collector 로그: `~/.gemini/tmp/<projectHash>/otel/collector-gcp.log`
    - 종료 시 Ctrl+C

1. **Gemini CLI 실행:**
    별도 터미널에서 Gemini CLI 명령 실행 (Collector가 데이터 수집)

1. **Google Cloud에서 텔레메트리 확인:**
    스크립트가 제공하는 링크로 콘솔에서 트레이스, 메트릭, 로그 확인

## 로그 및 메트릭 구조

아래는 Gemini CLI에서 생성되는 로그와 메트릭의 구조입니다.

- 모든 로그/메트릭에는 공통 속성으로 `sessionId`가 포함됩니다.

### 로그

- `gemini_cli.config`: 시작 시 설정 정보
- `gemini_cli.user_prompt`: 사용자 프롬프트 제출 시
- `gemini_cli.tool_call`: 각 함수 호출 시
- `gemini_cli.api_request`: Gemini API 요청 시
- `gemini_cli.api_error`: API 요청 실패 시
- `gemini_cli.api_response`: Gemini API 응답 수신 시

각 이벤트별 주요 속성은 원문 표 참고

### 메트릭

- `gemini_cli.session.count`: CLI 시작 시 1회 증가
- `gemini_cli.tool.call.count`: 도구 호출 횟수
- `gemini_cli.tool.call.latency`: 도구 호출 지연 시간
- `gemini_cli.api.request.count`: API 요청 횟수
- `gemini_cli.api.request.latency`: API 요청 지연 시간
- `gemini_cli.token.usage`: 토큰 사용량
- `gemini_cli.file.operation.count`: 파일 작업 횟수

각 메트릭별 속성은 원문 표 참고 