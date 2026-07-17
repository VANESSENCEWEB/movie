# Mapa completo do site — Recife Flats Temporada

## Onde está o footer?

| O quê | Caminho | Como usar |
|-------|---------|-----------|
| **CSS do footer** | `styles/components/footer.css` | `<link rel="stylesheet" href="./styles/components/footer.css" />` |
| **JS do footer** | `scripts/components/footer.js` | Registrado automaticamente via `scripts/main.js` |
| **Tag HTML** | `<rf-footer></rf-footer>` | Dentro de `.site-content`, antes de fechar a div |
| **Referência chrome** | `scripts/data/site-chrome.js` | Lista CSS obrigatórios em toda página |

> **Importante:** o `footer.js` sozinho não basta — cada HTML precisa do **link do CSS** + **main.js** + a tag `<rf-footer>`.

---

## Divisão do site (4 pilares)

```
┌─────────────────────────────────────────────────────────────┐
│  1. IMÓVEIS (funil de reserva)                              │
│     index → apartamentos → bairro → apartamento             │
├─────────────────────────────────────────────────────────────┤
│  2. INFORMAÇÕES (políticas obrigatórias)                    │
│     /informacoes/ — caução, cancelamento, check-in, legal   │
├─────────────────────────────────────────────────────────────┤
│  3. CONHEÇA RECIFE (conteúdo de destino)                    │
│     /conheca-recife/ — praias, gastronomia, dicas, roteiros │
├─────────────────────────────────────────────────────────────┤
│  4. BLOG (artigos e SEO)                                    │
│     /blog/ — posts sobre temporada, roteiros, gastronomia   │
└─────────────────────────────────────────────────────────────┘
```

---

## Árvore de URLs

```
/  (index.html)
│
├── IMÓVEIS
│   └── /apartamentos/
│       ├── index.html              ← hub (todos os imóveis)
│       ├── boa-viagem/
│       │   ├── index.html          ← bairro
│       │   └── {slug}.html         ← imóvel
│       └── pina/
│           ├── index.html
│           └── {slug}.html
│
├── INFORMAÇÕES  →  scripts/data/site-policies.js
│   └── /informacoes/
│       ├── index.html          (hub)
│       ├── caucao.html         ← Caução reembolsável
│       ├── cancelamento.html   ← Política de cancelamento
│       ├── check-in.html       ← Check-in / Check-out
│       ├── privacidade.html
│       ├── termos.html         ← Termos de uso
│       ├── cookies.html
│       └── lgpd.html
│
├── CONHEÇA RECIFE  →  scripts/data/site-recife-guides.js
│   └── /conheca-recife/
│       ├── index.html          (hub)
│       ├── praias.html
│       ├── gastronomia.html
│       ├── dicas-locais.html
│       └── o-que-fazer.html
│
├── BLOG  →  scripts/data/site-blog.js
│   └── /blog/
│       ├── index.html          (listagem)
│       ├── guia-boa-viagem-temporada.html
│       ├── o-que-fazer-recife-3-dias.html
│       └── gastronomia-pernambucana.html
│
└── INSTITUCIONAL
    ├── /sobre.html
    ├── /contato.html
    ├── /apartmatch.html
    └── /bio.html               (sem nav/footer)
```

---

## Footer — colunas e links

O footer (`scripts/components/footer.js`) lê os links de `site-structure.js`:

### Coluna «Apartamentos»
- Lista dos 4 imóveis (de `apartamentos.js`)
- Link «Ver todos»

### Coluna «Informações»
| Link | Página |
|------|--------|
| Caução reembolsável | `/informacoes/caucao.html` |
| Check-in / Check-out | `/informacoes/check-in.html` |
| Perguntas frequentes | `/#faq` |
| Política de cancelamento | `/informacoes/cancelamento.html` |
| Privacidade | `/informacoes/privacidade.html` |
| Termos de uso | `/informacoes/termos.html` |
| Cookies | `/informacoes/cookies.html` |
| LGPD | `/informacoes/lgpd.html` |

