/**
 * ============================================================================
 * BANCO MOCK EM MEMÓRIA — FEATURE EXEMPLO (Frontend)
 * ============================================================================
 * Simula operações de banco de dados em memória para que o Frontend funcione
 * imediatamente mesmo quando o Backend ainda não estiver em execução.
 * ============================================================================
 */

import type {
  ItemExemplo,
  CriarExemploDTO,
  FiltroExemploDTO,
} from "./exemplo.types";

const EXEMPLOS_MOCK_INICIAIS: ItemExemplo[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    nome: "Item de Exemplo Arquitetura MVC",
    descricao: "Registro demonstrativo do fluxo Controller -> Service -> Model.",
    categoria: "arquitetura",
    status_ativo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    nome: "Integração Frontend React 19 + Tailwind v4",
    descricao: "Consumo via HttpClient com Envelope Pattern e fallback para mocks.",
    categoria: "frontend",
    status_ativo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

let memoriaMock: ItemExemplo[] = structuredClone(EXEMPLOS_MOCK_INICIAIS);

/**
 * Reseta o estado em memória para os dados iniciais de fixture (útil para testes unitários).
 */
export function resetarExemplosMock(): void {
  memoriaMock = structuredClone(EXEMPLOS_MOCK_INICIAIS);
}

/**
 * Lista itens do mock aplicando filtros opcionais de categoria, busca e inativos.
 */
export function listarExemplosMock(filtros?: FiltroExemploDTO): ItemExemplo[] {
  let lista = [...memoriaMock];

  if (!filtros?.incluirInativos) {
    lista = lista.filter((item) => item.status_ativo);
  }

  if (
    filtros?.categoria &&
    filtros.categoria !== "todas" &&
    filtros.categoria !== "all"
  ) {
    lista = lista.filter((item) => item.categoria === filtros.categoria);
  }

  if (filtros?.busca && filtros.busca.trim() !== "") {
    const termo = filtros.busca.trim().toLowerCase();
    lista = lista.filter(
      (item) =>
        item.nome.toLowerCase().includes(termo) ||
        item.descricao.toLowerCase().includes(termo)
    );
  }

  return lista;
}

/**
 * Busca um item mock pelo seu ID.
 */
export function buscarExemploMockPorId(id: string): ItemExemplo | null {
  return memoriaMock.find((item) => item.id === id) ?? null;
}

/**
 * Cria um novo item na memória mock.
 */
export function criarExemploMock(dto: CriarExemploDTO): ItemExemplo {
  const agora = new Date().toISOString();
  const novo: ItemExemplo = {
    id: `mock-${Date.now()}`,
    nome: dto.nome,
    descricao: dto.descricao ?? "",
    categoria: dto.categoria ?? "geral",
    status_ativo: true,
    created_at: agora,
    updated_at: agora,
  };
  memoriaMock.push(novo);
  return novo;
}

/**
 * Desativa logicamente um item na memória mock (Soft Delete).
 */
export function desativarExemploMock(id: string): ItemExemplo | null {
  const idx = memoriaMock.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  memoriaMock[idx] = {
    ...memoriaMock[idx],
    status_ativo: false,
    updated_at: new Date().toISOString(),
  };
  return memoriaMock[idx];
}
