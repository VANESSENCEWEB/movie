# Moving Background Images Grid

Template reorganizado para facilitar customização.

## Abrir no PC

**Pode abrir com duplo clique no `index.html`** — agora funciona direto, sem servidor.

O `iniciar.bat` é **opcional** (só se quiser testar como num site publicado).

## Deploy (publicar na internet)

No deploy **não precisa** de `iniciar.bat` nem de servidor no seu PC. Você sobe os arquivos e pronto.

| Plataforma | Como fazer |
|---|---|
| **Vercel** | Conecte o repositório GitHub → deploy automático |
| **Netlify** | Arraste a pasta do projeto em [netlify.com/drop](https://app.netlify.com/drop) |
| **GitHub Pages** | Settings → Pages → branch `main` → pasta raiz |

O site publicado roda em `https://` — igual qualquer site na internet. Visitantes acessam pela URL, sem instalar nada.

## Por que antes pedia servidor?

Era limitação do **export original** do Webflow:

- CSS com `@import` (navegador bloqueia em `file://`)
- Animações presas ao `webflow.js` (não roda abrindo arquivo local)
- Scripts enormes de "modo offline"

Isso foi removido. Hoje a animação é **CSS puro** e o `index.html` carrega tudo direto.

## Estrutura do projeto

```
/
├── index.html              ← Duplo clique para abrir
├── iniciar.bat             ← Opcional: servidor local
├── atualizar-css.bat       ← Rode após editar CSS modular
│
├── css/
│   ├── site.css            ← CSS que o index.html usa
│   ├── vendor-webflow.css  ← Base do Webflow (botões, grid)
│   ├── base.css            ← Fonte para edição
│   └── components/         ← Fonte para edição (grid, hero, etc.)
│
├── js/
│   └── main.js             ← Seus scripts
│
├── componentes/            ← HTML de referência
├── images/fotos/           ← Fotos de fundo
└── fonts/
```

## Customização

**Fotos:** coloque em `images/fotos/` → edite `css/components/background-grid.css` → rode `atualizar-css.bat`

**Textos:** edite `index.html`

**Logo:** substitua `images/logo.svg`

**JS:** escreva em `js/main.js`

## Sobre vídeo

Este template usa **fotos animadas**, não vídeo.

## Créditos

Template original: [Moving Background Images Grid](https://webflow.com/made-in-webflow/website/moving-background-images-grid) por Nephew Media.
