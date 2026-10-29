# Diretrizes do Catálogo de Templates de Projetos

Este repositório funciona como uma galeria de **Starter Templates** independentes.

---

## 1. Regra de Nomenclatura das Pastas de Templates

Cada pasta de template de código na raiz deve seguir obrigatoriamente a convenção:  
`[Frontend], [Backend], [Banco de Dados], [Arquitetura], [Extras Opcionais]`

Exemplos:
* `React vite tailwind typescript, typescript restFul, postgreeSQL, Clean MVC Feature-Driven, docker`
* `React vite tailwind typescript, typescript restFul, supabase, Clean MVC Feature-Driven`
* `Template Board de Tasks, Gestao de Sprints, Documentacao Docs, AGENTS.md` (template de governança e documentação)

---

## 2. Isolamento Total por Template

- Cada template de código é um projeto monorepo **autônomo e auto-suficiente**: contém seu próprio `Database/`, `Backend/`, `Frontend/`, `docker-compose.yml`, `package.json`, `.env.example`, `.vscode/settings.json`, `AGENTS.md` e `README.md`.
- A documentação e governança do projeto foram isoladas no template próprio `Template Board de Tasks, Gestao de Sprints, Documentacao Docs, AGENTS.md`, mantendo os templates de código enxutos e focados exclusivamente na aplicação executável.
- Nunca misture lógicas ou dependências de tecnologias diferentes dentro do mesmo template (ex: código do Supabase não deve existir no template com PostgreSQL Docker, e vice-versa).
- Não commitar pastas `node_modules` nem arquivos `.env` com segredos reais de produção.
