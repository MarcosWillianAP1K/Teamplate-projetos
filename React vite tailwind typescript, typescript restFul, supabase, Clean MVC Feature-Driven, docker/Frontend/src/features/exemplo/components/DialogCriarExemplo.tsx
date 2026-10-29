import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import type { CategoriaExemplo, CriarExemploDTO } from "../types/exemplo.types";

export interface DialogCriarExemploProps {
  aberto: boolean;
  onFechar: () => void;
  onSalvar: (dto: CriarExemploDTO) => Promise<unknown>;
}

/**
 * Modal dialog component for creating a new example item.
 */
export function DialogCriarExemplo({
  aberto,
  onFechar,
  onSalvar,
}: DialogCriarExemploProps) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<CategoriaExemplo>("arquitetura");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (nome.trim().length < 2) {
      setErro("Informe um nome com pelo menos 2 caracteres.");
      return;
    }

    setSalvando(true);
    setErro(null);
    try {
      await onSalvar({
        nome: nome.trim(),
        descricao: descricao.trim(),
        categoria,
      });
      setNome("");
      setDescricao("");
      setCategoria("arquitetura");
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao criar item.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Dialog open={aberto} onOpenChange={(open) => !open && onFechar()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Item de Exemplo</DialogTitle>
          <DialogDescription>
            Demonstração de criação via Service REST com Envelope Pattern.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exemplo-nome">Nome do Item *</Label>
            <Input
              id="exemplo-nome"
              placeholder="Ex: Módulo de Relatórios"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="min-h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exemplo-categoria">Categoria</Label>
            <select
              id="exemplo-categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as CategoriaExemplo)}
              className="flex min-h-11 w-full rounded-md border border-border bg-input-bg px-3 py-2 text-sm text-foreground"
            >
              <option value="geral">Geral</option>
              <option value="arquitetura">Arquitetura</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="banco">Banco de Dados</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="exemplo-descricao">Descrição</Label>
            <Input
              id="exemplo-descricao"
              placeholder="Descreva a finalidade deste item..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="min-h-11"
            />
          </div>

          {erro && (
            <p className="text-xs font-medium text-destructive">{erro}</p>
          )}

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onFechar}
              className="min-h-11 cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={salvando}
              className="min-h-11 cursor-pointer"
            >
              {salvando ? "Salvando..." : "Criar Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
