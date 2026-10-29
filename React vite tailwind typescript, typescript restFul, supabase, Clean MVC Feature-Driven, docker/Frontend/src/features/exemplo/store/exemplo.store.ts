import { create } from "zustand";
import type {
  ItemExemplo,
  CriarExemploDTO,
  FiltroExemploDTO,
} from "../types/exemplo.types";
import { exemploService } from "../services/exemplo.service";

export interface ExemploState {
  itens: ItemExemplo[];
  isLoading: boolean;
  erro: string | null;
  isModalCriacaoAberto: boolean;
  filtroCategoria: string;
  termoBusca: string;

  abrirModalCriacao: () => void;
  fecharModalCriacao: () => void;
  setFiltroCategoria: (categoria: string) => void;
  setTermoBusca: (busca: string) => void;
  carregarItens: (filtros?: FiltroExemploDTO) => Promise<void>;
  criarItem: (dto: CriarExemploDTO) => Promise<ItemExemplo>;
  desativarItem: (id: string) => Promise<void>;
}

/**
 * Global Zustand store for the Exemplo domain.
 */
export const useExemploStore = create<ExemploState>((set, get) => ({
  itens: [],
  isLoading: false,
  erro: null,
  isModalCriacaoAberto: false,
  filtroCategoria: "todas",
  termoBusca: "",

  abrirModalCriacao: () => set({ isModalCriacaoAberto: true }),
  fecharModalCriacao: () => set({ isModalCriacaoAberto: false }),

  setFiltroCategoria: (categoria) => {
    set({ filtroCategoria: categoria });
    void get().carregarItens({
      categoria,
      busca: get().termoBusca,
    });
  },

  setTermoBusca: (busca) => {
    set({ termoBusca: busca });
  },

  carregarItens: async (filtros) => {
    set({ isLoading: true, erro: null });
    try {
      const lista = await exemploService.listar(
        filtros ?? {
          categoria: get().filtroCategoria,
          busca: get().termoBusca,
        },
      );
      set({ itens: lista, isLoading: false });
    } catch (error) {
      const mensagem =
        error instanceof Error ? error.message : "Erro ao carregar itens.";
      set({ erro: mensagem, isLoading: false });
    }
  },

  criarItem: async (dto) => {
    const novo = await exemploService.criar(dto);
    set((state) => ({
      itens: [novo, ...state.itens],
      isModalCriacaoAberto: false,
    }));
    return novo;
  },

  desativarItem: async (id) => {
    await exemploService.desativar(id);
    set((state) => ({
      itens: state.itens.filter((item) => item.id !== id),
    }));
  },
}));
