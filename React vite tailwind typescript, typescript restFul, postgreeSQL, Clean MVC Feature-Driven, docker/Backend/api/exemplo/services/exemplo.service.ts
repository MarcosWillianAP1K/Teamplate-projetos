import { ExemploModel, type ItemExemplo } from '../models/exemplo.model.js';
import type {
  CriarExemploDTO,
  AtualizarExemploDTO,
  FiltroExemploDTO,
} from '../dtos/exemplo.dto.js';

/**
 * ==============================================================================
 * Service: Regras de Negócio da Feature Exemplo
 * ==============================================================================
 * Camada intermediária que conecta o Controller ao Model.
 * Executa regras de negócio, validações complementares e paginação.
 * ==============================================================================
 */
export class ExemploService {
  /**
   * Lista itens de exemplo aplicando paginação e filtros opcionais.
   */
  static async listar(filtros?: FiltroExemploDTO): Promise<{
    exemplos: ItemExemplo[];
    meta: {
      total: number;
      pagina: number;
      limite: number;
      total_paginas: number;
    };
  }> {
    const todos = await ExemploModel.listar(filtros);
    const pagina = Math.max(1, filtros?.page ?? 1);
    const limite = Math.min(100, Math.max(1, filtros?.limit ?? 20));
    const inicio = (pagina - 1) * limite;
    const exemplos = todos.slice(inicio, inicio + limite);

    return {
      exemplos,
      meta: {
        total: todos.length,
        pagina,
        limite,
        total_paginas: Math.max(1, Math.ceil(todos.length / limite)),
      },
    };
  }

  /**
   * Busca um item de exemplo pelo ID único.
   */
  static async buscarPorId(id: string): Promise<ItemExemplo | undefined> {
    return ExemploModel.buscarPorId(id);
  }

  /**
   * Cria um novo item de exemplo.
   */
  static async criar(dto: CriarExemploDTO): Promise<ItemExemplo> {
    return ExemploModel.criar(dto);
  }

  /**
   * Atualiza dados de um item existente.
   */
  static async atualizar(
    id: string,
    dto: AtualizarExemploDTO
  ): Promise<ItemExemplo | undefined> {
    return ExemploModel.atualizar(id, dto);
  }

  /**
   * Desativa logicamente um item (Soft Delete).
   */
  static async desativar(id: string): Promise<ItemExemplo | undefined> {
    return ExemploModel.desativar(id);
  }

  /**
   * Reativa um item desativado logicamente.
   */
  static async reativar(id: string): Promise<ItemExemplo | undefined> {
    return ExemploModel.reativar(id);
  }

  /**
   * Remove permanentemente do armazenamento (Hard Delete).
   */
  static async deletarHard(id: string): Promise<boolean> {
    return ExemploModel.deletarHard(id);
  }
}
