import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { SidebarLayout, FocusLayout } from "@/layout";
import { ExemploPage } from "@/features/exemplo";

export function Routes() {
  return (
    <RouterRoutes>
      {/* Redireciona a raiz para a feature de referência (/exemplo) */}
      <Route path="/" element={<Navigate to="/exemplo" replace />} />

      {/* Layout Principal com Menu Lateral (SidebarLayout) */}
      <Route element={<SidebarLayout />}>
        <Route path="/exemplo" element={<ExemploPage />} />
      </Route>

      {/* Layout Imersivo em Tela Cheia sem distrações (FocusLayout) */}
      <Route
        element={
          <FocusLayout
            showTopbar
            titulo="Modo Foco — Feature Exemplo"
            subtitulo="Visualização imersiva sem menu lateral"
          />
        }
      >
        <Route path="/exemplo/foco" element={<ExemploPage />} />
      </Route>

      {/* Fallback de rota não encontrada */}
      <Route path="*" element={<Navigate to="/exemplo" replace />} />
    </RouterRoutes>
  );
}

export default Routes;
