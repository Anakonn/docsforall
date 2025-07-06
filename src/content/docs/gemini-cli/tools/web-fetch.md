---
title: "웹 가져오기 도구 (web_fetch)"
description: "여러 URL의 콘텐츠를 요약, 비교, 추출하는 web_fetch 도구의 사용법, 주요 옵션, 예시 및 주의사항 안내."
---

# 웹 가져오기 도구 (`web_fetch`)

이 문서는 Gemini CLI의 `web_fetch` 도구에 대해 설명합니다.

## 설명

`web_fetch`는 하나 이상의 URL(최대 20개)에서 콘텐츠를 가져와 요약, 비교, 정보 추출 등을 수행합니다. 자연어 프롬프트에 URL과 처리 지시를 포함해 사용합니다.

### 인자

- `prompt`(필수): URL(최대 20개)과 처리 지시가 포함된 자연어 프롬프트(예: "https://example.com/article 요약 및 https://another.com/data에서 주요 포인트 추출")

## 사용법

- 프롬프트에 URL 포함 시, 도구가 URL 접근 전 사용자 확인 요청
- Gemini API가 URL 접근 불가 시, 로컬에서 직접 콘텐츠를 가져옴
- 결과는 출처/인용 포함 포맷으로 반환

예시:

- 단일 기사 요약:
```
web_fetch(prompt="https://example.com/news/latest 주요 내용 요약")
```
- 두 논문 비교:
```
web_fetch(prompt="이 두 논문의 결론 차이점: https://arxiv.org/abs/2401.0001, https://arxiv.org/abs/2401.0002")
```

## 참고사항

- **URL 처리:** Gemini API의 URL 접근/처리 능력에 의존
- **출력 품질:** 프롬프트 명확성에 따라 결과 품질 달라짐 