import { useEffect, useCallback } from "react";
import { useExemploStore } from "../store/exemplo.store";

/**
 * Custom hook that encapsulates reactive access to the Exemplo domain store.
 *
 * @returns State and action handlers for listing, filtering, creating, and deactivating example items.
 */
export function useExemplo() {
  const itens = useExemploStore((s) => s.itens);
  const isLoading = useExemploStore((s) => s.isLoading);
  const erro = useExemploStore((s) => s.erro);
  const isModalCriacaoAberto = useExemploStore((s) => s.isModalCriacaoAberto);
  const filtroCategoria = useExemploStore((s) => s.filtroCategoria);
  const termoBusca = useExemploStore((s) => s.termoBusca);

  const abrirModalCriacao = useExemploStore((s) => s.abrirModalCriacao);
  const fecharModalCriacao = useExemploStore((s) => s.fecharModalCriacao);
  const setFiltroCategoria = useExemploStore((s) => s.setFiltroCategoria);
  const setTermoBusca = useExemploStore((s) => s.setTermoBusca);
  const carregarItens = useExemploStore((s) => s.carregarItens);
  const criarItem = useExemploStore((s) => s.criarItem);
  const desativarItem = useExemploStore((s) => s.desativarItem);

  useEffect(() => {
    void carregarItens();
  }, [carregarItens]);

  const buscar = useCallback(() => {
    void carregarItens({
      categoria: filtroCategoria,
      busca: termoBusca,
    });
  }, [carregarItens, filtroCategoria, termoBusca]);

  return {
    itens,
    isLoading,
    erro,
    isModalCriacaoAberto,
    filtroCategoria,
    termoBusca,
    abrirModalCriacao,
    fecharModalCriacao,
    setFiltroCategoria,
    setTermoBusca,
    buscar,
    criarItem,
    desativarItem,
  };
}
