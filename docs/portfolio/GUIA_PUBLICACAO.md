# Guia de publicação no GitHub (aos poucos)

Este guia serve para você **criar o repositório oficial** e ir publicando o site **pouco a pouco**, com commits profissionais, curtos e fáceis de entender no histórico.

Use junto com:

- [`README.md`](./README.md) — README completo do portfólio  
- [`ESTRUTURA_E_BREADCRUMBS.md`](./ESTRUTURA_E_BREADCRUMBS.md) — pastas + breadcrumbs

---

## 1. Antes de começar

### Crie o repositório vazio no GitHub

1. GitHub → **New repository**
2. Nome sugerido: `recife-flats-temporada`
3. Público
4. **Não** marque README / .gitignore / license (vamos criar aqui)
5. Crie o repo

### No computador

```bash
mkdir recife-flats-temporada
cd recife-flats-temporada
git init
git branch -M main
```

Conecte ao remoto (troque pelo seu usuário):

```bash
git remote add origin https://github.com/VANESSENCEWEB/recife-flats-temporada.git
```

---

## 2. Como escrever commits (padrão profissional)

Use **Conventional Commits**, em português, curtos:

```text
tipo(escopo): descrição curta
```

### Tipos mais usados

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade / seção / componente |
| `style` | Visual, CSS, tokens (sem mudar lógica) |
| `fix` | Correção de bug |
| `refactor` | Melhora código sem mudar o que o usuário vê |
| `docs` | README, guias, comentários de documentação |
| `chore` | Configuração, limpeza, arquivos auxiliares |
| `perf` | Performance (imagem, lazy load, etc.) |
| `a11y` | Acessibilidade |

### Regras de ouro

1. **Um assunto por commit** (não misture menu + hero + footer)
2. **Máximo ~72 caracteres** na primeira linha
3. **Sem ponto final**
4. **Verbo no presente** (“adiciona”, “corrige”, “documenta”)
5. **Escopo curto**: `nav`, `menu`, `hero`, `home`, `breadcrumbs`, `apto`, `readme`

### Exemplos bons

```text
feat(nav): adiciona navbar reutilizavel
style(tokens): define cores e tipografia base
feat(breadcrumbs): liga hierarquia aptos > bairro > imovel
fix(menu): fecha overlay com tecla Escape
docs(readme): documenta estrutura do projeto
```

### Exemplos ruins (evite)

```text
update
ajustes
tudo do dia
WIP
corrigi umas coisas
```

### Checklist antes de cada commit

```bash
git status
git diff
git add .
# ou adicione só os arquivos do dia:
git add styles/tokens.css styles/base.css
git commit -m "style(tokens): define cores e tipografia base"
git push -u origin main
```

> Na primeira vez use `-u origin main`. Depois, só `git push`.

---

## 3. Plano por dias

Cada dia = **1 bloco claro** + **1 a 4 commits**.  
Você pode juntar dias se tiver mais tempo, ou dividir se tiver menos.

---

### Dia 0 — Fundação do repositório

**Objetivo:** repo limpo, README inicial, estrutura vazia.

**Crie:**

```text
.gitignore
README.md
package.json
styles/
scripts/
assets/images/
assets/videos/
docs/
```

**`.gitignore` sugerido:**

```gitignore
.DS_Store
Thumbs.db
node_modules/
.vscode/
.env
.env.*
*.log
```

**Commits do dia:**

```bash
git add .gitignore package.json
git commit -m "chore: inicia repositorio e configura projeto"

git add README.md
git commit -m "docs(readme): adiciona visao geral do projeto"

git add styles scripts assets docs
git commit -m "chore: cria estrutura base de pastas"
```

**Push:**

```bash
git push -u origin main
```

---

### Dia 1 — Design system (tokens + base)

**Objetivo:** base visual do site.

**Arquivos:**

- `styles/tokens.css`
- `styles/base.css`
- `styles/utilities.css`
- (opcional) `styles/design-system.css`

**Commits:**

```bash
git commit -m "style(tokens): define cores tipografia e espacamentos"
git commit -m "style(base): adiciona reset e estilos globais"
git commit -m "style(utils): adiciona container e utilitarios"
```

**Pronto quando:** abrir qualquer HTML futuro e as variáveis CSS já existirem.

---

### Dia 2 — Shell do site (navbar + menu)

