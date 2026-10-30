/**
 * ============================================================================
 * CLIENTE WEBSOCKET / TEMPO REAL (Frontend Core)
 * ============================================================================
 * Exemplo simples de conexão WebSocket para funcionalidades em tempo real
 * (ex: chat, notificações ao vivo, atualizações automáticas de estado).
 *
 * COMO USAR:
 * const socket = createWebSocketConnection();
 * socket?.addEventListener('message', (event) => console.log(event.data));
 * ============================================================================
 */

export function createWebSocketConnection(url?: string): WebSocket | null {
  if (typeof window === "undefined" || !("WebSocket" in window)) {
    return null;
  }

  const wsUrl =
    url ||
    (import.meta.env.VITE_WS_URL as string | undefined) ||
    "ws://localhost:3000";

  try {
    return new WebSocket(wsUrl);
  } catch (error) {
    console.error("[WebSocket] Erro ao conectar:", error);
    return null;
  }
}
