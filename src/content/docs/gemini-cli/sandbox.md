---
title: "Gemini CLI 샌드박싱 가이드"
description: "Gemini CLI의 샌드박싱 개념, 설정, 문제 해결 방법을 안내합니다."
---

# Gemini CLI 샌드박싱

이 문서는 Gemini CLI의 샌드박싱에 대한 가이드로, 사전 준비, 빠른 시작, 설정 방법을 포함합니다.

## 사전 준비

샌드박싱을 사용하기 전에 Gemini CLI를 설치하고 설정해야 합니다:

```bash
# gemini-cli 설치
npm install -g @google/gemini-cli

# 설치 확인
gemini --version
```

## 샌드박싱 개요

샌드박싱은 잠재적으로 위험한 작업(셸 명령, 파일 수정 등)을 호스트 시스템과 격리하여, AI 작업과 환경 사이에 보안 장벽을 제공합니다.

샌드박싱의 장점:
- **보안:** 실수로 인한 시스템 손상/데이터 손실 방지
- **격리:** 프로젝트 디렉토리로 파일 시스템 접근 제한
- **일관성:** 다양한 시스템에서 재현 가능한 환경 보장
- **안전성:** 신뢰할 수 없는 코드나 실험적 명령 실행 시 위험 감소

## 샌드박싱 방식

플랫폼 및 선호하는 컨테이너 솔루션에 따라 다양한 샌드박싱 방식을 사용할 수 있습니다.

### 1. macOS Seatbelt (macOS 전용)

`sandbox-exec`을 활용한 경량 내장 샌드박싱
- **기본 프로필:** `permissive-open` (프로젝트 외부 쓰기 제한, 대부분의 작업 허용)

### 2. 컨테이너 기반 (Docker/Podman)

완전한 프로세스 격리를 제공하는 크로스플랫폼 샌드박싱
- **참고:** 로컬에서 샌드박스 이미지를 빌드하거나 조직의 레지스트리에서 이미지를 사용해야 함

## 빠른 시작

```bash
# 명령 플래그로 샌드박싱 활성화
gemini -s -p "코드 구조 분석"

# 환경 변수 사용
export GEMINI_SANDBOX=true
gemini -p "테스트 스위트 실행"

# settings.json에서 설정
{
  "sandbox": "docker"
}
```

## 설정

### 샌드박싱 활성화 우선순위(상위가 우선 적용)
1. **명령 플래그:** `-s` 또는 `--sandbox`
2. **환경 변수:** `GEMINI_SANDBOX=true|docker|podman|sandbox-exec`
3. **설정 파일:** `settings.json`의 `"sandbox": true`

### macOS Seatbelt 프로필

`SEATBELT_PROFILE` 환경 변수로 내장 프로필 지정:
- `permissive-open` (기본): 쓰기 제한, 네트워크 허용
- `permissive-closed`: 쓰기 제한, 네트워크 차단
- `permissive-proxied`: 쓰기 제한, 프록시 경유 네트워크
- `restrictive-open`: 엄격 제한, 네트워크 허용
- `restrictive-closed`: 최대 제한

## Linux UID/GID 처리

샌드박스는 Linux에서 사용자 권한을 자동 처리합니다. 다음으로 오버라이드 가능:

```bash
export SANDBOX_SET_UID_GID=true   # 호스트 UID/GID 강제 적용
export SANDBOX_SET_UID_GID=false  # UID/GID 매핑 비활성화
```

## 문제 해결

### 일반적인 문제

**"Operation not permitted"**
- 샌드박스 외부 접근 필요 시 발생
- 더 관대한 프로필 사용 또는 마운트 포인트 추가 시도

**명령어 누락**
- 커스텀 Dockerfile에 추가
- `sandbox.bashrc`로 설치

**네트워크 문제**
- 샌드박스 프로필이 네트워크 허용하는지 확인
- 프록시 설정 확인

### 디버그 모드

```bash
DEBUG=1 gemini -s -p "debug command"
```

### 샌드박스 환경 점검

```bash
# 환경 변수 확인
gemini -s -p "run shell command: env | grep SANDBOX"

# 마운트 목록 확인
gemini -s -p "run shell command: mount | grep workspace"
```

## 보안 참고사항
- 샌드박싱은 위험을 줄이지만 완전히 제거하지는 못함
- 작업에 필요한 최소한의 관대한 프로필 사용 권장
- 컨테이너 오버헤드는 최초 빌드 후에는 미미함
- GUI 앱은 샌드박스 내에서 동작하지 않을 수 있음

## 관련 문서
- [설정](/gemini-cli/cli/configuration): 전체 설정 옵션
- [명령어](/gemini-cli/cli/commands): 사용 가능한 명령어
- [문제 해결](/gemini-cli/troubleshooting): 일반적인 문제 해결법 