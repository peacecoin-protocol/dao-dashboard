/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_PINATA_GATEWAY_URL?: string;
  readonly VITE_WALLET_ADDRESS_PLACEHOLDER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
