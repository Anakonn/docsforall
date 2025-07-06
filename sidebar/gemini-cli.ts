import type { StarlightUserConfig } from '@astrojs/starlight/types';

export const geminiCliSidebar = [
  {
    label: 'Gemini CLI',
    items: [
      { label: '개요', slug: 'gemini-cli' },
      { label: '실행 및 배포', slug: 'gemini-cli/deployment' },
      { label: '아키텍처', slug: 'gemini-cli/architecture' },
      {
        label: 'CLI',
        items: [
          { label: 'CLI 소개', slug: 'gemini-cli/cli' },
          { label: '명령어', slug: 'gemini-cli/cli/commands' },
          { label: '설정', slug: 'gemini-cli/cli/configuration' },
          { label: '토큰 캐싱', slug: 'gemini-cli/cli/token-caching' },
          { label: '테마', slug: 'gemini-cli/cli/themes' },
          { label: '튜토리얼', slug: 'gemini-cli/cli/tutorials' },
          { label: '인증', slug: 'gemini-cli/cli/authentication' },
        ],
      },
      {
        label: '핵심(Core)',
        items: [
          { label: '핵심 소개', slug: 'gemini-cli/core' },
          { label: '도구 API', slug: 'gemini-cli/core/tools-api' },
          { label: '메모리 임포트', slug: 'gemini-cli/core/memport' },
        ],
      },
      {
        label: '도구',
        items: [
          { label: '도구 개요', slug: 'gemini-cli/tools' },
          { label: '파일 시스템', slug: 'gemini-cli/tools/file-system' },
          { label: '멀티 파일', slug: 'gemini-cli/tools/multi-file' },
          { label: '셸', slug: 'gemini-cli/tools/shell' },
          { label: '웹 가져오기', slug: 'gemini-cli/tools/web-fetch' },
          { label: '웹 검색', slug: 'gemini-cli/tools/web-search' },
          { label: '메모리', slug: 'gemini-cli/tools/memory' },
          { label: 'MCP 서버', slug: 'gemini-cli/tools/mcp-server' },
        ],
      },
      { label: '샌드박싱', slug: 'gemini-cli/sandbox' },
      { label: '문제 해결', slug: 'gemini-cli/troubleshooting' },
      { label: 'NPM 워크스페이스', slug: 'gemini-cli/npm' },
      { label: '서비스 약관 및 개인정보', slug: 'gemini-cli/tos-privacy' },
    ],
  },
] satisfies StarlightUserConfig['sidebar']; 