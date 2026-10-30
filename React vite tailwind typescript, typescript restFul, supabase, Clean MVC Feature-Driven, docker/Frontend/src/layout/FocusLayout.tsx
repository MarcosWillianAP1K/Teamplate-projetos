import type { ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, Layers } from "lucide-react";
import { APP_ROUTES } from "@/routes/utils/Path";

export interface FocusLayoutProps {
  children?: ReactNode;
  titulo?: string;
  subtitulo?: string;
  onVoltar?: () => void;
  showTopbar?: boolean;
}

export function FocusLayout({
  children,
  titulo,
  subtitulo,
  onVoltar,
  showTopbar = false,
}: FocusLayoutProps) {
  const navigate = useNavigate();

  const handleVoltar = () => {
    if (onVoltar) {
      onVoltar();
    } else {
      navigate(APP_ROUTES.EXEMPLO);
    }
  };

  return (
    <div
      data-testid="focus-layout"
      className="min-h-screen bg-background text-foreground flex flex-col w-full"
    >
      {showTopbar && (
        <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleVoltar}
              className="gap-2 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Button>
            <div className="flex flex-col">
              <span className="font-semibold text-sm leading-tight text-foreground-heading">
                {titulo || "Modo Foco"}
              </span>
              {subtitulo && (
                <span className="text-xs text-muted-foreground">{subtitulo}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Layers className="h-3 w-3" />
              <span>Foco Total</span>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 flex flex-col p-4 sm:p-6 w-full max-w-7xl mx-auto">
        {children || <Outlet />}
      </main>
    </div>
  );
}

export default FocusLayout;
