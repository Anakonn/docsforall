---
title: "Gemini CLI 문서"
description: "Gemini CLI의 설치, 사용 및 개발에 대한 포괄적인 가이드"
---

# Gemini CLI 문서에 오신 것을 환영합니다

이 문서는 Gemini CLI의 설치, 사용 및 개발에 대한 포괄적인 가이드를 제공합니다. 이 도구를 통해 명령줄 인터페이스를 통해 Gemini 모델과 상호작용할 수 있습니다.

## 개요

Gemini CLI는 Gemini 모델의 기능을 대화형 Read-Eval-Print Loop (REPL) 환경의 터미널로 가져옵니다. Gemini CLI는 로컬 서버(`packages/core`)와 통신하는 클라이언트 측 애플리케이션(`packages/cli`)으로 구성되며, 이 서버는 Gemini API와 AI 모델에 대한 요청을 관리합니다. Gemini CLI에는 파일 시스템 작업 수행, 셸 실행, 웹 가져오기와 같은 작업을 위한 다양한 도구도 포함되어 있으며, 이는 `packages/core`에서 관리됩니다.

## 문서 탐색

이 문서는 다음과 같은 섹션으로 구성되어 있습니다:

- **[실행 및 배포](/gemini-cli/deployment):** Gemini CLI 실행에 대한 정보.
- **[아키텍처 개요](/gemini-cli/architecture):** Gemini CLI의 고수준 설계, 구성 요소 및 상호작용 방식을 이해합니다.
- **[CLI 사용법:]** `packages/cli`에 대한 문서.
  - **[CLI 소개](/gemini-cli/cli):** 명령줄 인터페이스 개요.
  - **[명령어](/gemini-cli/cli/commands):** 사용 가능한 CLI 명령어 설명.
  - **[구성](/gemini-cli/cli/configuration):** CLI 구성에 대한 정보.
  - **[체크포인팅](/gemini-cli/checkpointing):** 체크포인팅 기능에 대한 문서.
  - **[확장](/gemini-cli/extension):** 새로운 기능으로 CLI를 확장하는 방법.
  - **[원격 측정](/gemini-cli/telemetry):** CLI의 원격 측정 개요.
- **핵심 세부사항:** `packages/core`에 대한 문서.
  - **[핵심 소개](/gemini-cli/core):** 핵심 구성 요소 개요.
  - **[도구 API](/gemini-cli/core/tools-api):** 핵심이 도구를 관리하고 노출하는 방법에 대한 정보.
- **도구:**
  - **[도구 개요](/gemini-cli/tools):** 사용 가능한 도구 개요.
  - **[파일 시스템 도구](/gemini-cli/tools/file-system):** `read_file` 및 `write_file` 도구에 대한 문서.
  - **[다중 파일 읽기 도구](/gemini-cli/tools/multi-file):** `read_many_files` 도구에 대한 문서.
  - **[셸 도구](/gemini-cli/tools/shell):** `run_shell_command` 도구에 대한 문서.
  - **[웹 가져오기 도구](/gemini-cli/tools/web-fetch):** `web_fetch` 도구에 대한 문서.
  - **[웹 검색 도구](/gemini-cli/tools/web-search):** `google_web_search` 도구에 대한 문서.
  - **[메모리 도구](/gemini-cli/tools/memory):** `save_memory` 도구에 대한 문서.
- **[기여 및 개발 가이드](/gemini-cli/CONTRIBUTING):** 정보, 설정, 빌드, 테스트 및 코딩 규칙을 포함합니다.
- **[NPM 워크스페이스 및 게시](/gemini-cli/npm):** 패키지 관리 및 게시 방법에 대한 세부사항.
- **[문제 해결 가이드](/gemini-cli/troubleshooting):** 일반적인 문제 및 FAQ에 대한 해결책을 찾을 수 있습니다.
- **[서비스 약관 및 개인정보 보호 고지](/gemini-cli/tos-privacy):** Gemini CLI 사용에 적용되는 서비스 약관 및 개인정보 보호 고지에 대한 정보.

이 문서가 Gemini CLI를 최대한 활용하는 데 도움이 되기를 바랍니다! 