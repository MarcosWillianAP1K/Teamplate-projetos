# Frontend — SPA (React 19 + Vite + Tailwind CSS v4)

Camada de interface construída segundo o padrão **Feature-Driven Clean Architecture**, mantida enxuta e focada na estrutura do projeto.

## Estrutura de Pastas

```text
Frontend/src/
├── main.tsx                        # Ponto de entrada React 19
├── App.tsx                         # RouterProvider central
├── routes/                         # Roteamento central com MainLayout
├── layout/                         # MainLayout (casca estrutural simples)
├── core/                           # Cliente HTTP base e dicionário de endpoints
├── features/
│   └── exemplo/                    # Exemplo de estrutura de funcionalidade
│       ├── pages/                  # Página da feature (ExemploPage.tsx)
│       ├── components/             # Componente visual da feature (CardExemplo.tsx)
│       ├── services/               # Chamadas HTTP (exemplo.service.ts)
│       └── types/                  # Tipagens TypeScript da feature
├── shared/
│   ├── components/ui/              # Componentes visuais compartilhados (ex: Button.tsx)
│   ├── lib/                        # Utilitários (cn com clsx + tailwind-merge)
│   ├── types/                      # Tipagens globais da API
│   └── utils/                      # Motor HTTP fetch (request.ts)
└── styles/
    └── index.css                   # Tailwind v4 com variáveis primary e secondary
```
