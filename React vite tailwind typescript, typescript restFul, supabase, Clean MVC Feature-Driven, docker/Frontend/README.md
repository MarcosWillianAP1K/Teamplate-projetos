# Frontend — SPA (React 19 + Vite + Tailwind CSS v4 + Zustand)

Camada de interface construída segundo o padrão **Feature-Driven Clean Architecture**.

## Estrutura de Pastas

```text
Frontend/src/
├── main.tsx                        # Ponto de entrada React 19
├── App.tsx                         # ThemeProvider + BrowserRouter + Routes
├── routes/                         # Roteamento central (SidebarLayout & FocusLayout)
├── layout/                         # Cascas de layout e barra lateral
├── core/                           # Cliente HTTP resiliente (request.ts), ENDPOINTS e WebSocket
├── features/
│   └── exemplo/                    # Feature de Referência Vertical
│       ├── pages/                  # Páginas Mestre (ExemploPage.tsx)
│       ├── components/             # Componentes Atômicos e Modais (CardExemplo, DialogCriarExemplo)
│       ├── hooks/                  # Custom Hooks (useExemplo.ts)
│       ├── store/                  # Estado global Zustand (exemplo.store.ts)
│       ├── services/               # Chamadas HTTP com withFallback (exemplo.service.ts)
│       ├── types/                  # Interfaces TypeScript e bdmock.ts
│       └── __test__/               # Testes automatizados Vitest
└── shared/
    ├── components/ui/              # 17 primitivos Radix UI / shadcn
    ├── hooks/                      # Hooks utilitários (use-mobile.ts)
    ├── lib/                        # Utilitários (cn)
    ├── providers/                  # ThemeProvider (light/dark/system)
    └── utils/                      # Motor HTTP (request.ts)
```
