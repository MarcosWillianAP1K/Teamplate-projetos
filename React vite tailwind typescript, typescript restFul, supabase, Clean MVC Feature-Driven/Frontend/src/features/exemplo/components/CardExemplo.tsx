import { Trash2, Tag, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import type { ItemExemplo } from "../types/exemplo.types";

export interface CardExemploProps {
  item: ItemExemplo;
  onDesativar?: (id: string) => void;
}

/**
 * Atomic visual card component for displaying an example item.
 * Adheres to canonical Tailwind CSS v4 classes (`min-h-11`, `min-w-11`, `wrap-break-word`).
 */
export function CardExemplo({ item, onDesativar }: CardExemploProps) {
  const dataFormatada = new Date(item.created_at).toLocaleDateString("pt-BR");

  return (
    <Card className="flex flex-col justify-between border border-border bg-card shadow-xs hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="gap-1.5 text-xs font-medium">
            <Tag className="h-3 w-3" />
            {item.categoria}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {dataFormatada}
          </span>
        </div>
        <CardTitle className="text-lg font-bold text-foreground-heading mt-2 wrap-break-word">
          {item.nome}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground wrap-break-word">
          {item.descricao || "Sem descrição informada."}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 pb-3">
        <div className="text-xs font-mono text-muted-foreground truncate">
          ID: {item.id}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-border flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Ativo
        </span>
        {onDesativar && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onDesativar(item.id)}
            className="min-h-11 min-w-11 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer gap-1.5"
          >
            <Trash2 className="h-4 w-4" />
            <span>Desativar</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
