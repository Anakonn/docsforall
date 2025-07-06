---
title: "Gemini CLI: 할당량 및 요금"
description: "Gemini CLI의 인증 방식별 할당량 및 요금 정책을 안내합니다."
---

# Gemini CLI: 할당량 및 요금

Gemini CLI의 할당량과 요금은 Google 인증 방식에 따라 달라집니다. 또한 모델 버전, 요청, 토큰 사용량에 따라 계산 방식이 다를 수 있습니다. 모델 사용 요약은 `/stats` 명령어와 세션 종료 시 제공됩니다. 개인정보 및 약관은 [privacy and terms](/gemini-cli/tos-privacy)에서 확인하세요. 참고: 게시된 가격은 정가이며, 별도의 상업적 할인 협상이 적용될 수 있습니다.

이 문서에서는 인증 방식별로 적용되는 할당량과 요금 정책을 안내합니다.

## 1. Google 계정 로그인 (Gemini Code Assist 무료 티어)

Google 계정으로 Gemini Code Assist(개인용)에 로그인한 경우:

- **할당량:**
  - 분당 60회 요청
  - 일일 1000회 요청
  - 토큰 사용량 제한 없음
- **요금:** 무료
- **자세히:** [Gemini Code Assist Quotas](https://developers.google.com/gemini-code-assist/resources/quotas#quotas-for-agent-mode-gemini-cli)
- **비고:** 모델별 별도 할당량은 명시되지 않음. 품질 유지를 위해 모델 폴백이 발생할 수 있음.

## 2. Gemini API 키 (무료)

Gemini API 키로 무료 티어를 사용하는 경우:

- **할당량:**
  - Flash 모델만 사용 가능
  - 분당 10회 요청
  - 일일 250회 요청
- **요금:** 무료
- **자세히:** [Gemini API Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits)

## 3. Gemini API 키 (유료)

유료 플랜의 Gemini API 키를 사용하는 경우:

- **할당량:** 요금제별 상이
- **요금:** 요금제 및 모델/토큰 사용량에 따라 다름
- **자세히:** [Gemini API Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits), [Gemini API Pricing](https://ai.google.dev/gemini-api/docs/pricing)

## 4. Google 계정 로그인 (Workspace 또는 라이선스 사용자)

Gemini Code Assist의 Standard/Enterprise 에디션 사용자는 고정 가격 구독 및 라이선스 좌석 기준으로 할당량과 요금이 적용됩니다.

- **Standard 티어:**
  - 분당 120회, 일일 1500회 요청
- **Enterprise 티어:**
  - 분당 120회, 일일 2000회 요청
- **요금:** Gemini for Google Workspace 또는 Gemini Code Assist 구독에 포함된 고정 가격
- **자세히:** [Gemini Code Assist Quotas](https://developers.google.com/gemini-code-assist/resources/quotas#quotas-for-agent-mode-gemini-cli), [Gemini Code Assist Pricing](https://cloud.google.com/products/gemini/pricing)
- **비고:**
  - 모델별 별도 할당량은 명시되지 않음. 품질 유지를 위해 모델 폴백이 발생할 수 있음.
  - Google Developer Program 회원은 멤버십을 통해 라이선스를 가질 수 있음.

## 5. Vertex AI (Express Mode)

Vertex AI Express Mode를 사용하는 경우:

- **할당량:** 계정별로 상이. 자세한 내용은 공식 문서 참고.
- **요금:** Express Mode 사용량 소진 후 프로젝트에 결제를 활성화하면 [Vertex AI Pricing](https://cloud.google.com/vertex-ai/pricing) 기준으로 과금
- **자세히:** [Vertex AI Express Mode Quotas](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#quotas)

## 6. Vertex AI (일반 모드)

표준 Vertex AI 서비스를 사용하는 경우:

- **할당량:** 동적 공유 할당량 시스템 또는 사전 구매된 프로비저닝 처리량에 의해 결정
- **요금:** 모델 및 토큰 사용량 기준. [Vertex AI Pricing](https://cloud.google.com/vertex-ai/pricing) 참고
- **자세히:** [Vertex AI Dynamic Shared Quota](https://cloud.google.com/vertex-ai/generative-ai/docs/resources/dynamic-shared-quota)

## 7. Google One, Ultra, Gemini for Workspace 플랜

이 플랜들은 현재 웹 기반 Gemini 제품(Gemini 웹앱, Flow 비디오 에디터 등)에만 적용됩니다. API 기반 Gemini CLI에는 적용되지 않습니다. 향후 지원이 검토 중입니다. 