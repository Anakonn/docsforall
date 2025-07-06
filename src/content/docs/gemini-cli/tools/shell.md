---
title: "셸 도구 (run_shell_command)"
description: "Gemini CLI에서 셸 명령을 실행하는 run_shell_command 도구의 사용법, 주요 옵션, 보안 및 제한 안내."
---

# 셸 도구 (`run_shell_command`)

이 문서는 Gemini CLI의 `run_shell_command` 도구에 대해 설명합니다.

## 설명

`run_shell_command`는 시스템 명령어, 스크립트 실행 등 다양한 커맨드라인 작업을 수행할 수 있습니다. Windows에서는 `cmd.exe /c`, 기타 플랫폼에서는 `bash -c`로 실행됩니다.

### 인자

- `command`(필수): 실행할 셸 명령
- `description`(선택): 명령 목적 설명(사용자에게 표시)
- `directory`(선택): 실행 디렉토리(기본: 프로젝트 루트)

## 사용법

- 명령은 서브프로세스로 실행되며, 표준 출력/에러, 종료 코드, 백그라운드 PID 등 상세 결과를 반환합니다.
- 백그라운드 실행(`&`) 시 즉시 반환, PID 정보 제공

예시:

- 현재 디렉토리 파일 목록:
```
run_shell_command(command="ls -la")
```
- 특정 디렉토리에서 스크립트 실행:
```
run_shell_command(command="./my_script.sh", directory="scripts", description="커스텀 스크립트 실행")
```
- 백그라운드 서버 실행:
```
run_shell_command(command="npm run dev &", description="백그라운드 개발 서버 실행")
```

## 참고사항

- **보안:** 사용자 입력 기반 명령 실행 시 주의
- **대화형 명령:** 상호작용 요구 명령은 비권장(비대화형 플래그 사용 권장)
- **에러 처리:** Stderr, Error, Exit Code 필드로 성공 여부 확인
- **백그라운드:** `&` 사용 시 PID 반환, 즉시 제어권 복귀

## 명령 제한

- `coreTools`, `excludeTools` 설정으로 허용/차단 명령 제어 가능
- 체인 명령(`&&`, `||`, `;`)은 각 부분별로 검증, 일부라도 차단 시 전체 거부
- 접두사 매칭, 블록리스트 우선 적용

### 제한 예시

- 특정 명령만 허용:
```json
{
  "coreTools": ["run_shell_command(git)", "run_shell_command(npm)"]
}
```
- 특정 명령만 차단:
```json
{
  "coreTools": ["run_shell_command"],
  "excludeTools": ["run_shell_command(rm)"]
}
```
- 블록리스트 우선:
```json
{
  "coreTools": ["run_shell_command(git)"],
  "excludeTools": ["run_shell_command(git push)"]
}
```
- 전체 차단:
```json
{
  "excludeTools": ["run_shell_command"]
}
```

> excludeTools 기반 제한은 단순 문자열 매칭이므로 보안용이 아님. 신뢰할 수 없는 코드 실행은 coreTools로 명확히 허용된 명령만 사용 권장. 