/**
 * ============================================================================
 * CLIENTE HTTP PADRÃO (Fetch Wrapper)
 * ============================================================================
 * Utilitário leve e direto sobre o fetch nativo do navegador.
 *
 * RECURSOS:
 * - Define Content-Type JSON automaticamente
 * - Anexa Authorization: Bearer <token> se configurado
 * - Serializa query parameters e payload JSON
 * - Lança HttpError estruturado em falhas HTTP (4xx, 5xx)
 * ============================================================================
 */

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export class HttpError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.data = data;
  }
}

export interface HttpClientConfig {
  baseURL: string;
  getAccessToken?: () => string | null | undefined;
}

export function createHttpClient(config: HttpClientConfig) {
  const { baseURL, getAccessToken } = config;

  async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = new URL(
      endpoint.startsWith("http") ? endpoint : `${baseURL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`
    );

    if (options.params) {
      Object.entries(options.params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          url.searchParams.append(key, String(val));
        }
      });
    }

    const headers = new Headers(options.headers || {});
    if (!headers.has("Content-Type") && options.body && typeof options.body === "string") {
      headers.set("Content-Type", "application/json");
    }

    const token = getAccessToken ? getAccessToken() : undefined;
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(url.toString(), {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorBody: unknown;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }
      throw new HttpError(
        response.status,
        `Erro HTTP ${response.status}: ${response.statusText}`,
        errorBody
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }

  return {
    get: <T>(endpoint: string, options?: RequestOptions) =>
      request<T>(endpoint, { ...options, method: "GET" }),

    post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
      request<T>(endpoint, {
        ...options,
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      }),

    put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
      request<T>(endpoint, {
        ...options,
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      }),

    patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
      request<T>(endpoint, {
        ...options,
        method: "PATCH",
        body: data ? JSON.stringify(data) : undefined,
      }),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
      request<T>(endpoint, { ...options, method: "DELETE" }),
  };
}

export type HttpClient = ReturnType<typeof createHttpClient>;
