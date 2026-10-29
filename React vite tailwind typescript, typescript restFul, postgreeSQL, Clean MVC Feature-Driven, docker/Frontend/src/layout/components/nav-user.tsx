import {
  ChevronDown,
  CircleHelp,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { USUARIO_PADRAO_MOCK } from "@/shared/types/bdmock";
import { useTheme } from "@/shared/providers/theme-provider";

export interface NavUserProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    roleLabel?: string;
    registroProfissional?: string;
  };
}

function extrairIniciais(nomeCompleto: string): string {
  const partes = nomeCompleto
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (partes.length === 0) return "DV";
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export function NavUser({ user }: NavUserProps = {}) {
  const { theme, setTheme } = useTheme();

  const displayName = user?.name || USUARIO_PADRAO_MOCK.nome;
  const displayEmail = user?.email || USUARIO_PADRAO_MOCK.email;
  const displayAvatar = user?.avatar;
  const displayRole = user?.roleLabel || USUARIO_PADRAO_MOCK.cargo;
  const displayRegistro =
    user?.registroProfissional || USUARIO_PADRAO_MOCK.registro || "DEV-001";

  const iniciais = extrairIniciais(displayName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Menu de perfil de ${displayName}`}
          className="flex flex-row items-center gap-3 p-1 pr-3 rounded-full hover:bg-surface-alt transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Avatar className="h-9 w-9 rounded-full border border-primary-light">
            {displayAvatar ? (
              <AvatarImage src={displayAvatar} alt={displayName} />
            ) : null}
            <AvatarFallback className="rounded-full bg-primary/10 text-primary font-semibold text-xs">
              {iniciais}
            </AvatarFallback>
          </Avatar>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[14px] font-semibold text-foreground-heading leading-tight">
              {displayName}
            </span>
            <span className="text-[12px] font-medium text-foreground leading-tight max-w-45 truncate">
              {displayRole}
            </span>
            <span className="sr-only">{displayEmail}</span>
          </div>

          <ChevronDown
            className="w-4 h-4 text-foreground/60 transition-transform duration-200"
            aria-hidden="true"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 rounded-2xl p-2 shadow-lg"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="p-2 font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-[14px] font-semibold text-foreground-heading leading-tight">
              {displayName}
            </p>
            <p className="text-[12px] text-foreground leading-tight truncate">
              {displayEmail}
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px] text-primary">
              <span>{displayRole}</span>
              <span className="font-mono text-foreground/60">
                {displayRegistro}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer rounded-lg"
          >
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            <span>Alternar Tema ({theme === "dark" ? "Claro" : "Escuro"})</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer rounded-lg">
            <CircleHelp className="mr-2 h-4 w-4" />
            <span>Documentação (/api/docs)</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer rounded-lg text-destructive focus:text-destructive focus:bg-destructive/10">
          <LogOut className="mr-2 h-4 w-4 text-destructive" />
          <span>Encerrar Sessão</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavUser;
