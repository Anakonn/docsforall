---
title: "멀티 파일 읽기 도구 (read_many_files)"
description: "여러 파일/디렉토리의 내용을 읽어 결합하는 read_many_files 도구의 사용법, 주요 옵션, 예시 및 주의사항 안내."
---

# 멀티 파일 읽기 도구 (`read_many_files`)

이 문서는 Gemini CLI의 `read_many_files` 도구에 대해 설명합니다.

## 설명

`read_many_files`는 지정한 경로나 glob 패턴에 해당하는 여러 파일의 내용을 읽어 하나의 문자열로 결합합니다.
- 텍스트 파일: 내용을 순차적으로 결합
- 이미지/PDF: base64 인코딩 데이터로 반환(명시적으로 요청된 경우)

코드베이스 개요 파악, 특정 기능 위치 찾기, 문서/설정 파일 일괄 검토 등 다양한 용도로 활용할 수 있습니다.

### 인자

- `paths`(필수): 읽을 파일/패턴 목록(예: `["src/**/*.ts"]`)
- `exclude`(선택): 제외할 glob 패턴(예: `["**/*.log"]`)
- `include`(선택): 추가로 포함할 패턴(예: `["*.test.ts"]`)
- `recursive`(선택): 재귀 탐색 여부(기본 true)
- `useDefaultExcludes`(선택): 기본 제외 패턴 적용 여부(기본 true)
- `respect_git_ignore`(선택): .gitignore 적용 여부(기본 true)

## 사용법

- 텍스트 파일: 각 파일 내용을 `--- {filePath} ---` 구분자로 결합
- 이미지/PDF: 명시적으로 요청된 경우 base64 인코딩 데이터 반환
- 기타 바이너리: 자동 감지 후 제외

예시:

- TypeScript 전체 읽기:
```
read_many_files(paths=["src/**/*.ts"])
```
- README, docs, 로고 이미지 읽기(특정 파일 제외):
```
read_many_files(paths=["README.md", "docs/**/*.md", "assets/logo.png"], exclude=["docs/OLD_README.md"])
```
- JS 전체 + 테스트/이미지 포함:
```
read_many_files(paths=["**/*.js"], include=["**/*.test.js", "images/**/*.jpg"], useDefaultExcludes=False)
```

## 참고사항

- **이진 파일 처리:**
  - 이미지/PDF: 명시적으로 요청된 경우만 base64 반환
  - 기타 바이너리: 자동 감지 후 제외
- **성능:** 대용량/다수 파일은 리소스 소모 주의
- **경로 지정:** 패턴/경로는 대상 디렉토리 기준으로 정확히 지정
- **기본 제외:** node_modules, .git 등은 기본적으로 제외됨 