### Coluna «Conheça Recife»
| Link | Página |
|------|--------|
| Praias | `/conheca-recife/praias.html` |
| Gastronomia | `/conheca-recife/gastronomia.html` |
| Dicas locais | `/conheca-recife/dicas-locais.html` |
| O que fazer em Recife | `/conheca-recife/o-que-fazer.html` |
| Boa Viagem | `/apartamentos/boa-viagem/` |
| Pina | `/apartamentos/pina/` |

### Coluna «Blog»
- Hub do blog + artigos em destaque

### Barra legal (rodapé inferior)
- Privacidade · Termos · Cookies · LGPD

---

## Componentes por seção

| Seção | Componente | Dados |
|-------|-----------|-------|
| Políticas | `<rf-info-page slug="caucao">` | `site-policies.js` |
| Hub informações | `<rf-info-hub>` | `INFO_PAGES` |
| Guias Recife | `<rf-guide-page slug="praias">` | `site-recife-guides.js` |
| Hub Recife | `<rf-guide-hub>` | `RECIFE_PAGES` |
| Blog listagem | `<rf-blog-hub>` | `site-blog.js` |
| Blog artigo | `<rf-blog-post slug="...">` | `site-blog.js` |
| Footer | `<rf-footer>` | `getFooterInfoLinks()` + `getFooterRecifeLinks()` |
| Breadcrumbs | `<rf-breadcrumbs context="..." slug="...">` | `getBreadcrumbs()` |

---

## Shell HTML obrigatório (toda página pública)

```html
<!-- 1. CSS base -->
<link rel="stylesheet" href="./styles/tokens.css" />
<link rel="stylesheet" href="./styles/base.css" />
<link rel="stylesheet" href="./styles/design-system.css" />
<link rel="stylesheet" href="./styles/utilities.css" />

<!-- 2. CSS componentes chrome -->
<link rel="stylesheet" href="./styles/components/announcement.css" />
<link rel="stylesheet" href="./styles/components/button.css" />
<link rel="stylesheet" href="./styles/components/navbar.css" />
<link rel="stylesheet" href="./styles/components/menu-overlay.css" />
<link rel="stylesheet" href="./styles/components/breadcrumbs.css" />
<link rel="stylesheet" href="./styles/components/footer.css" />      ← OBRIGATÓRIO
<link rel="stylesheet" href="./styles/components/floating-whatsapp.css" />

<!-- 3. Body -->
<rf-menu wraps=".site-content"></rf-menu>
<div class="site-content">
  <rf-announcement>...</rf-announcement>
  <rf-navbar></rf-navbar>
  <main>...</main>
  <rf-footer></rf-footer>                                            ← OBRIGATÓRIO
</div>
<rf-floating-whatsapp></rf-floating-whatsapp>

<!-- 4. JS (registra footer.js automaticamente) -->
<script type="module" src="./scripts/main.js"></script>              ← OBRIGATÓRIO
```

Em subpastas (`/apartamentos/`, `/informacoes/`, `/conheca-recife/`, `/blog/`): troque `./` por `../`.

---

## Breadcrumbs por contexto

```html
<rf-breadcrumbs context="apartments"></rf-breadcrumbs>
<rf-breadcrumbs context="neighborhood" slug="boa-viagem"></rf-breadcrumbs>
<rf-breadcrumbs context="apartment" slug="flat-golden-view-1006"></rf-breadcrumbs>
<rf-breadcrumbs context="info" slug="caucao"></rf-breadcrumbs>
<rf-breadcrumbs context="recife" slug="praias"></rf-breadcrumbs>
<rf-breadcrumbs context="blog-post" slug="guia-boa-viagem-temporada"></rf-breadcrumbs>
```

---

## Como adicionar conteúdo novo

### Novo post no blog
1. Entrada em `scripts/data/site-blog.js`
2. Arquivo `blog/{slug}.html` (copiar template existente)
3. URL no `sitemap.xml`

### Novo guia «Conheça Recife»
1. Entrada em `scripts/data/site-recife-guides.js`
2. Entrada em `RECIFE_PAGES` em `site-structure.js`
3. Arquivo `conheca-recife/{slug}.html`

### Nova política
1. Entrada em `site-policies.js` + `INFO_PAGES`
2. Arquivo `informacoes/{slug}.html`
