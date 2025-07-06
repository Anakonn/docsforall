---
title: "Gemini CLI: 서비스 약관 및 개인정보 안내"
description: "Gemini CLI의 인증 방식별 서비스 약관 및 개인정보 정책을 안내합니다."
---

# Gemini CLI: 서비스 약관 및 개인정보 안내

Gemini CLI는 Google의 강력한 언어 모델을 명령줄에서 직접 사용할 수 있는 오픈소스 도구입니다. Google 인증 방식에 따라 적용되는 서비스 약관 및 개인정보 안내가 다릅니다. 할당량 및 요금 정책은 [quota and pricing](/gemini-cli/quota-and-pricing) 문서를 참고하세요.

이 문서에서는 인증 방식별로 적용되는 서비스 약관 및 개인정보 정책을 안내합니다.

## 1. Google 계정 로그인 (Gemini Code Assist for [개인 사용자](https://developers.google.com/gemini-code-assist/docs/overview#supported-features-gca))

Google 계정으로 Gemini Code Assist(개인용)에 로그인한 경우:

- 서비스 약관: [Google 서비스 약관](https://policies.google.com/terms?hl=ko)이 적용됩니다.
- 개인정보 안내: [Gemini Code Assist 개인정보 안내(개인용)](https://developers.google.com/gemini-code-assist/resources/privacy-notice-gemini-code-assist-individuals) 참고
- 자세한 내용은 [quota and pricing](/gemini-cli/quota-and-pricing) 참고

## 2. Gemini API 키 (개발자 [API](https://ai.google.dev/gemini-api/docs) a: 무료, b: 유료)

Gemini API 키로 인증하는 경우:

- 서비스 약관: [Gemini API 서비스 약관](https://ai.google.dev/gemini-api/terms) 적용. [무료 서비스](https://ai.google.dev/gemini-api/terms#unpaid-services), [유료 서비스](https://ai.google.dev/gemini-api/terms#paid-services) 참고
- 개인정보 안내: [Google 개인정보처리방침](https://policies.google.com/privacy) 참고

## 3. Google 계정 로그인 (Workspace 또는 라이선스 사용자)

Gemini Code Assist의 Standard/Enterprise [에디션](https://cloud.google.com/gemini/docs/codeassist/overview#editions-overview) 사용자의 경우:

- 서비스 약관: [Google Cloud Platform 서비스 약관](https://cloud.google.com/terms) 적용
- 개인정보 안내: [Gemini Code Assist 개인정보 안내](https://developers.google.com/gemini-code-assist/resources/privacy-notices) 참고

## 4. Vertex AI (Vertex AI Gen [API](https://cloud.google.com/vertex-ai/generative-ai/docs/reference/rest) 사용)

Vertex AI Gen API 백엔드로 API 키를 사용하는 경우:

- 서비스 약관: [Google Cloud Platform 서비스 약관](https://cloud.google.com/terms/service-terms/) 적용
- 개인정보 안내: [Google Cloud 개인정보 안내](https://cloud.google.com/terms/cloud-privacy-notice) 참고

### 사용 통계(Usage Statistics) 옵트아웃

Google로 사용 통계 전송을 원하지 않는 경우, [Usage Statistics Configuration](/gemini-cli/cli/configuration#usage-statistics) 문서를 참고해 비활성화할 수 있습니다.

## Gemini CLI FAQ

### 1. 내 코드(프롬프트, 답변 등)가 Google 모델 학습에 사용되나요?

인증 방식에 따라 다릅니다.

- **방법 1:** 예. 개인 Google 계정 사용 시, Gemini Code Assist 개인정보 안내(개인용)가 적용되며, **프롬프트, 답변, 관련 코드가 수집**되어 Google 제품 개선(모델 학습 포함)에 사용될 수 있습니다.
- **방법 2a:** 예. Gemini API 키(무료) 사용 시, **프롬프트, 답변, 관련 코드가 수집**되어 Google 제품 개선에 사용될 수 있습니다.
- **방법 2b, 3, 4:** 아니오. 이 경우 입력 데이터는 기밀로 취급되며, 코드/프롬프트/입력값이 모델 학습에 사용되지 않습니다.

### 2. "Usage Statistics"란 무엇이며, 옵트아웃 시 어떤 데이터가 수집되지 않나요?

"Usage Statistics"는 Gemini CLI의 모든 선택적 데이터 수집을 제어하는 단일 설정입니다. 수집 데이터는 계정 유형에 따라 다릅니다.

- **방법 1:** 활성화 시, 익명 텔레메트리(명령, 성능 등)와 **프롬프트/답변**이 모두 수집됩니다.
- **방법 2a:** 활성화 시, 익명 텔레메트리와 **프롬프트/답변**이 모두 수집됩니다. 비활성화 시, [데이터 사용 안내](https://ai.google.dev/gemini-api/terms#data-use-unpaid) 참고.
- **방법 2b:** 익명 텔레메트리만 제어. Google은 금지된 사용 정책 위반 탐지 및 법적/규제상 필요에 따라 프롬프트/응답을 제한적으로 기록할 수 있음
- **방법 3, 4:** 익명 텔레메트리만 제어. 프롬프트/답변은 절대 수집되지 않음

어떤 계정이든 [Usage Statistics Configuration](/gemini-cli/cli/configuration#usage-statistics) 문서의 안내에 따라 사용 통계 전송을 비활성화할 수 있습니다. 