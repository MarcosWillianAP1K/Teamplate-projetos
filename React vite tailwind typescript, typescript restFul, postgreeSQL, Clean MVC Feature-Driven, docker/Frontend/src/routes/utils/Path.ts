/**
 * ============================================================================
 * DICIONÁRIO CENTRAL DE ROTAS DO FRONTEND (APP_ROUTES)
 * ============================================================================
 * Evita strings soltas espalhadas pelo código. Sempre que criar uma tela nova,
 * registre o caminho aqui e utilize no router e nas navegações (ex: useNavigate()).
 * ============================================================================
 */

export const APP_ROUTES = {
  ROOT: "/",
  EXEMPLO: "/exemplo",
  EXEMPLO_FOCO: "/exemplo/foco",
  LOGIN: "/login",
  CADASTRO: "/cadastro",
  LOGOUT: "/logout",
} as const;

export type AppRoutes = typeof APP_ROUTES;
