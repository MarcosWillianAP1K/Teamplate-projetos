/**
 * ============================================================================
 * MODO: SEM SUPABASE (PostgreSQL no Docker / VPS Própria)
 * ============================================================================
 * Este arquivo centraliza a configuração de conexão direta com o banco de dados
 * PostgreSQL rodando no container Docker (`docker-compose.yml`) ou em uma VPS.
 *
 * QUANDO USAR:
 * - Quando você NÃO estiver usando o Supabase Cloud e quiser rodar seu próprio
 *   PostgreSQL localmente via Docker ou em servidor Linux/VPS.
 *
 * COMO ATIVAR COM O DRIVER 'pg' (node-postgres):
 * 1. Instale o driver: `npm install pg && npm install -D @types/pg`
 * 2. Descomente o bloco do `Pool` abaixo e importe `pool` nos seus Models.
 * ============================================================================
 */

import dotenv from 'dotenv';

dotenv.config();

export interface PostgresConnectionConfig {
  connectionString: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl: boolean;
}

/**
 * Configuração lida das variáveis de ambiente (seção SEM SUPABASE do `.env`).
 * No Docker Compose, o `DB_HOST` entre containers é `postgres` e localmente é `localhost`.
 */
export const postgresConfig: PostgresConnectionConfig = {
  connectionString:
    process.env.DATABASE_URL ||
    `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'postgres'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'template_db'}`,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'template_db',
  ssl: process.env.DB_SSL === 'true',
};

/*
 * ============================================================================
 * EXEMPLO PRONTO PARA DESCOMENTAR (usando `pg` Pool):
 * ============================================================================
 * import { Pool } from 'pg';
 *
 * export const pool = new Pool({
 *   connectionString: postgresConfig.connectionString,
 *   ssl: postgresConfig.ssl ? { rejectUnauthorized: false } : false,
 *   max: 20,
 *   idleTimeoutMillis: 30000,
 *   connectionTimeoutMillis: 5000,
 * });
 */
