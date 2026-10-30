# Backend — API RESTful (Supabase)

API RESTful construída com **Node.js**, **Express**, **TypeScript Estrito** e **Supabase**, estruturada no padrão **Clean MVC Feature-Driven**.

## Estrutura de Pastas

```text
Backend/
├── src/
│   └── server.ts                  # Ponto de entrada Express + Swagger (/api/docs)
├── api/
│   ├── index.ts                   # Roteador central (/api/*)
│   └── exemplo/                   # Exemplo de Feature (Clean MVC)
│       ├── controllers/           # Controllers (Envelope Pattern)
│       ├── services/              # Regras de negócio da feature
│       ├── models/                # Persistência e acesso a dados
│       ├── routes/                # Rotas Express + documentação @swagger
│       ├── dtos/                  # Contratos de dados
│       ├── validators/            # Validações dos dados
│       └── test/                  # Testes unitários com Vitest
└── core/
    └── supabase/                  # Cliente do Supabase (supabase.client.ts)
```

## Comandos

- `npm run dev` — Inicia em modo desenvolvimento com hot-reload (`tsx watch`).
- `npm test` — Executa testes automatizados com Vitest.
- `npm run typecheck` — Valida tipagem TypeScript (`tsc --noEmit`).
- `npm run build` — Compila TypeScript para `dist/`.
