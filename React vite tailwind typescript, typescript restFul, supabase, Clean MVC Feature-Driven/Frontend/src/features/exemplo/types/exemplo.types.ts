/**
 * ============================================================================
 * TIPAGENS CANÔNICAS DO DOMÍNIO EXEMPLO (Frontend)
 * TypeScript Estrito: Sem uso de `any`
 * ============================================================================
 */

export type CategoriaExemplo =
  | "geral"
  | "arquitetura"
  | "frontend"
  | "backend"
  | "banco";

export interface ItemExemplo {
  id: string;
  nome: string;
  descricao: string;
  categoria: CategoriaExemplo;
  status_ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface CriarExemploDTO {
  nome: string;
  descricao?: string;
  categoria?: CategoriaExemplo;
}

export interface AtualizarExemploDTO {
  nome?: string;
  descricao?: string;
  categoria?: CategoriaExemplo;
}

export interface FiltroExemploDTO {
  busca?: string;
  categoria?: string;
  incluirInativos?: boolean;
  page?: number;
  limit?: number;
}

export interface ExemploRespostaApi {
  data: {
    exemplo: ItemExemplo;
  };
  message?: string;
}

export interface ExemplosListaRespostaApi {
  data: {
    exemplos: ItemExemplo[];
    meta?: {
      total: number;
      pagina: number;
      limite: number;
      total_paginas: number;
    };
  };
  message?: string;
}