**Objetivo:** cabeçalho e menu funcionando em todas as páginas.

**Arquivos:**

- `scripts/components/navbar.js`
- `scripts/components/menu.js`
- `styles/components/navbar.css`
- `styles/components/menu-overlay.css`
- `scripts/data/site-structure.js` (links do menu)
- `scripts/main.js`
- `index.html` (versão mínima só com navbar/menu)

**Commits:**

```bash
git commit -m "feat(data): centraliza links de navegacao"
git commit -m "feat(nav): adiciona navbar reutilizavel"
git commit -m "feat(menu): adiciona overlay de navegacao"
git commit -m "feat(home): monta shell inicial com nav e menu"
```

**Importante:** mobile e desktop = **mesmo componente**. Diferença só no CSS.

---

### Dia 3 — Home (hero + primeiras seções)

**Objetivo:** primeira impressão do site.

**Arquivos:**

- `scripts/components/hero.js`
- `styles/components/hero.css`
- `styles/pages/home.css`
- `assets/videos/` (vídeo otimizado)
- seções iniciais que você já tiver (marquee, trust strip, etc.)

**Commits:**

```bash
git commit -m "feat(hero): adiciona hero com video de fundo"
git commit -m "style(home): estiliza primeira dobra da homepage"
git commit -m "perf(assets): adiciona video do hero otimizado"
```

---

### Dia 4 — Hierarquia Apartamentos + breadcrumbs

**Objetivo:** deixar clara a navegação do portfólio (SEO + UX).

**Hierarquia obrigatória:**

```text
Início → Apartamentos → Boa Viagem ou Pina → Apartamento
```

**Arquivos:**

- `apartamentos.html`
- `boa-viagem.html`
- `pina.html`
- `scripts/components/breadcrumbs.js`
- `styles/components/breadcrumbs.css`
- `scripts/data/site-structure.js` (`getBreadcrumbs`, bairros)
- `scripts/data/apartamentos.js` (lista básica)

**Commits:**

```bash
git commit -m "feat(data): define bairros e hierarquia do site"
git commit -m "feat(breadcrumbs): implementa navegacao estrutural"
git commit -m "feat(aptos): cria hub de apartamentos"
git commit -m "feat(bairros): adiciona paginas boa-viagem e pina"
```

**Teste mental:**

- Em Boa Viagem o crumb deve ser: `Início / Apartamentos / Boa Viagem`
- Em um imóvel: `Início / Apartamentos / Boa Viagem / Nome do apto`

---

### Dia 5 — Páginas dos imóveis

**Objetivo:** detalhe de cada apartamento.

**Arquivos:**

- `apartamentos/*.html`
- `scripts/components/apartment-detail.js` (ou equivalente)
- `styles/pages/apartamento.css`
- `styles/components/apartment-gallery.css`
- imagens em `assets/images/apartamentos/`

**Commits (um por imóvel ou um lote + um de galeria):**

```bash
git commit -m "feat(apto): adiciona pagina studio 203 boa viagem"
git commit -m "feat(apto): adiciona pagina flat golden view 1006"
git commit -m "feat(apto): adiciona pagina apartamento 804 pina"
git commit -m "feat(gallery): adiciona galeria de fotos do imovel"
```

---

### Dia 6 — Cards, listagens e seções de confiança

**Objetivo:** home e hub mais ricos.

**Arquivos possíveis:**

- `apartment-card`, `apartments-teaser`, `testimonials`, `faq`, `why-choose`, `footer`

**Commits:**

```bash
git commit -m "feat(cards): adiciona card reutilizavel de apartamento"
git commit -m "feat(home): adiciona secoes de prova social"
git commit -m "feat(footer): adiciona rodape global"
```

---

### Dia 7 — Contato, sobre e CTAs de reserva

**Objetivo:** conversão (WhatsApp / formulário).

**Arquivos:**

- `contato.html`, `sobre.html`
- modais de reserva / WhatsApp flutuante
- `styles/pages/contato.css`, `styles/pages/sobre.css`

**Commits:**

```bash
git commit -m "feat(contato): adiciona pagina de contato"
git commit -m "feat(sobre): adiciona pagina institucional"
git commit -m "feat(whatsapp): adiciona atalho flutuante de reserva"
```

---

### Dia 8 — ApartMatch (diferencial do portfólio)

**Objetivo:** feature “produto”, não só site institucional.

