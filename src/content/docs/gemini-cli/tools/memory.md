---
title: "메모리 도구 (save_memory)"
description: "Gemini CLI에서 세션 간 정보를 저장하고 불러오는 save_memory 도구의 사용법과 주의사항 안내."
---

# 메모리 도구 (`save_memory`)

이 문서는 Gemini CLI의 `save_memory` 도구에 대해 설명합니다.

## 설명

`save_memory`는 Gemini CLI 세션 간에 정보를 저장하고 불러올 수 있도록 해줍니다. 이 도구를 사용하면 CLI가 여러 세션에 걸쳐 주요 정보를 기억하여, 더 개인화되고 맥락 있는 지원을 제공합니다.

### 인자

- `fact`(필수): 기억할 구체적 정보(자연어로 명확하게 기술)

## 사용법

`save_memory`는 입력받은 `fact`를 사용자의 홈 디렉토리(`~/.gemini/GEMINI.md`)에 위치한 특수 파일에 추가합니다(파일명은 설정 가능).

추가된 정보는 `## Gemini Added Memories` 섹션에 저장되며, 이후 세션에서 맥락으로 자동 로드됩니다.

예시:

```
save_memory(fact="여기에 기억할 내용을 입력하세요.")
```

### 예시

- 사용자 선호 저장:
```
save_memory(fact="내가 선호하는 언어는 Python입니다.")
```
- 프로젝트 정보 저장:
```
save_memory(fact="현재 작업 중인 프로젝트명은 'gemini-cli'입니다.")
```

## 참고사항

- **간결한 정보 위주:** 대용량 데이터/대화 이력 저장 용도 아님
- **메모리 파일:** 일반 마크다운 파일로, 필요시 직접 열람/수정 가능 