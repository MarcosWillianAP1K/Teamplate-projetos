/**
 * ============================================================================
 * MODO: USO SUPABASE (Cliente Oficial @supabase/supabase-js)
 * ============================================================================
 * Este arquivo inicializa o cliente do Supabase EXCLUSIVAMENTE para projetos
 * que optarem por usar o Supabase como Banco de Dados e/ou Autenticação.
 *
 * IMPORTANTE:
 * - Se você estiver rodando o projeto no modo `SemSupabase` (PostgreSQL no Docker/VPS),
 *   você NÃO precisa configurar as chaves do Supabase; utilize `core/SemSupabase/postgres.client.ts`.
 * - A chave `SUPABASE_SERVICE_ROLE_KEY` ignora o RLS e deve ficar SOMENTE no Backend.
 * ============================================================================
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'placeholder-key-for-template';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
