#!/bin/bash

# gemini-cli 저장소에서 docs 폴더만 복사하는 스크립트
# 사용법: ./scripts/clone-gemini-cli-docs.sh

set -e  # 오류 발생 시 스크립트 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수들
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 변수 정의
REPO_URL="https://github.com/google-gemini/gemini-cli.git"
TMP_DIR="/tmp/gemini-cli-temp"
TARGET_DIR=".sources/gemini-cli"

log_info "gemini-cli 저장소에서 docs 폴더 복사를 시작합니다..."

# 임시 디렉토리 정리 (이미 존재하는 경우)
if [ -d "$TMP_DIR" ]; then
    log_warning "기존 임시 디렉토리를 정리합니다: $TMP_DIR"
    rm -rf "$TMP_DIR"
fi

# 임시 디렉토리 생성
log_info "임시 디렉토리를 생성합니다: $TMP_DIR"
mkdir -p "$TMP_DIR"

# 저장소 클론
log_info "gemini-cli 저장소를 클론합니다..."
git clone "$REPO_URL" "$TMP_DIR"

# docs 폴더 존재 확인
if [ ! -d "$TMP_DIR/docs" ]; then
    log_error "docs 폴더를 찾을 수 없습니다: $TMP_DIR/docs"
    exit 1
fi

# 대상 디렉토리 생성
log_info "대상 디렉토리를 생성합니다: $TARGET_DIR"
mkdir -p "$TARGET_DIR"

# 기존 내용 정리 (이미 존재하는 경우)
if [ -d "$TARGET_DIR" ] && [ "$(ls -A "$TARGET_DIR")" ]; then
    log_warning "기존 내용을 정리합니다: $TARGET_DIR"
    rm -rf "$TARGET_DIR"/*
fi

# docs 폴더 복사
log_info "docs 폴더를 복사합니다..."
cp -r "$TMP_DIR/docs"/* "$TARGET_DIR/"

# 임시 디렉토리 정리
log_info "임시 디렉토리를 정리합니다: $TMP_DIR"
rm -rf "$TMP_DIR"

# 복사 결과 확인
if [ -d "$TARGET_DIR" ] && [ "$(ls -A "$TARGET_DIR")" ]; then
    log_success "docs 폴더 복사가 완료되었습니다: $TARGET_DIR"
    log_info "복사된 파일 목록:"
    ls -la "$TARGET_DIR"
else
    log_error "docs 폴더 복사에 실패했습니다."
    exit 1
fi

log_success "스크립트 실행이 완료되었습니다!" 