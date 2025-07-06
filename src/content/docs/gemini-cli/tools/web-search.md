---
title: "웹 검색 도구 (google_web_search)"
description: "Gemini CLI에서 Google 검색을 수행하는 google_web_search 도구의 사용법, 주요 옵션, 예시 및 주의사항 안내."
---

# 웹 검색 도구 (`google_web_search`)

이 문서는 `google_web_search` 도구에 대해 설명합니다.

## 설명

`google_web_search`는 Gemini API를 통해 Google 검색을 수행하고, 결과 요약과 출처를 반환합니다.

### 인자

- `query`(필수): 검색 쿼리

## 사용법

- 쿼리를 입력하면 Gemini API가 웹 검색을 수행
- 결과 요약, 인용 포함 응답 반환

예시:
```
google_web_search(query="최신 AI 코드 생성 기술 동향")
```

## 참고사항

- **응답:** 검색 결과의 요약(원본 리스트 아님)
- **인용:** 요약에 사용된 출처 포함 