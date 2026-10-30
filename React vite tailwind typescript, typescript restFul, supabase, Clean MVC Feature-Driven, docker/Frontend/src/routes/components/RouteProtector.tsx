import { type ReactNode, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { APP_ROUTES } from "../utils/Path";
import { getStoredToken } from "@/features/autenticacao";

export interface RouteProtectorProps {
  children: ReactNode;
  allowedRoles?: string[];
}

/**
 * RouteProtector — Componente de guarda para proteger o Layout Pai ou rotas privadas
 *
 * COMO USAR NO SEU PROJETO:
 * - Para ativar a exigência estrita de autenticação (redirecionar se não estiver logado),
 *   substitua a condição abaixo por `if (!token) return <Navigate to={APP_ROUTES.LOGIN} replace />;`
 * - Por padrão no template de início rápido, permite acesso para você desenvolver e testar sem travas.
 */
export function RouteProtector({
  children,
  allowedRoles,
}: RouteProtectorProps): JSX.Element {
  const token = getStoredToken();

  // Exemplo de verificação de permissão e autenticação:
  if (allowedRoles && allowedRoles.length > 0 && !token) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}

export default RouteProtector;
