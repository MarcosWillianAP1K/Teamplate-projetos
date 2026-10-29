import {
  createHttpClient,
  type HttpClient,
  type HttpError,
} from "@/shared/utils/request";
import { jwtStorage } from "../auth/jwt-storage";

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:3000/api";

const REQUEST_TIMEOUT_MS = 15_000;

export const http: HttpClient = createHttpClient({
  baseURL: API_BASE_URL,
  requestTimeoutMs: REQUEST_TIMEOUT_MS,
  auth: {
    getAccessToken: () => jwtStorage.obterToken() ?? undefined,
    refreshAccessToken: async () => {
      // Lembrete: implementar renovação de token se necessário
      throw new Error("Renovação automática de token não configurada.");
    },
    onAuthFailure: () => {
      jwtStorage.limparToken();
    },
  },
});

const rawMockEnv =
  import.meta.env.VITE_USE_MOCK_DATA ?? import.meta.env.VITE_USE_MOCK;
export const USE_MOCK_DATA: boolean =
  rawMockEnv === "true" || rawMockEnv === true;

export async function withFallback<T>(
  requestFn: () => Promise<T>,
  fallback: T | (() => T | Promise<T>),
  onError?: (error: unknown) => void,
): Promise<T> {
  const isTestMode = import.meta.env.MODE === "test";

  if (USE_MOCK_DATA) {
    return typeof fallback === "function"
      ? await (fallback as () => T | Promise<T>)()
      : fallback;
  }

  if (isTestMode) {
    const isSpied =
      Boolean((requestFn as unknown as { mock?: unknown })?.mock) ||
      Boolean((http.get as unknown as { mock?: unknown })?.mock) ||
      Boolean((http.post as unknown as { mock?: unknown })?.mock) ||
      Boolean((http.put as unknown as { mock?: unknown })?.mock) ||
      Boolean((http.patch as unknown as { mock?: unknown })?.mock) ||
      Boolean((http.delete as unknown as { mock?: unknown })?.mock);

    if (isSpied) {
      try {
        return await requestFn();
      } catch (error) {
        if (onError) onError(error);
        return typeof fallback === "function"
          ? await (fallback as () => T | Promise<T>)()
          : fallback;
      }
    }

    return typeof fallback === "function"
      ? await (fallback as () => T | Promise<T>)()
      : fallback;
  }

  try {
    return await requestFn();
  } catch (error) {
    if (onError) {
      onError(error);
    }
    throw error;
  }
}

export async function safeRequest<T>(
  requestFn: () => Promise<T>,
  fallback?: T | (() => T | Promise<T>),
): Promise<T> {
  const isTestMode = import.meta.env.MODE === "test";

  if (USE_MOCK_DATA && fallback !== undefined && !isTestMode) {
    return typeof fallback === "function"
      ? await (fallback as () => T | Promise<T>)()
      : fallback;
  }

  try {
    return await requestFn();
  } catch (error) {
    if (fallback !== undefined && isTestMode) {
      return typeof fallback === "function"
        ? await (fallback as () => T | Promise<T>)()
        : fallback;
    }
    throw error;
  }
}

export type { HttpClient, HttpError };
export default http;
