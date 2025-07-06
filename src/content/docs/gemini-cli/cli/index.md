---
title: "Gemini CLI"
description: "Gemini CLI의 사용자 인터페이스와 명령어 사용법을 안내합니다."
---

# Gemini CLI

Gemini CLI에서 `packages/cli`는 사용자가 Gemini AI 모델과 관련 도구들과 프롬프트를 주고받는 프론트엔드입니다. Gemini CLI의 일반적인 개요는 [메인 문서 페이지](../index)를 참고하세요.

## 이 섹션 탐색

- **[인증](/gemini-cli/cli/authentication):** Google AI 서비스 인증 설정 가이드
- **[명령어](/gemini-cli/cli/commands):** Gemini CLI 명령어 참조 (예: `/help`, `/tools`, `/theme`)
- **[설정](/gemini-cli/cli/configuration):** 설정 파일을 사용한 Gemini CLI 동작 커스터마이징 가이드
- **[토큰 캐싱](/gemini-cli/cli/token-caching):** 토큰 캐싱을 통한 API 비용 최적화
- **[테마](/gemini-cli/cli/themes)**: 다양한 테마로 CLI 외관 커스터마이징 가이드
- **[튜토리얼](/gemini-cli/cli/tutorials)**: 개발 작업 자동화를 위한 Gemini CLI 사용 튜토리얼

## 비상호작용 모드

Gemini CLI는 스크립팅과 자동화에 유용한 비상호작용 모드로 실행할 수 있습니다. 이 모드에서는 CLI에 입력을 파이프하고, 명령을 실행한 후 종료됩니다.

다음 예시는 터미널에서 Gemini CLI로 명령을 파이프하는 방법입니다:

```bash
echo "What is fine tuning?" | gemini
```

Gemini CLI가 명령을 실행하고 터미널에 출력을 인쇄합니다. `--prompt` 또는 `-p` 플래그를 사용해도 동일한 동작을 할 수 있습니다. 예시:

```bash
gemini -p "What is fine tuning?"
``` 