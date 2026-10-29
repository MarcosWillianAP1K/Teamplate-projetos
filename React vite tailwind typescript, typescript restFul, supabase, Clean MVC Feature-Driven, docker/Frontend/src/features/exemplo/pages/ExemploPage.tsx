import { Plus, Search, RefreshCw, Layers } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { CardExemplo } from "../components/CardExemplo";
import { DialogCriarExemplo } from "../components/DialogCriarExemplo";
import { useExemplo } from "../hooks/useExemplo";

/**
 * Master page for the Exemplo feature (`/exemplo`).
 * Orchestrates hooks, Zustand state, and atomic child components.
 */
export function ExemploPage() {
  const {
    itens,
    isLoading,
    erro,
    isModalCriacaoAberto,
    filtroCategoria,
    termoBusca,
    abrirModalCriacao,
    fecharModalCriacao,
    setFiltroCategoria,
    setTermoBusca,
    buscar,
    criarItem,
    desativarItem,
  } = useExemplo();

  const categorias = [
    { valor: "todas", label: "Todas" },
    { valor: "arquitetura", label: "Arquitetura" },
    { valor: "frontend", label: "Frontend" },
    { valor: "backend", label: "Backend" },
    { valor: "banco", label: "Banco de Dados" },
    { valor: "geral", label: "Geral" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Cabeçalho da Página */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Layers className="h-4 w-4" />
            <span>Feature de Referência (Clean Architecture)</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground-heading mt-1">
            Catálogo de Exemplo
          </h2>
          <p className="text-sm text-muted-foreground">
            Estrutura vertical completa conectando Página → Hook → Store Zustand → Service HTTP → API REST.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={buscar}
            className="min-h-11 gap-2 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Atualizar</span>
          </Button>
          <Button
            type="button"
            onClick={abrirModalCriacao}
            className="min-h-11 gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Item</span>
          </Button>
        </div>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-card p-4 rounded-2xl border border-border">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Buscar por nome ou descrição..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && buscar()}
              className="pl-9 min-h-11"
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={buscar}
            className="min-h-11 cursor-pointer"
          >
            Buscar
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {categorias.map((cat) => (
            <Button
              key={cat.valor}
              type="button"
              size="sm"
              variant={filtroCategoria === cat.valor ? "default" : "ghost"}
              onClick={() => setFiltroCategoria(cat.valor)}
              className="min-h-11 cursor-pointer rounded-xl text-xs"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Estados de Carregamento / Erro / Lista */}
      {erro && (
        <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-sm">
          {erro}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-48 rounded-2xl border border-border bg-card animate-pulse p-6"
            />
          ))}
        </div>
      ) : itens.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-2xl border border-border p-6">
          <p className="text-base font-semibold text-foreground-heading">
            Nenhum item encontrado
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Experimente limpar os filtros ou criar um novo item de exemplo.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {itens.map((item) => (
            <CardExemplo
              key={item.id}
              item={item}
              onDesativar={(id) => void desativarItem(id)}
            />
          ))}
        </div>
      )}

      {/* Modal de Criação */}
      <DialogCriarExemplo
        aberto={isModalCriacaoAberto}
        onFechar={fecharModalCriacao}
        onSalvar={criarItem}
      />
    </div>
  );
}

export default ExemploPage;
