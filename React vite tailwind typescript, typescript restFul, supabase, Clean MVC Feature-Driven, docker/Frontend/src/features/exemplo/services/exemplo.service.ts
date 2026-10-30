/**
 * ============================================================================
 * SERVICE DA FEATURE EXEMPLO (Frontend)
 * ============================================================================
 * Realiza as chamadas HTTP para o Backend RESTful via cliente `http` (@/core/api).
 * Utiliza `withFallback` para garantir que o frontend funcione mesmo se o
 * Backend ou Banco de Dados ainda não estiverem rodando (usando `bdmock`).
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

export const exemploService = {
  /**
   * Lista itens de exemplo da API REST ou do bdmock em caso de fallback
   */
  async listar(filtros?: FiltroExemploDTO): Promise<ItemExemplo[]> {
    return withFallback(
      async () => {
        const params: Record<string, string | number | boolean | undefined> = {};
        if (filtros?.busca) params.busca = filtros.busca;
        if (filtros?.categoria && filtros.categoria !== "todas") {
          params.categoria = filtros.categoria;
        }
        if (filtros?.incluirInativos) params.incluirInativos = true;
        if (filtros?.page) params.page = filtros.page;
        if (filtros?.limit) params.limit = filtros.limit;

        const res = await http.get<ExemplosListaRespostaApi>(ENDPOINTS.EXEMPLO, {
          params,
        });
        return res.data.exemplos;
      },
      () => listarExemplosMock(filtros)
    );
  },

  /**
   * Busca um item de exemplo específico pelo ID
   */
  async buscarPorId(id: string): Promise<ItemExemplo | null> {
    return withFallback(
      async () => {
        const res = await http.get<ExemploRespostaApi>(`${ENDPOINTS.EXEMPLO}/${id}`);
        return res.data.exemplo;
      },
      () => buscarExemploMockPorId(id)
    );
  },

  /**
   * Cria um novo item de exemplo via POST /api/exemplo ou adiciona ao bdmock
   */
  async criar(dto: CriarExemploDTO): Promise<ItemExemplo> {
    return withFallback(
      async () => {
        const res = await http.post<ExemploRespostaApi>(ENDPOINTS.EXEMPLO, dto);
        return res.data.exemplo;
      },
      () => criarExemploMock(dto)
    );
  },

  /**
   * Atualiza dados de um item de exemplo existente
   */
  async atualizar(
    id: string,
    dto: AtualizarExemploDTO
  ): Promise<ItemExemplo | null> {
    try {
      const res = await http.put<ExemploRespostaApi>(
        `${ENDPOINTS.EXEMPLO}/${id}`,
        dto
      );
      return res.data.exemplo;
    } catch {
      return null;
    }
  },

  /**
   * Desativa logicamente um item de exemplo (Soft Delete)
   */
  async desativar(id: string): Promise<ItemExemplo | null> {
    return withFallback(
      async () => {
        const res = await http.delete<ExemploRespostaApi>(
          `${ENDPOINTS.EXEMPLO}/${id}`
        );
        return res?.data?.exemplo ?? null;
      },
      () => desativarExemploMock(id)
    );
  },
};

export default exemploService;
