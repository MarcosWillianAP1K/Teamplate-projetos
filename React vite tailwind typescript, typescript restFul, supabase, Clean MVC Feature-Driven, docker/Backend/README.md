# Backend — API RESTful & Gateway WebSocket

Camada de servidor construída com **Node.js**, **Express**, **Socket.IO**, **Supabase** e **TypeScript Estrito**.

## Estrutura de Pastas

```text
Backend/
├── src/
│   └── server.ts                  # Ponto de entrada HTTP + WebSocket + Swagger (/api/docs)
├── api/
│   ├── index.ts                   # Roteador central (/api/*)
│   └── exemplo/                   # Feature de Referência (Clean MVC + Service)
│       ├── controllers/           # Thin Controllers (Envelope Pattern)
│       ├── services/              # Fat Services (Regras de negócio e eventos)
│       ├── models/                # Persistência e acesso a dados
│       ├── routes/                # Rotas Express + anotações @swagger
│       ├── dtos/                  # Contratos de entrada/saída
│       ├── validators/            # Validação de schema sem uso de any
│       └── test/                  # Testes unitários e de integração (Vitest)
└── core/
    ├── events/                    # EventBus tipado (Event-Driven Architecture)
    ├── middlewares/               # Auth JWT, Helmet Security Headers, Rate Limit, Paginação
    ├── security/                  # Criptografia AES-256-GCM e anonimização LGPD
    ├── supabase/                  # Cliente singleton do Supabase
    ├── utils/                     # Formatadores e validadores (CPF, CEP, Telefone, UUID)
    └── websocket/                 # Gateway Socket.IO e proteção contra flooding
```

## Comandos

- `npm run dev` — Inicia em modo desenvolvimento com hot-reload (`tsx watch`).
- `npm test` — Executa a suíte de testes automatizados com Vitest.
- `npm run typecheck` — Valida tipagem TypeScript (`tsc --noEmit`).
- `npm run build` — Compila para produção em `dist/`.