**Arquivos:**

- `apartmatch.html`
- componentes/matching
- `styles/pages/apartmatch.css`
- dados de perfis

**Commits:**

```bash
git commit -m "feat(match): adiciona pagina apartmatch"
git commit -m "feat(match): implementa fluxo de perguntas do matching"
git commit -m "style(match): estiliza resultado e estados do wizard"
```

---

### Dia 9 — Polimento (mobile, a11y, performance)

**Objetivo:** qualidade de portfólio.

**Commits sugeridos (um tema cada):**

```bash
git commit -m "fix(menu): melhora usabilidade do menu no mobile"
git commit -m "a11y(nav): adiciona aria-labels e foco visivel"
git commit -m "perf(images): aplica lazy loading nas fotos"
git commit -m "style(responsive): ajusta espacamentos em telas pequenas"
```

---

### Dia 10 — README final + deploy

**Objetivo:** fechar o repositório “apresentável”.

**Faça:**

1. Copie o conteúdo de `docs/portfolio/README.md` para o `README.md` da raiz do repo oficial
2. Coloque screenshots (home, aptos, bairro, matching)
3. Configure deploy (Vercel ou Netlify)
4. Atualize o badge “Ver ao vivo”

**Commits:**

```bash
git commit -m "docs(readme): finaliza documentacao completa do projeto"
git commit -m "docs(readme): adiciona screenshots das principais paginas"
git commit -m "chore(deploy): configura publicacao no vercel"
```

---

## 4. Modelo de dia (copie e use)

```text
## Dia X — [nome do bloco]

Objetivo:
- ...

Arquivos que vou tocar:
- ...

Commits planejados:
1. tipo(escopo): ...
2. tipo(escopo): ...

Como validar no navegador:
- [ ] Desktop
- [ ] Mobile
- [ ] Links do breadcrumb
- [ ] Menu abre e fecha
```

---

## 5. Ordem recomendada (visão rápida)

| Dia | Entrega | Commits-chave |
|---|---|---|
| 0 | Repo + pastas + README inicial | `chore`, `docs` |
| 1 | Tokens / base / utils | `style(tokens)`, `style(base)` |
| 2 | Navbar + menu | `feat(nav)`, `feat(menu)` |
| 3 | Hero + home | `feat(hero)`, `style(home)` |
| 4 | Hub + bairros + breadcrumbs | `feat(breadcrumbs)`, `feat(bairros)` |
| 5 | Páginas dos imóveis | `feat(apto)` |
| 6 | Cards / footer / prova social | `feat(cards)`, `feat(footer)` |
| 7 | Contato / sobre / WhatsApp | `feat(contato)`, `feat(whatsapp)` |
| 8 | ApartMatch | `feat(match)` |
| 9 | Polimento | `fix`, `a11y`, `perf` |
| 10 | README final + deploy | `docs`, `chore(deploy)` |

---

## 6. O que NÃO subir no repo oficial

- `index-backup.html`
- arquivos `.bat` de uso pessoal
- pastas duplicadas / previews antigos
- `.env` com chaves reais
- vídeos enormes sem comprimir
- comentários pessoais soltos no código

---

## 7. Dica de histórico “bonito” no GitHub

Depois de vários dias, seu `git log --oneline` deve parecer com isto:

```text
a1b2c3d docs(readme): finaliza documentacao completa do projeto
b2c3d4e feat(match): implementa fluxo de perguntas do matching
c3d4e5f feat(breadcrumbs): implementa navegacao estrutural
d4e5f6g feat(apto): adiciona pagina studio 203 boa viagem
e5f6g7h feat(menu): adiciona overlay de navegacao
f6g7h8i feat(nav): adiciona navbar reutilizavel
g7h8i9j style(tokens): define cores tipografia e espacamentos
h8i9j0k chore: inicia repositorio e configura projeto
```

Isso comunica profissionalismo **mesmo antes** de abrirem o código.

---

## 8. Atalho se você já tem o site pronto neste repo

Você não precisa reescrever tudo do zero. Pode:

1. Criar o repo oficial vazio
2. Copiar **só o bloco do dia** (ex.: tokens + base)
3. Commitar com a mensagem do dia
4. No dia seguinte, copiar o próximo bloco
5. Seguir a tabela

Assim o histórico do GitHub oficial fica limpo e “construído em público”, ideal para portfólio.
