/**
 * ============================================================================
 * MODO: USO SUPABASE (Configuração Opcional do Supabase no Frontend)
 * ============================================================================
 * Utilize este arquivo APENAS se o seu projeto optar por usar o Supabase
 * diretamente no Frontend (ex: Supabase Realtime ou OAuth direto).
 *
 * No modo `SemSupabase` (PostgreSQL no Docker/VPS), ignore este arquivo e use
 * a comunicação padrão REST (`core/api/http-client.ts`) + JWT (`core/SemSupabase/jwt-storage.ts`).
 * ============================================================================
 */

export const supabaseFrontendConfig = {
  url: (import.meta.env.VITE_SUPABASE_URL as string | undefined) || "",
  anonKey: (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || "",
  ativo: import.meta.env.VITE_USE_SUPABASE === "true",
};
