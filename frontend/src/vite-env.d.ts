/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
