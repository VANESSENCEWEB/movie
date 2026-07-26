# Estrutura de pastas e breadcrumbs

Guia visual e prático da organização do site **Recife Flats Temporada**.

---

## 1. Ideia geral

Organize o projeto por **tipo de arquivo** (camadas), não por “versão mobile/desktop”.

```text
HTML     → páginas
styles/  → aparência
scripts/ → comportamento
assets/  → imagens e vídeos
data/    → JSON estático
docs/    → documentação
```

Dentro de `styles/` e `scripts/`, o que se **repete** vira componente.  
O que é **só de uma página** fica em `pages/`.

---

## 2. Mapa completo das pastas

```text
recife-flats-temporada/
│
├── index.html
├── apartamentos.html          ← hub
├── boa-viagem.html            ← bairro
├── pina.html                  ← bairro
├── apartmatch.html
├── sobre.html
├── contato.html
├── bio.html
│
├── apartamentos/              ← imóveis
│   ├── studio-203-boa-viagem.html
│   ├── flat-golden-view-1006.html
│   ├── apartamento-2-quartos-boa-viagem.html
│   └── apartamento-804-pina.html
│
├── assets/
│   ├── images/
│   │   ├── apartamentos/
│   │   ├── matching/
│   │   └── ...
│   └── videos/
│
├── styles/
│   ├── tokens.css
│   ├── base.css
│   ├── utilities.css
│   ├── design-system.css
│   ├── components/
│   │   ├── navbar.css
│   │   ├── menu-overlay.css
│   │   ├── breadcrumbs.css
│   │   ├── hero.css
│   │   └── ...
│   └── pages/
│       ├── home.css
│       ├── apartamentos.css
│       ├── apartamento.css
│       └── ...
│
├── scripts/
│   ├── main.js
│   ├── components/
│   │   ├── navbar.js          → <rf-navbar>
│   │   ├── menu.js            → <rf-menu>
│   │   ├── breadcrumbs.js     → <rf-breadcrumbs>
│   │   └── ...
│   ├── data/
│   │   ├── site-structure.js  → bairros + breadcrumbs + URLs
│   │   ├── apartamentos.js
│   │   └── ...
│   ├── config/
│   └── utils/
│
└── docs/portfolio/            ← este pacote de documentação
```

---

## 3. Hierarquia do site (breadcrumbs)

### Regra de negócio

```text
Início
  └── Apartamentos                    (/apartamentos.html)
        ├── Boa Viagem                (/boa-viagem.html)
        │     └── [nome do imóvel]    (/apartamentos/<slug>.html)
        └── Pina                      (/pina.html)
              └── [nome do imóvel]    (/apartamentos/<slug>.html)
```

### Exemplos reais

**Hub**

```text
Início / Apartamentos
```

**Bairro Boa Viagem**

```text
Início / Apartamentos / Boa Viagem
```

**Bairro Pina**

```text
Início / Apartamentos / Pina
```

**Imóvel em Boa Viagem**

```text
Início / Apartamentos / Boa Viagem / Studio 203
```

**Imóvel no Pina**

```text
Início / Apartamentos / Pina / Apartamento 804
```

---

## 4. Como ligar isso no código

### Fonte única da verdade

Arquivo: `scripts/data/site-structure.js`

Ele define:

- bairros (`NEIGHBORHOODS`)
- URLs de bairro e imóvel
- função `getBreadcrumbs(tipo, { slug })`

### Componente visual

Arquivo: `scripts/components/breadcrumbs.js`  
Tag: `<rf-breadcrumbs>`

### Uso nas páginas

```html
<!-- /apartamentos.html -->
<rf-breadcrumbs context="apartments"></rf-breadcrumbs>

<!-- /boa-viagem.html -->
<rf-breadcrumbs context="neighborhood" slug="boa-viagem"></rf-breadcrumbs>

<!-- /pina.html -->
<rf-breadcrumbs context="neighborhood" slug="pina"></rf-breadcrumbs>

<!-- /apartamentos/studio-203-boa-viagem.html -->
<rf-breadcrumbs context="apartment" slug="studio-203-boa-viagem"></rf-breadcrumbs>

<!-- /apartamentos/apartamento-804-pina.html -->
<rf-breadcrumbs context="apartment" slug="apartamento-804-pina"></rf-breadcrumbs>
```

### O que cada `context` gera

| `context` | `slug` | Resultado |
|---|---|---|
| `apartments` | — | Início → Apartamentos |
| `neighborhood` | `boa-viagem` | Início → Apartamentos → Boa Viagem |
| `neighborhood` | `pina` | Início → Apartamentos → Pina |
| `apartment` | slug do imóvel | Início → Apartamentos → Bairro → Nome do imóvel |

O bairro do imóvel vem dos dados em `scripts/data/apartamentos.js` (`neighborhood` / `neighborhoodSlug`).

---

## 5. Menu: onde fica mobile e desktop

| Peça | Arquivo JS | Arquivo CSS | Função |
|---|---|---|---|
| Barra de cima | `navbar.js` | `navbar.css` | logo, idioma, botão Menu |
| Menu aberto | `menu.js` | `menu-overlay.css` | links, fechar, animação |

**Não crie** pastas `mobile/` e `desktop/`.  
No CSS, use media queries:

```css
/* exemplo conceitual */
.menu-overlay__left { /* layout desktop */ }

@media (max-width: 768px) {
  .menu-overlay__left { /* ajustes mobile */ }
}
```

---

## 6. Checklist rápido ao criar uma página nova

1. Criar o `.html` na pasta certa  
2. Incluir `<rf-navbar>` e `<rf-menu>`  
3. Incluir `<rf-breadcrumbs>` com `context` e `slug` corretos  
4. Se for imóvel, garantir que ele existe em `apartamentos.js` com o bairro certo  
5. Adicionar CSS da página só se precisar (`styles/pages/...`)  
6. Testar o caminho do breadcrumb clicando em cada nível

---

## 7. Relação com a publicação dia a dia

No guia [`GUIA_PUBLICACAO.md`](./GUIA_PUBLICACAO.md):

- **Dia 2** → navbar + menu  
- **Dia 4** → hub + bairros + breadcrumbs  
- **Dia 5** → páginas dos imóveis com crumb completo

Essa ordem evita link quebrado e deixa o histórico do GitHub contando a história certa: primeiro navegação, depois hierarquia, depois conteúdo.
