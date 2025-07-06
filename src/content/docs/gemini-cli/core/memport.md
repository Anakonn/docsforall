---
title: "메모리 임포트 프로세서"
description: "GEMINI.md 파일을 모듈화하여 @file.md 문법으로 다른 마크다운 파일을 가져오는 기능과 사용법 설명."
---

# 메모리 임포트 프로세서

메모리 임포트 프로세서는 `@file.md` 문법을 사용해 GEMINI.md 파일을 모듈화할 수 있는 기능입니다.

## 개요

이 기능을 통해 대형 GEMINI.md 파일을 더 작고 관리하기 쉬운 컴포넌트로 분할하고, 다양한 맥락에서 재사용할 수 있습니다. 상대/절대 경로 모두 지원하며, 순환 임포트 방지와 파일 접근 보안 등 안전장치가 내장되어 있습니다.

## 주요 제한사항

**이 기능은 `.md`(마크다운) 파일만 지원합니다.** 다른 확장자(`.txt`, `.json` 등)는 경고와 함께 임포트가 실패합니다.

## 문법

`@` 기호 뒤에 가져올 마크다운 파일의 경로를 작성합니다:

```markdown
# 메인 GEMINI.md 파일

이곳이 메인 내용입니다.

@./components/instructions.md

추가 내용.

@./shared/configuration.md
```

## 지원 경로 형식

### 상대 경로

- `@./file.md` - 동일 디렉토리에서 임포트
- `@../file.md` - 상위 디렉토리에서 임포트
- `@./components/file.md` - 하위 디렉토리에서 임포트

### 절대 경로

- `@/absolute/path/to/file.md` - 절대 경로로 임포트

## 예시

### 기본 임포트

```markdown
# 내 GEMINI.md

프로젝트에 오신 것을 환영합니다!

@./getting-started.md

## 기능

@./features/overview.md
```

### 중첩 임포트

임포트된 파일도 다시 임포트를 포함할 수 있습니다:

```markdown
# main.md

@./header.md
@./content.md
@./footer.md
```

```markdown
# header.md

# 프로젝트 헤더

@./shared/title.md
```

## 안전장치

### 순환 임포트 감지

프로세서는 순환 임포트를 자동으로 감지해 방지합니다:

```markdown
# file-a.md

@./file-b.md

# file-b.md

@./file-a.md <!-- 순환 감지 및 방지됨 -->
```

### 파일 접근 보안

`validateImportPath` 함수는 허용된 디렉토리 내에서만 임포트가 가능하도록 경로를 검증해 민감한 파일 접근을 차단합니다.

### 최대 임포트 깊이

무한 재귀를 방지하기 위해 최대 임포트 깊이(기본값: 10단계)가 설정되어 있습니다.

## 에러 처리

### 비마크다운 파일 시도

마크다운이 아닌 파일을 임포트하면 경고가 표시되고 실패합니다:

```markdown
@./instructions.txt <!-- 경고 및 실패 -->
```

콘솔 출력 예시:

```
[WARN] [ImportProcessor] 임포트 프로세서는 .md 파일만 지원합니다. 비마크다운 파일 시도: ./instructions.txt. 실패합니다.
```

### 파일 없음

참조한 파일이 없으면 임포트가 실패하며, 출력에 에러 주석이 남습니다.

### 파일 접근 에러

권한 문제 등 파일 시스템 에러도 적절한 메시지와 함께 처리됩니다.

## API 레퍼런스

### `processImports(content, basePath, debugMode?, importState?)`

GEMINI.md 내용에서 임포트 구문을 처리합니다.

**파라미터:**

- `content` (string): 임포트 처리할 내용
- `basePath` (string): 현재 파일이 위치한 디렉토리 경로
- `debugMode` (boolean, optional): 디버그 로깅 활성화 여부(기본값: false)
- `importState` (ImportState, optional): 순환 임포트 방지용 상태 추적

**반환:** Promise<string> - 임포트가 처리된 최종 내용

### `validateImportPath(importPath, basePath, allowedDirectories)`

임포트 경로가 안전하고 허용된 디렉토리 내에 있는지 검증합니다.

**파라미터:**

- `importPath` (string): 검증할 임포트 경로
- `basePath` (string): 상대 경로 기준 디렉토리
- `allowedDirectories` (string[]): 허용된 디렉토리 배열

**반환:** boolean - 임포트 경로의 유효성

## 베스트 프랙티스

1. **설명력 있는 파일명 사용**
2. **임포트 깊이 최소화**
3. **구조 문서화**
4. **임포트 테스트**
5. **상대 경로 우선 사용**

## 문제 해결

### 자주 발생하는 이슈

1. **임포트 불가:** 파일 존재 및 .md 확장자 확인
2. **순환 임포트 경고:** 임포트 구조 점검
3. **권한 에러:** 파일 읽기 권한 및 경로 확인
4. **경로 해석 문제:** 상대 경로가 안 될 때 절대 경로 사용

### 디버그 모드

임포트 과정을 상세히 로깅하려면 디버그 모드를 활성화하세요:

```typescript
const result = await processImports(content, basePath, true);
``` 