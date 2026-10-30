/**
 * ============================================================================
 * MODO: USO SUPABASE (Configuração Opcional do Supabase no Frontend)
 * ============================================================================
 * Utilize este arquivo se o seu projeto optar por consumir o Supabase
 * diretamente no Frontend (ex: Supabase Realtime, Storage ou OAuth direto).
 * ============================================================================
 */

export const supabaseFrontendConfig = {
  url: (import.meta.env.VITE_SUPABASE_URL as string | undefined) || "",
  anonKey: (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || "",
  ativo: import.meta.env.VITE_USE_SUPABASE === "true",
};
