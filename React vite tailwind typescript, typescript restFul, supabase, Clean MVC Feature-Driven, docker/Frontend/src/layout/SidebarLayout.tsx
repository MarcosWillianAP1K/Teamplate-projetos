import { type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./components/app-sidebar";
import { NavUser } from "./components/nav-user";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { useExemploStore } from "@/features/exemplo/store/exemplo.store";

export interface SidebarLayoutProps {
  children?: ReactNode;
  usuarioNome?: string;
}

export function SidebarLayout({
  children,
  usuarioNome = "Desenvolvedor",
}: SidebarLayoutProps) {
  const abrirModalCriacao = useExemploStore((s) => s.abrirModalCriacao);

  return (
    <SidebarProvider>
      <AppSidebar onCreateNewItem={() => abrirModalCriacao()} />
      <SidebarInset className="min-h-svh max-h-svh overflow-x-hidden flex flex-row">
        <div className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
          <header className="flex flex-row justify-between items-center px-6 py-3.5 w-full bg-background border-b border-border transition-colors shrink-0 relative">
            {/* Lado Esquerdo: SidebarTrigger + Divisor + Saudação */}
            <div className="flex items-center gap-3 min-w-0">
              <SidebarTrigger className="-ml-1 shrink-0" />
              <div
                className="h-5 w-px bg-border shrink-0"
                aria-hidden="true"
              />
              <h1 className="text-[20px] md:text-[24px] font-bold text-primary leading-tight tracking-tight truncate">
                Olá, {usuarioNome}
              </h1>
            </div>

            {/* Lado Direito: Perfil */}
            <div className="flex flex-row items-center gap-4 md:gap-6 shrink-0 relative">
              <NavUser user={{ name: usuarioNome }} />
            </div>
          </header>

          <main className="relative flex flex-1 min-h-0 flex-col overflow-y-auto overflow-x-hidden p-4 sm:p-6">
            {children ?? <Outlet />}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default SidebarLayout;
