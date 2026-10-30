/**
 * ============================================================================
 * INSTÂNCIA DO CLIENTE HTTP (Frontend Core)
 * ============================================================================
 * Cria e exporta o cliente HTTP pré-configurado com a baseURL da API
 * e com o token JWT vindo do `jwtStorage`.
 *
 * Também exporta a função auxiliar `withFallback` para alternar entre
 * chamadas reais da API e os dados do `bdmock` caso o backend esteja offline.
 * ============================================================================
 */

import { createHttpClient, type HttpClient } from "@/shared/utils/request";
import { jwtStorage } from "../auth/jwt-storage";

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:3000/api";

export const http: HttpClient = createHttpClient({
  baseURL: API_BASE_URL,
  getAccessToken: () => jwtStorage.obterToken(),
});

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK === "true";

/**
 * Executa uma requisição HTTP e, caso falhe ou o modo mock/test esteja ativo,
 * executa a função de fallback (ex: bdmock).
 */
export async function withFallback<T>(
  requestFn: () => Promise<T>,
  fallback: T | (() => T | Promise<T>)
): Promise<T> {
  const isTest = import.meta.env.MODE === "test";

  if (USE_MOCK_DATA || isTest) {
    return typeof fallback === "function"
      ? await (fallback as () => T | Promise<T>)()
      : fallback;
  }

  try {
    return await requestFn();
  } catch (error) {
    console.warn("[withFallback] Falha na API REST, utilizando dados mockados:", error);
    return typeof fallback === "function"
      ? await (fallback as () => T | Promise<T>)()
      : fallback;
  }
}
