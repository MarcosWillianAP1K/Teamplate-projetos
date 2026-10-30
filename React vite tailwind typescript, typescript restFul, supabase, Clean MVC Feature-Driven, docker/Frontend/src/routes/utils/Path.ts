/**
 * ============================================================================
 * DICIONÁRIO CENTRAL DE ROTAS DO FRONTEND (APP_ROUTES)
 * ============================================================================
 * Centraliza os caminhos de navegação do frontend.
 * ============================================================================
 */

export const APP_ROUTES = {
  ROOT: "/",
  EXEMPLO: "/exemplo",
} as const;

export type AppRoutes = typeof APP_ROUTES;
