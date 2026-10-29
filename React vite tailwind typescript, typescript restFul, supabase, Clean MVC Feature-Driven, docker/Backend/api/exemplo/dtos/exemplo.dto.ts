/**
 * ==============================================================================
 * DTOs (Data Transfer Objects) — Feature: Exemplo
 * Tipagem estrita (sem uso de `any`)
 * ==============================================================================
 */

export type CategoriaExemplo = 'geral' | 'arquitetura' | 'frontend' | 'backend' | 'banco';

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
