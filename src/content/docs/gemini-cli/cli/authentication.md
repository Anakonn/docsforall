---
title: "인증 설정"
description: "Google AI 서비스와의 인증 설정 방법을 안내합니다."
---

# 인증 설정

Gemini CLI는 Google AI 서비스와의 인증이 필요합니다. 초기 시작 시 다음 인증 방법 중 **하나**를 설정해야 합니다:

1. **Google 계정 로그인 (Gemini Code Assist):**
   - Google 계정으로 로그인하는 옵션입니다.
   - 초기 시작 시 Gemini CLI가 인증을 위한 웹페이지로 안내합니다. 인증 후 자격 증명이 로컬에 캐시되어 이후 실행 시 웹 로그인을 건너뛸 수 있습니다.
   - 웹 로그인은 Gemini CLI가 실행되는 머신과 통신할 수 있는 브라우저에서 수행해야 합니다. (구체적으로, 브라우저가 Gemini CLI가 수신 대기하는 localhost URL로 리디렉션됩니다).
   - <a id="workspace-gca">다음 경우 사용자는 GOOGLE_CLOUD_PROJECT를 지정해야 할 수 있습니다:</a>
     1. Google Workspace 계정이 있는 경우. Google Workspace는 비즈니스와 조직을 위한 유료 서비스로, 맞춤 이메일 도메인(예: your-name@your-company.com), 향상된 보안 기능, 관리 제어를 포함한 생산성 도구 모음을 제공합니다. 이러한 계정은 종종 고용주나 학교에서 관리합니다.
     1. [Google Developer Program](https://developers.google.com/program/plans-and-pricing)을 통해 무료 Code Assist 라이선스를 받은 경우 (자격을 갖춘 Google Developer Experts 포함)
     1. 현재 Gemini Code Assist Standard 또는 Enterprise 구독에 라이선스가 할당된 경우
     1. 무료 개인 사용을 위한 [지원 지역](https://developers.google.com/gemini-code-assist/resources/available-locations) 외부에서 제품을 사용하는 경우
     1. 18세 미만의 Google 계정 소유자인 경우
     - 이 카테고리 중 하나에 해당하는 경우, 먼저 사용할 Google Cloud Project ID를 구성하고, [Gemini for Cloud API를 활성화](https://cloud.google.com/gemini/docs/discover/set-up-gemini#enable-api)하고 [접근 권한을 구성](https://cloud.google.com/gemini/docs/discover/set-up-gemini#grant-iam)해야 합니다.

     현재 셸 세션에서 환경 변수를 임시로 설정하려면 다음 명령어를 사용하세요:

     ```bash
     export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
     ```
     - 반복 사용을 위해 환경 변수를 [.env 파일](#persisting-environment-variables-with-env-files) 또는 셸 구성 파일(`~/.bashrc`, `~/.zshrc`, `~/.profile`)에 추가할 수 있습니다. 예를 들어, 다음 명령어는 환경 변수를 `~/.bashrc` 파일에 추가합니다:

     ```bash
     echo 'export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"' >> ~/.bashrc
     source ~/.bashrc
     ```

2. **<a id="gemini-api-key"></a>Gemini API 키:**
   - Google AI Studio에서 API 키를 발급받으세요: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
   - `GEMINI_API_KEY` 환경 변수를 설정하세요. 다음 방법에서 `YOUR_GEMINI_API_KEY`를 Google AI Studio에서 발급받은 API 키로 교체하세요:
     - 현재 셸 세션에서 환경 변수를 임시로 설정하려면 다음 명령어를 사용하세요:
       ```bash
       export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
       ```
     - 반복 사용을 위해 환경 변수를 [.env 파일](#persisting-environment-variables-with-env-files) 또는 셸 구성 파일(`~/.bashrc`, `~/.zshrc`, `~/.profile`)에 추가할 수 있습니다. 예를 들어, 다음 명령어는 환경 변수를 `~/.bashrc` 파일에 추가합니다:
       ```bash
       echo 'export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"' >> ~/.bashrc
       source ~/.bashrc
       ```

3. **Vertex AI:**
   - Express 모드를 사용하지 않는 경우:
     - Google Cloud 프로젝트가 있고 Vertex AI API가 활성화되어 있는지 확인하세요.
     - Application Default Credentials (ADC)를 설정하세요:
       ```bash
       gcloud auth application-default login
       ```
       자세한 내용은 [Google Cloud용 Application Default Credentials 설정](https://cloud.google.com/docs/authentication/provide-credentials-adc)을 참고하세요.
     - `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION`, `GOOGLE_GENAI_USE_VERTEXAI` 환경 변수를 설정하세요. 다음 방법에서 `YOUR_PROJECT_ID`와 `YOUR_PROJECT_LOCATION`을 프로젝트의 관련 값으로 교체하세요:
       - 현재 셸 세션에서 이러한 환경 변수를 임시로 설정하려면 다음 명령어를 사용하세요:
         ```bash
         export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
         export GOOGLE_CLOUD_LOCATION="YOUR_PROJECT_LOCATION" # 예: us-central1
         export GOOGLE_GENAI_USE_VERTEXAI=true
         ```
       - 반복 사용을 위해 환경 변수를 [.env 파일](#persisting-environment-variables-with-env-files) 또는 셸 구성 파일(`~/.bashrc`, `~/.zshrc`, `~/.profile`)에 추가할 수 있습니다. 예를 들어, 다음 명령어는 환경 변수를 `~/.bashrc` 파일에 추가합니다:
         ```bash
         echo 'export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"' >> ~/.bashrc
         echo 'export GOOGLE_CLOUD_LOCATION="YOUR_PROJECT_LOCATION"' >> ~/.bashrc
         echo 'export GOOGLE_GENAI_USE_VERTEXAI=true' >> ~/.bashrc
         source ~/.bashrc
         ```
   - Express 모드를 사용하는 경우:
     - `GOOGLE_API_KEY` 환경 변수를 설정하세요. 다음 방법에서 `YOUR_GOOGLE_API_KEY`를 Express 모드에서 제공하는 Vertex AI API 키로 교체하세요:
       - 현재 셸 세션에서 이러한 환경 변수를 임시로 설정하려면 다음 명령어를 사용하세요:
         ```bash
         export GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY"
         export GOOGLE_GENAI_USE_VERTEXAI=true
         ```
       - 반복 사용을 위해 환경 변수를 [.env 파일](#persisting-environment-variables-with-env-files) 또는 셸 구성 파일(`~/.bashrc`, `~/.zshrc`, `~/.profile`)에 추가할 수 있습니다. 예를 들어, 다음 명령어는 환경 변수를 `~/.bashrc` 파일에 추가합니다:
         ```bash
         echo 'export GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY"' >> ~/.bashrc
         echo 'export GOOGLE_GENAI_USE_VERTEXAI=true' >> ~/.bashrc
         source ~/.bashrc
         ```

### `.env` 파일로 환경 변수 영구 저장

프로젝트 디렉토리 또는 홈 디렉토리에 **`.gemini/.env`** 파일을 생성할 수 있습니다. 일반 **`.env`** 파일을 생성해도 작동하지만, `.gemini/.env`를 권장하여 Gemini 변수를 다른 도구와 격리합니다.

Gemini CLI는 다음 검색 순서에 따라 발견되는 **첫 번째** `.env` 파일에서 환경 변수를 자동으로 로드합니다:

1. **현재 디렉토리**에서 시작하여 `/`를 향해 위로 이동하면서 각 디렉토리에서 확인:
   1. `.gemini/.env`
   2. `.env`
2. 파일을 찾지 못한 경우 **홈 디렉토리**로 폴백:
   - `~/.gemini/.env`
   - `~/.env`

> **중요:** 검색은 발견되는 **첫 번째** 파일에서 중단됩니다—변수는 여러 파일에 걸쳐 **병합되지 않습니다**.

#### 예시

**프로젝트별 오버라이드** (프로젝트 내부에 있을 때 우선순위):

```bash
mkdir -p .gemini
echo 'GOOGLE_CLOUD_PROJECT="your-project-id"' >> .gemini/.env
```

**사용자 전체 설정** (모든 디렉토리에서 사용 가능):

```bash
mkdir -p ~/.gemini
cat >> ~/.gemini/.env <<'EOF'
GOOGLE_CLOUD_PROJECT="your-project-id"
GEMINI_API_KEY="your-gemini-api-key"
EOF
``` 