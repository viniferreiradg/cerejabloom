# Cereja Bloom — Next.js + Payload

Migração do site estático da banda (pasta `site-cerejabloom`) para a mesma
stack do portfólio (`portfolio-vini-ferreira`): Next.js 16 + Payload 3,
banco Postgres em produção (com fallback SQLite local), deploy na Hostinger
como app Node.

## Rodando localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Sem `DATABASE_URI` de Postgres no `.env.local`, o Payload usa um arquivo
SQLite local (`cerejabloom.db`), então não precisa instalar banco para
desenvolver. O primeiro acesso a `/admin` pede para criar o usuário.

Depois de criar o usuário admin, popule o conteúdo atual do site (textos,
integrantes, músicas, vídeos, fotos, imprensa) a partir das imagens em
`seed-assets/`:

```bash
npm run seed
```

Pode rodar `npm run seed` de novo sem duplicar conteúdo.

## Estrutura

- `payload.config.ts` — configuração do Payload (collections, globals, banco).
- `src/collections/` — Integrantes, Músicas, Vídeos, Fotos, Imprensa, Media, Users.
- `src/globals/` — `Landing` (todos os textos da página) e `SiteSettings`
  (logo, redes sociais, contato, rodapé).
- `src/components/sections/` — uma seção do site por arquivo, lendo do Payload.
- `src/app/globals.css` — o CSS do site atual portado quase 1:1 (mesmas
  cores, fontes e layout).
- `src/components/admin/` + `src/app/(payload)/custom.css` — o mesmo tema de
  admin usado no portfólio e no joycombo, com a marca e os ícones trocados
  para a Cereja Bloom.
- `seed-assets/` — imagens do site atual, usadas só pelo `npm run seed`
  (não é servido pelo Next; depois do seed, as imagens reais ficam em
  `public/media/`, versionadas fora do git).

## Lojinha (`/lojinha`)

A loja de camisetas (projeto original: `pre-venda-camiseta-cereja-bloom`)
roda dentro deste mesmo app Next.js, em vez de um deploy separado — mesmo
`git push`, mesmo site na Hostinger. Tudo fica isolado do resto do site:

- `src/app/lojinha/` — todas as rotas da loja (vitrine, carrinho, admin
  próprio em `/lojinha/admin`, distinto do admin do Payload em `/admin`).
- `src/lib/lojinha/` e `src/components/lojinha/` — código e componentes só
  da loja.
- `src/app/lojinha/globals.css` — Tailwind, importado só pelo layout da
  loja (`src/app/lojinha/layout.tsx`), então não afeta o resto do site.
- `src/proxy.ts` — middleware que protege só `/lojinha/admin/*` (login
  próprio via Supabase Auth); não interfere no `/admin` do Payload.
- Banco: **Supabase** (não é o Postgres do Payload) — configuração em
  [`supabase/schema.sql`](supabase/schema.sql), ver instruções no README
  original do projeto da loja.

Variáveis de ambiente extras (ver `.env.example`): `NEXT_PUBLIC_SUPABASE_URL`
e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

## Deploy na Hostinger

Mesmo fluxo do portfólio: app Node.js (hPanel) com integração Git — a
Hostinger faz `npm run build` e `npm start` a cada push na branch principal,
sem PM2 nem `ecosystem.config` no repositório.

Variáveis de ambiente a configurar no painel da Hostinger (ver
`.env.example`):

- `DATABASE_URI` — connection string do Postgres de produção.
- `PAYLOAD_SECRET` — string aleatória de pelo menos 32 caracteres.
- `NEXT_PUBLIC_SERVER_URL` — `https://cerejabloom.com.br`.
- `REVALIDATE_SECRET` — outra string aleatória.
- `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — da
  lojinha (Supabase → Project Settings → API Keys / Data API).

Depois do primeiro deploy, acesse `/admin` para criar o usuário e rode
`npm run seed` (via SSH/terminal da Hostinger) para popular o conteúdo
inicial a partir de `seed-assets/`.
