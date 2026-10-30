/**
 * ============================================================================
 * DICIONÁRIO DE ENDPOINTS DA API RESTful
 * ============================================================================
 * Centraliza os caminhos de URLs de todas as features para evitar strings soltas.
 * ============================================================================
 */

export const ENDPOINTS = {
  EXEMPLO: "/exemplo",
  AUTH: {
    LOGIN: "/auth/login",
    CADASTRO: "/auth/cadastro",
    ME: "/auth/me",
  },
} as const;

export type Endpoints = typeof ENDPOINTS;
