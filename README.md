# Recife Flats Temporada — Arquitetura do site

Site institucional de hospedagem temporária com **Web Components nativos** (`rf-*`), CSS tokenizado e **sem build step**. Deploy direto na Vercel ou Netlify.

Domínio de produção: `https://recifeflatstemporada.com`

---

## Hierarquia de páginas (como classificar)

O site segue **dois eixos**: o funil de imóveis (descoberta → reserva) e as páginas institucionais/legais.

```
/  (index.html)                          ← HOME — hero, destaques, FAQ
│
├── FUNIL DE IMÓVEIS
│   ├── /apartamentos.html               ← HUB — todos os apartamentos + filtros
│   ├── /boa-viagem.html                 ← BAIRRO — 3 apartamentos em Boa Viagem
│   ├── /pina.html                       ← BAIRRO — 1 apartamento no Pina
│   └── /apartamentos/{slug}.html        ← IMÓVEL — página de detalhe
│
├── INSTITUCIONAL
│   ├── /sobre.html
│   ├── /contato.html
│   ├── /apartmatch.html
│   └── /bio.html                        ← link-in-bio (sem navbar/footer)
│
└── INFORMAÇÕES / LEGAL
    └── /informacoes/
        ├── index.html                   ← hub de políticas
        ├── caucao.html
        ├── cancelamento.html
        ├── check-in.html
        ├── privacidade.html
        ├── termos.html
        ├── cookies.html
        └── lgpd.html
```

### Breadcrumbs (navegação hierárquica)

Componente: `<rf-breadcrumbs context="..." slug="...">`

| Página | Contexto | Trilha |
|--------|----------|--------|
| Home | — | — |
| Apartamentos | `apartments` | Início → Apartamentos |
| Boa Viagem / Pina | `neighborhood` + slug | Início → Apartamentos → Bairro |
| Detalhe do apto | `apartment` + slug | Início → Apartamentos → Bairro → Imóvel |
| Hub informações | `info-hub` | Início → Informações |
| Política legal | `info` + slug | Início → Informações → Política |
| Sobre / Contato / ApartMatch | `sobre` / `contato` / `apartmatch` | Início → Página |

Lógica centralizada em `scripts/data/site-structure.js` → `getBreadcrumbs()`.

---

## Estrutura de pastas

```
recife-flats/
├── index.html
├── apartamentos.html
├── boa-viagem.html
├── pina.html
├── sobre.html
├── contato.html
├── apartmatch.html
├── bio.html
├── sitemap.xml
├── robots.txt
├── vercel.json
│
├── apartamentos/                  ← páginas de IMÓVEL (detalhe)
│   ├── apartamento-2-quartos-boa-viagem.html
│   ├── flat-golden-view-1006.html
│   ├── studio-203-boa-viagem.html
│   └── apartamento-804-pina.html
│
├── informacoes/                   ← páginas LEGAIS e de política
│   ├── index.html
│   ├── caucao.html
│   ├── cancelamento.html
│   ├── check-in.html
│   ├── privacidade.html
│   ├── termos.html
│   ├── cookies.html
│   └── lgpd.html
│
├── assets/
│   ├── images/                    ← fotos dos apartamentos
│   └── videos/                    ← vídeos do hero (MP4 + WebM)
│
├── data/
│   └── hero/home/                 ← JSON dia/noite do hero
│
├── styles/
│   ├── tokens.css                 ← variáveis de design
│   ├── base.css                   ← reset, defaults, foco
│   ├── design-system.css
│   ├── utilities.css              ← .container, .eyebrow, .sr-only
│   ├── components/                ← UM CSS por componente
│   └── pages/                     ← CSS específico de página
│
└── scripts/
    ├── main.js                    ← ponto de entrada
    ├── bio-main.js                ← entrada da página bio
    ├── components/                ← UM JS por Web Component
    ├── data/                      ← dados centralizados
    │   ├── site-structure.js      ← URLs, bairros, breadcrumbs, INFO_PAGES
    │   ├── site-policies.js       ← conteúdo das páginas legais
    │   ├── apartamentos.js        ← catálogo dos 4 imóveis
    │   ├── apartment-detail-data.js
    │   └── location.js            ← endereço, WhatsApp, mapas
    ├── modules/                   ← lógica reutilizável
    └── utils/
        ├── paths.js               ← pageHref(), assetUrl() para subpastas
        └── dom.js
```

---

## Camada de dados (fonte única da verdade)

| Arquivo | Responsabilidade |
|---------|------------------|
| `site-structure.js` | Bairros (`NEIGHBORHOODS`), páginas legais (`INFO_PAGES`), breadcrumbs, URLs |
| `site-policies.js` | Texto completo das políticas (caução, cancelamento, LGPD…) |
| `apartamentos.js` | Lista dos 4 apartamentos + helpers |
| `apartment-detail-data.js` | Conteúdo estendido por imóvel (galeria, regras, avaliações) |
| `location.js` | Dados do negócio, WhatsApp, mapas |

**Adicionar um apartamento novo:**
1. Criar `apartamentos/{slug}.html` (copiar template existente)
2. Adicionar entrada em `apartamentos.js`
3. Adicionar conteúdo em `apartment-detail-data.js`
4. Adicionar fotos em `assets/images/apartamentos/`
5. Atualizar `sitemap.xml`

