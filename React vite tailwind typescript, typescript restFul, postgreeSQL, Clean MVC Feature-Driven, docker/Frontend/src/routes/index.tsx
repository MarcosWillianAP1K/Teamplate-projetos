import { useEffect, type JSX } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Importando paths
import { APP_ROUTES } from "./utils/Path";

// Importando o Layout Pai
import { SidebarLayout, FocusLayout } from "@/layout";

// Importando o RouteProtector para proteger as rotas
import { RouteProtector } from "./components/RouteProtector";

// Importando as Telas Prontas
import { ExemploPage } from "@/features/exemplo";
import { LoginPage } from "@/features/autenticacao/pages/LoginPage";
import { CadastroPage } from "@/features/autenticacao/pages/CadastroPage";
import { logoutService, getStoredToken } from "@/features/autenticacao";

// Componente genérico para as telas não finalizadas / protegidas
// eslint-disable-next-line react-refresh/only-export-components
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = getStoredToken();
  // Quando ativado no projeto: se não houver token, redireciona para Login
  if (!token && import.meta.env.VITE_REQUIRE_AUTH === "true") {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }
  return children;
};

// eslint-disable-next-line react-refresh/only-export-components
const LogoutRoute = () => {
  useEffect(() => {
    logoutService();
  }, []);

  return <Navigate to={APP_ROUTES.LOGIN} replace />;
};

// Mapa central de rotas do sistema
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteProtector>
        <SidebarLayout />
      </RouteProtector>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={APP_ROUTES.EXEMPLO} replace />,
      },
      {
        path: APP_ROUTES.EXEMPLO,
        element: <ExemploPage />,
      },
    ],
  },
  {
    path: APP_ROUTES.EXEMPLO_FOCO,
    element: (
      <RequireAuth>
        <FocusLayout
          showTopbar
          titulo="Modo Foco — Feature Exemplo"
          subtitulo="Visualização imersiva sem menu lateral"
        >
          <ExemploPage />
        </FocusLayout>
      </RequireAuth>
    ),
  },
  {
    path: APP_ROUTES.LOGOUT,
    element: <LogoutRoute />,
  },
  {
    path: APP_ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: APP_ROUTES.CADASTRO,
    element: <CadastroPage />,
  },
  {
    path: "*",
    element: <Navigate to={APP_ROUTES.EXEMPLO} replace />,
  },
]);

export default router;
