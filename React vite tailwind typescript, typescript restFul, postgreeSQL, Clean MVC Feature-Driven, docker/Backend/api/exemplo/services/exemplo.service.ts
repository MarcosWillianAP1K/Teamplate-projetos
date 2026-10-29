import { ExemploModel, type ItemExemplo } from '../models/exemplo.model.js';
import type {
  CriarExemploDTO,
  AtualizarExemploDTO,
  FiltroExemploDTO,
} from '../dtos/exemplo.dto.js';
import { eventBus } from '../../../core/events/event-bus.js';

/**
 * ==============================================================================
 * Service: Regras de Negócio e Orquestração de Domínio da Feature Exemplo
 * Camada Fat Service: executa validações de negócio, paginação e eventos.
 * ==============================================================================
 */
export class ExemploService {
  /**
   * Lists example items with metadata for envelope responses.
   *
   * @param filtros - Optional filter and pagination criteria.
   * @returns Object containing categorized items array and pagination metadata.
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
   * Retrieves a single example item by ID.
   *
   * @param id - Unique identifier of the example item.
   * @returns Matching item or undefined if not found.
   */
  static async buscarPorId(id: string): Promise<ItemExemplo | undefined> {
    return ExemploModel.buscarPorId(id);
  }

  /**
   * Creates a new example item and emits the `exemplo:criado` domain event.
   *
   * @param dto - Validated creation DTO.
   * @param usuarioId - Optional authenticated user ID.
   * @returns Newly created example item.
   */
  static async criar(dto: CriarExemploDTO, usuarioId?: string): Promise<ItemExemplo> {
    const novo = await ExemploModel.criar(dto);
    eventBus.emitir('exemplo:criado', { exemplo: novo, usuarioId });
    return novo;
  }

  /**
   * Updates an existing example item and emits `exemplo:atualizado`.
   *
   * @param id - Unique identifier of the item.
   * @param dto - Partial update DTO.
   * @param usuarioId - Optional authenticated user ID.
   * @returns Updated item or undefined if not found.
   */
  static async atualizar(
    id: string,
    dto: AtualizarExemploDTO,
    usuarioId?: string
  ): Promise<ItemExemplo | undefined> {
    const atualizado = await ExemploModel.atualizar(id, dto);
    if (atualizado) {
      eventBus.emitir('exemplo:atualizado', { exemplo: atualizado, usuarioId });
    }
    return atualizado;
  }

  /**
   * Deactivates an example item via Soft Delete (`status_ativo = false`).
   *
   * @param id - Unique identifier of the item.
   * @param usuarioId - Optional authenticated user ID.
   * @returns Deactivated item or undefined if not found.
   */
  static async desativar(id: string, usuarioId?: string): Promise<ItemExemplo | undefined> {
    const desativado = await ExemploModel.desativar(id);
    if (desativado) {
      eventBus.emitir('exemplo:desativado', { exemploId: id, usuarioId });
    }
    return desativado;
  }

  /**
   * Reactivates a logically deactivated item (`status_ativo = true`).
   *
   * @param id - Unique identifier of the item.
   * @returns Reactivated item or undefined if not found.
   */
  static async reativar(id: string): Promise<ItemExemplo | undefined> {
    return ExemploModel.reativar(id);
  }

  /**
   * Permanently deletes an example item (Hard Delete).
   *
   * @param id - Unique identifier of the item.
   * @returns True if deleted, false if not found.
   */
  static async deletarHard(id: string): Promise<boolean> {
    return ExemploModel.deletarHard(id);
  }
}