**Adicionar uma política nova:**
1. Adicionar em `site-policies.js` e `INFO_PAGES` em `site-structure.js`
2. Criar `informacoes/{slug}.html` com `<rf-info-page slug="...">`
3. Atualizar footer (automático via `INFO_PAGES`)

---

## Chrome do site (padrão em todas as páginas)

Toda página pública (exceto `bio.html`) segue:

```html
<rf-menu wraps=".site-content"></rf-menu>
<div class="site-content">
  <rf-announcement>...</rf-announcement>
  <rf-navbar></rf-navbar>
  <main>
    <rf-breadcrumbs ...></rf-breadcrumbs>   <!-- quando aplicável -->
    <!-- conteúdo -->
  </main>
  <rf-footer></rf-footer>
</div>
<rf-matching-wizard></rf-matching-wizard>
<rf-floating-whatsapp></rf-floating-whatsapp>
```

A home usa `<rf-navbar over-hero hero-target="#hero">` dentro de `<header class="site-chrome">`.

---

## Componentes principais

| Tag | Arquivo | Função |
|-----|---------|--------|
| `<rf-navbar>` | `navbar.js` | Header fixo, idioma PT/EN, botão menu |
| `<rf-menu>` | `menu.js` | Overlay de navegação (GSAP) |
| `<rf-footer>` | `footer.js` | Rodapé com links, legal, contato |
| `<rf-breadcrumbs>` | `breadcrumbs.js` | Trilha hierárquica SEO |
| `<rf-hero>` | `hero.js` | Hero com vídeo dia/noite |
| `<rf-apartments-hub>` | `apartments-hub.js` | Listagem geral por bairro |
| `<rf-neighborhood-hub>` | `neighborhood-hub.js` | Página de bairro |
| `<rf-apartment-detail>` | `apartment-detail.js` | Detalhe completo do imóvel |
| `<rf-info-page>` | `info-page.js` | Página legal a partir de `site-policies.js` |
| `<rf-info-hub>` | `info-hub.js` | Índice de políticas |
| `<rf-faq-section>` | `faq-section.js` | FAQ da home |

Registro: importar em `scripts/main.js`.

---

## Paths relativos em subpastas

`scripts/utils/paths.js` resolve automaticamente `../` para páginas em:
- `/apartamentos/*.html`
- `/informacoes/*.html`

```js
import { pageHref, assetUrl } from '../data/site-structure.js';
// pageHref('./index.html') → '../index.html' quando dentro de subpasta
```

---

## Convenções

### Nomenclatura
- Componentes: prefixo `rf-` (ex.: `<rf-navbar>`)
- CSS: BEM (`.navbar__logo`, `.menu-overlay__link`)
- Variáveis: `--space-4`, `--ocean`, `--font-display`

### Ordem do CSS
```
tokens.css → base.css → design-system.css → utilities.css → components/*.css → pages/*.css
```

### Container
Todo conteúdo dentro de `.container` (max 1440px, padding fluido).

---

## SEO e deploy

- `sitemap.xml` — todas as URLs públicas
- `robots.txt` — bloqueia backup e `/scripts/`
- `vercel.json` — cache de assets + rewrite `/informacoes` → index

---

## Páginas obrigatórias para site de hospedagem

| Requisito | Status | Onde |
|-----------|--------|------|
| Catálogo de imóveis | ✅ | `apartamentos.html` |
| Página por bairro | ✅ | `boa-viagem.html`, `pina.html` |
| Detalhe por imóvel | ✅ | `/apartamentos/{slug}.html` |
| Caução / depósito | ✅ | `/informacoes/caucao.html` |
| Cancelamento | ✅ | `/informacoes/cancelamento.html` |
| Check-in / check-out | ✅ | `/informacoes/check-in.html` |
| Privacidade + LGPD | ✅ | `/informacoes/privacidade.html`, `lgpd.html` |
| Termos de uso | ✅ | `/informacoes/termos.html` |
| Cookies | ✅ | `/informacoes/cookies.html` |
| FAQ | ✅ | Home `#faq` + link para políticas |
| Contato | ✅ | `contato.html` + WhatsApp flutuante |
| Breadcrumbs | ✅ | Componente em todas as páginas do funil |
| Sitemap | ✅ | `sitemap.xml` |

---

## Como criar uma nova página

1. Copie o shell de `sobre.html` ou `informacoes/caucao.html`
2. Ajuste `<rf-breadcrumbs context="...">` e CSS de página
3. Inclua os CSS de componentes necessários
4. Registre novos componentes em `main.js` se precisar
5. Adicione URL em `sitemap.xml`

---

## Menu (comunicação entre componentes)

```
[botão menu] → window: 'rf-menu-toggle' → [rf-menu] abre
[rf-menu]    → window: 'rf-menu-state'   → [rf-navbar] sincroniza ícone
```

---

## Performance (próximos passos)

- Unificar CSS por página em um bundle
- Self-host de fontes
- Comprimir imagens e vídeo do hero
- Cache headers (já em `vercel.json`)

Ver discussão de Lighthouse no histórico do projeto.
