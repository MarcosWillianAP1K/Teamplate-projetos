/**
 * ============================================================================
 * INSTÂNCIA DO CLIENTE HTTP (Frontend Core)
 * ============================================================================
 * Exporta o cliente HTTP pré-configurado com a baseURL da API.
 * ============================================================================
 */

import { createHttpClient, type HttpClient } from "@/shared/utils/request";

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:3000/api";

export const http: HttpClient = createHttpClient({
  baseURL: API_BASE_URL,
});
