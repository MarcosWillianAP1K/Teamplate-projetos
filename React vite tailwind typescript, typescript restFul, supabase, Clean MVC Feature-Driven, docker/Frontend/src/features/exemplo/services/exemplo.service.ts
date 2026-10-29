/**
 * ============================================================================
 * REST SERVICE FOR EXEMPLO DOMAIN
 * Segue o padrão HttpClient + withFallback + ENDPOINTS + Envelope Pattern
 * ============================================================================
 */

import { http, withFallback, ENDPOINTS } from "@/core/api";
import type {
  ItemExemplo,
  CriarExemploDTO,
  AtualizarExemploDTO,
  FiltroExemploDTO,
  ExemploRespostaApi,
  ExemplosListaRespostaApi,
} from "../types/exemplo.types";
import {
  listarExemplosMock,
  buscarExemploMockPorId,
  criarExemploMock,
  desativarExemploMock,
} from "../types/bdmock";

/**
 * Serializes filter criteria into HTTP query parameters.
 *
 * @param filtros - Optional search, category, and pagination filters.
 * @returns Query parameter dictionary or undefined.
 */
function serializarFiltros(
  filtros?: FiltroExemploDTO,
): Record<string, string> | undefined {
  if (!filtros) return undefined;
  const params: Record<string, string> = {};

  if (filtros.busca && filtros.busca.trim()) {
    params.busca = filtros.busca.trim();
  }
  if (
    filtros.categoria &&
    filtros.categoria !== "todas" &&
    filtros.categoria !== "all"
  ) {
    params.categoria = filtros.categoria;
  }
  if (filtros.incluirInativos) {
    params.incluirInativos = "true";
  }
  if (filtros.page !== undefined) params.page = String(filtros.page);
  if (filtros.limit !== undefined) params.limit = String(filtros.limit);

  return Object.keys(params).length > 0 ? params : undefined;
}

export const exemploService = {
  /**
   * Lists example items from the Backend API or mock fallback.
   *
   * @param filtros - Optional search and category filters.
   * @returns Array of example items.
   */
  listar: async (filtros?: FiltroExemploDTO): Promise<ItemExemplo[]> => {
    return await withFallback(
      async () => {
        const params = serializarFiltros(filtros);
        const resposta = await http.get<ExemplosListaRespostaApi>(
          ENDPOINTS.EXEMPLO.BASE,
          { params },
        );
        return resposta.data?.exemplos ?? [];
      },
      () => listarExemplosMock(filtros),
    );
  },

  /**
   * Retrieves a single example item by ID.
   *
   * @param id - Item UUID.
   * @returns Matching example item or null if not found.
   */
  buscarPorId: async (id: string): Promise<ItemExemplo | null> => {
    if (!id || !id.trim()) return null;

    return await withFallback(
      async () => {
        const resposta = await http.get<ExemploRespostaApi>(
          ENDPOINTS.EXEMPLO.BY_ID(id),
        );
        return resposta.data?.exemplo ?? null;
      },
      () => buscarExemploMockPorId(id),
    );
  },

  /**
   * Creates a new example item via POST /api/exemplo.
   *
   * @param dto - Creation payload (`nome`, `descricao`, `categoria`).
   * @returns Newly created example item.
   */
  criar: async (dto: CriarExemploDTO): Promise<ItemExemplo> => {
    return await withFallback(
      async () => {
        const resposta = await http.post<ExemploRespostaApi, CriarExemploDTO>(
          ENDPOINTS.EXEMPLO.BASE,
          dto,
        );
        return resposta.data.exemplo;
      },
      () => criarExemploMock(dto),
    );
  },

  /**
   * Updates an existing example item via PUT /api/exemplo/:id.
   *
   * @param id - Item UUID.
   * @param dto - Partial update payload.
   * @returns Updated example item.
   */
  atualizar: async (
    id: string,
    dto: AtualizarExemploDTO,
  ): Promise<ItemExemplo> => {
    const resposta = await http.put<ExemploRespostaApi, AtualizarExemploDTO>(
      ENDPOINTS.EXEMPLO.BY_ID(id),
      dto,
    );
    return resposta.data.exemplo;
  },

  /**
   * Deactivates an example item via DELETE /api/exemplo/:id (Soft Delete).
   *
   * @param id - Item UUID.
   * @returns Deactivated example item or null.
   */
  desativar: async (id: string): Promise<ItemExemplo | null> => {
    return await withFallback(
      async () => {
        const resposta = await http.delete<ExemploRespostaApi>(
          ENDPOINTS.EXEMPLO.BY_ID(id),
        );
        return resposta.data?.exemplo ?? null;
      },
      () => desativarExemploMock(id),
    );
  },
};

export default exemploService;
