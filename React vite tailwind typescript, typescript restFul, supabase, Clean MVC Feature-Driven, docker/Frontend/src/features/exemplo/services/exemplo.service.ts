import { http, ENDPOINTS } from "@/core/api";
import type {
  ItemExemplo,
  CriarExemploDTO,
  ExemplosListaRespostaApi,
  ExemploRespostaApi,
} from "../types/exemplo.types";

export const exemploService = {
  /**
   * Lista itens da API REST ou retorna exemplo se a API estiver desconectada.
   */
  async listar(): Promise<ItemExemplo[]> {
    try {
      const res = await http.get<ExemplosListaRespostaApi>(ENDPOINTS.EXEMPLO);
      return res.data?.exemplos || [];
    } catch {
      return [
        {
          id: "1",
          nome: "Item de Exemplo 1",
          descricao: "Estrutura básica de exemplo conectando UI e Service.",
          categoria: "geral",
          status_ativo: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
    }
  },

  /**
   * Cria um item de exemplo.
   */
  async criar(dto: CriarExemploDTO): Promise<ItemExemplo | null> {
    try {
      const res = await http.post<ExemploRespostaApi>(ENDPOINTS.EXEMPLO, dto);
      return res.data?.exemplo ?? null;
    } catch {
      return null;
    }
  },
};

export default exemploService;
