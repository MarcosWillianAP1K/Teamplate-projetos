import type {
  ItemExemplo,
  CriarExemploDTO,
  FiltroExemploDTO,
} from "./exemplo.types";

const EXEMPLOS_MOCK_INICIAIS: ItemExemplo[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    nome: "Item de Exemplo Arquitetura MVC",
    descricao:
      "Registro demonstrativo do fluxo Controller -> Service -> Model -> Supabase.",
    categoria: "arquitetura",
    status_ativo: true,
    created_at: "2026-10-29T12:00:00.000Z",
    updated_at: "2026-10-29T12:00:00.000Z",
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    nome: "Integração Frontend React 19 + Tailwind v4",
    descricao:
      "Consumo via HttpClient com Envelope Pattern e fallback resiliente para mocks.",
    categoria: "frontend",
    status_ativo: true,
    created_at: "2026-10-29T12:05:00.000Z",
    updated_at: "2026-10-29T12:05:00.000Z",
  },
];

let memoriaMock: ItemExemplo[] = structuredClone(EXEMPLOS_MOCK_INICIAIS);

export function resetarExemplosMock(): void {
  memoriaMock = structuredClone(EXEMPLOS_MOCK_INICIAIS);
}

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
        item.descricao.toLowerCase().includes(termo),
    );
  }

  return lista;
}

export function buscarExemploMockPorId(id: string): ItemExemplo | null {
  return memoriaMock.find((item) => item.id === id) ?? null;
}

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
