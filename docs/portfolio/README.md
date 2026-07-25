<div align="center">

# Recife Flats Temporada

**Site institucional de aluguel por temporada em Recife**

Apartamentos em Boa Viagem e Pina · Matching inteligente (ApartMatch) · Reserva por WhatsApp · Design responsivo com Web Components

<br />

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](#-rodando-localmente)
[![License MIT](https://img.shields.io/badge/License-MIT-0ea5e9?style=for-the-badge)](../../LICENSE)

<br />

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Web Components](https://img.shields.io/badge/Web_Components-2D2D2D?style=flat&logo=javascript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=white)

<br />

**[🌐 Ver ao vivo](#)** ·
**[📂 Estrutura](#-estrutura-de-pastas)** ·
**[🧭 Breadcrumbs](#-hierarquia-do-site-e-breadcrumbs)** ·
**[📅 Guia de publicação](./GUIA_PUBLICACAO.md)** ·
**[💡 Decisões](#-decisões-técnicas)**

</div>

---

## 📖 Sobre o projeto

O **Recife Flats Temporada** é um site de aluguel por temporada focado em Recife (Boa Viagem e Pina). Foi pensado com **mentalidade de produto real**: componentes reutilizáveis, design system com tokens, hierarquia clara de páginas (incluindo breadcrumbs), e histórico de commits organizado para portfólio.

Em uma única aplicação, o visitante pode:

- 🏠 **Explorar apartamentos** por bairro (Boa Viagem e Pina)
- 🧭 **Navegar com breadcrumbs** (Início → Apartamentos → Bairro → Imóvel)
- 💫 **Usar o ApartMatch** para encontrar o imóvel ideal por perfil
- 📱 **Reservar pelo WhatsApp** com fluxo de confirmação
- 🌍 **Alternar idioma** (PT / EN) na navbar

> Este README é o modelo do repositório **oficial de portfólio**.  
> Para publicar aos poucos no GitHub, siga o guia: [`GUIA_PUBLICACAO.md`](./GUIA_PUBLICACAO.md).

---

## ✨ O que o projeto demonstra

- ✅ **HTML semântico** e páginas magras (só montam componentes)
- ✅ **CSS profissional** com tokens, BEM e 1 arquivo por componente
- ✅ **Web Components nativos** (`<rf-navbar>`, `<rf-menu>`, `<rf-hero>`…)
- ✅ **Arquitetura sem framework** — fácil de hospedar e explicar em entrevista
- ✅ **SEO e UX** com breadcrumbs e hierarquia Início → Apartamentos → Bairro → Imóvel
- ✅ **Responsividade** (um menu só; mobile/desktop no CSS)
- ✅ **Integrações** (WhatsApp, Google Maps / Business, Supabase opcional)
- ✅ **Metodologia Git** — commits curtos, profissionais, um assunto por commit

---

## 🛠️ Stack técnica

<table>
<tr>
<td width="33%">

**Frontend**
- HTML5 semântico
- CSS3 (tokens + BEM)
- JavaScript ES Modules
- Web Components nativos
- GSAP (animações)

</td>
<td width="33%">

**Dados & Integrações**
- Módulos JS de conteúdo
- Supabase (opcional)
- Google Maps / Business
- WhatsApp (CTA de reserva)

</td>
<td width="33%">

**Infra**
- Vercel ou Netlify
- GitHub (versionamento)
- Sem build step obrigatório
- Servidor estático local

</td>
</tr>
</table>

---

## 📂 Estrutura de pastas

```text
recife-flats-temporada/
│
├── index.html                 ← Home
├── apartamentos.html          ← Hub de apartamentos
├── boa-viagem.html            ← Página do bairro Boa Viagem
├── pina.html                  ← Página do bairro Pina
├── apartmatch.html            ← Matching de perfil
├── sobre.html
├── contato.html
├── bio.html                   ← Landing curta (Instagram)
│
├── apartamentos/              ← Página de cada imóvel
│   ├── studio-203-boa-viagem.html
│   ├── flat-golden-view-1006.html
│   ├── apartamento-2-quartos-boa-viagem.html
│   └── apartamento-804-pina.html
│
├── assets/
│   ├── images/                ← Fotos (aptos, bairros, matching)
│   ├── videos/                ← Vídeo do hero
│   └── fonts/                 ← (opcional)
│
├── styles/
│   ├── tokens.css             ← Cores, fontes, espaçamentos
│   ├── base.css               ← Reset + defaults
│   ├── utilities.css          ← .container, helpers
│   ├── design-system.css      ← Padrões compartilhados
│   ├── components/            ← 1 CSS por peça de UI
│   └── pages/                 ← CSS só de uma página
│
├── scripts/
│   ├── main.js                ← Ponto de entrada (importa tudo)
│   ├── components/            ← 1 Web Component por arquivo
│   ├── data/                  ← Conteúdo (aptos, menu, bairros)
│   ├── config/                ← Supabase, Maps
│   └── utils/                 ← Helpers (dom, i18n, paths…)
│
├── data/hero/                 ← JSON do hero (dia/noite)
├── docs/                      ← Guias e documentação
├── sql/                       ← Schemas Supabase (opcional)
├── package.json
└── README.md
```

### Regra “onde eu mudo isso?”

| Quero mudar… | Arquivo |
|---|---|
| Cores, fontes, espaços do site | `styles/tokens.css` |
| Barra de cima | `scripts/components/navbar.js` + `styles/components/navbar.css` |
| Menu que abre | `scripts/components/menu.js` + `styles/components/menu-overlay.css` |
| Links do menu | `scripts/data/site-structure.js` |
| Breadcrumbs / bairros | `scripts/data/site-structure.js` + `scripts/components/breadcrumbs.js` |
| Lista de apartamentos | `scripts/data/apartamentos.js` |
| Só a home | `index.html` + `styles/pages/home.css` |
| Foto ou vídeo | `assets/images/` ou `assets/videos/` |

---

## 🧭 Hierarquia do site e breadcrumbs

A navegação de imóveis segue **no máximo 4 níveis**:

```text
Início
  └── Apartamentos
        ├── Boa Viagem
        │     ├── Studio 203
        │     ├── Flat Golden View 1006
        │     └── Apartamento 2 quartos
        └── Pina
              └── Apartamento 804
```

### Como aparece o breadcrumb

| Página | Breadcrumb |
|---|---|
| Hub | `Início / Apartamentos` |
| Bairro | `Início / Apartamentos / Boa Viagem` |
| Bairro | `Início / Apartamentos / Pina` |
| Imóvel em Boa Viagem | `Início / Apartamentos / Boa Viagem / Studio 203` |
| Imóvel no Pina | `Início / Apartamentos / Pina / Apartamento 804` |

### URLs correspondentes

| Página | Arquivo / URL |
|---|---|
| Hub | `/apartamentos.html` |
| Boa Viagem | `/boa-viagem.html` |
| Pina | `/pina.html` |
| Imóvel | `/apartamentos/<slug>.html` |

### Como usar no HTML

```html
<!-- Hub de apartamentos -->
<rf-breadcrumbs context="apartments"></rf-breadcrumbs>

<!-- Página de bairro -->
<rf-breadcrumbs context="neighborhood" slug="boa-viagem"></rf-breadcrumbs>
<rf-breadcrumbs context="neighborhood" slug="pina"></rf-breadcrumbs>

<!-- Página do imóvel -->
<rf-breadcrumbs context="apartment" slug="studio-203-boa-viagem"></rf-breadcrumbs>
```

A lógica fica centralizada em:

- `scripts/data/site-structure.js` → `getBreadcrumbs()`
- `scripts/components/breadcrumbs.js` → `<rf-breadcrumbs>`

Detalhes extras: [`ESTRUTURA_E_BREADCRUMBS.md`](./ESTRUTURA_E_BREADCRUMBS.md).

---

## 🧩 Menu: mobile e desktop

**Não existem dois menus separados.** Existe:

1. `<rf-navbar>` — barra fixa (logo, idioma, botão Menu)
2. `<rf-menu>` — overlay que abre (efeito de página virando)

Mobile e desktop usam os **mesmos arquivos**. A diferença visual fica no CSS com `@media`.

Fluxo:

```text
[botão Menu na navbar] → evento rf-menu-toggle → [rf-menu abre]
[rf-menu] → evento rf-menu-state → [navbar atualiza o ícone]
```

---

## 💡 Decisões técnicas

<details>
<summary><b>1. JavaScript vanilla + Web Components (sem React/Next)</b></summary>

O objetivo era demonstrar domínio dos fundamentos e componentes reutilizáveis nativos do navegador. Zero build obrigatório, deploy estático simples, controle total do DOM.

</details>

<details>
<summary><b>2. CSS por componente + tokens</b></summary>

Cada peça de UI tem seu CSS. Cores/fontes/espaços nascem de `tokens.css`. Isso evita “CSS bagunçado” e deixa claro onde mexer.

</details>

<details>
<summary><b>3. Um menu só (responsivo), não pastas mobile/desktop</b></summary>

Separar `menu-mobile` e `menu-desktop` dobra manutenção. Um componente + media queries escala melhor e é o padrão profissional.

</details>

<details>
<summary><b>4. Breadcrumbs com fonte única de verdade</b></summary>

Labels e hierarquia vêm de `site-structure.js`. Navbar, menu e breadcrumbs leem a mesma estrutura — evita link quebrado ou nome diferente em cada página.

</details>

<details>
<summary><b>5. Páginas HTML magras</b></summary>

A página só monta as peças (`<rf-navbar>`, `<rf-hero>`, etc.). A lógica fica nos componentes. Mudar o rodapé uma vez atualiza o site inteiro.

</details>

---

## 🚀 Rodando localmente

**Requisitos:** navegador moderno + Node.js (para o servidor local).

```bash
# 1. Clone o repositório oficial (quando publicar)
git clone https://github.com/SEU_USUARIO/recife-flats-temporada.git
cd recife-flats-temporada

# 2. Suba um servidor estático
npm start
# ou: npm run dev

# 3. Abra no navegador
# http://localhost:3000
```

Não há build step. O site é HTML/CSS/JS servidos diretamente.

---

## 📅 Publicando aos poucos no GitHub

Este projeto foi pensado para ir ao ar **por etapas**, com commits profissionais e curtos.

👉 Siga o guia completo: **[`GUIA_PUBLICACAO.md`](./GUIA_PUBLICACAO.md)**

Lá você encontra:

- divisão por dias
- o que fazer em cada dia
- texto pronto do commit
- padrão profissional de mensagem (`tipo(escopo): descrição`)

---

## 🎓 Convenções rápidas

### Nomenclatura

- **Web Components:** prefixo `rf-` → `<rf-navbar>`, `<rf-menu>`
- **CSS:** BEM → `.menu-overlay__link--active`
- **Tokens:** `--space-4`, `--fs-lg`, `--clay-light`

### Ordem do CSS no HTML

```text
1. tokens.css
2. base.css
3. utilities.css
4. components/*.css
5. pages/*.css
```

### Commits (padrão do guia)

```text
tipo(escopo): descrição curta em português

Exemplos:
feat(nav): adiciona navbar reutilizavel
style(tokens): define cores e tipografia base
feat(breadcrumbs): implementa hierarquia aptos > bairro > imovel
fix(menu): corrige fechamento com tecla Escape
docs(readme): documenta estrutura e hierarquia do site
```

---

## 📁 Documentação deste pacote

| Arquivo | Para quê |
|---|---|
| [`README.md`](./README.md) | README completo do repositório oficial |
| [`GUIA_PUBLICACAO.md`](./GUIA_PUBLICACAO.md) | Plano dia a dia + textos de commit |
| [`ESTRUTURA_E_BREADCRUMBS.md`](./ESTRUTURA_E_BREADCRUMBS.md) | Pastas + breadcrumbs + URLs |

---

## 👤 Autora

Feito por **Vanessa** · [GitHub](https://github.com/VANESSENCEWEB)

Projeto de portfólio com foco em front-end, organização de código e experiência real de produto.
