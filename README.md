# Moving Background Images Grid

Template Webflow reorganizado para facilitar customização.

## Estrutura do projeto

```
/
├── index.html              ← Página principal (limpa e comentada)
├── index.original.html     ← Backup do export original (bagunçado)
│
├── css/
│   ├── main.css            ← Importa todos os estilos
│   ├── base.css            ← Tipografia, cores, layout geral
│   ├── vendor-webflow.css  ← CSS base do Webflow
│   └── components/
│       ├── background-grid.css  ← Grade de fotos ao fundo
│       ├── header.css           ← Logo
│       ├── hero.css             ← Título + botão
│       └── footer.css           ← Rodapé
│
├── js/
│   ├── jquery.min.js       ← Dependência do Webflow
│   ├── webflow.js          ← Animações do template
│   └── main.js             ← Seus scripts customizados
│
├── componentes/
│   ├── background-grid.html
│   ├── header.html
│   ├── hero.html
│   └── footer.html
│
├── images/
│   ├── fotos/              ← Fotos de fundo (16 imagens)
│   ├── logo.svg
│   ├── favicon.ico
│   └── webclip.png
│
└── fonts/
    └── messinasans-regular.woff2
```

## Como o template funciona

### Grade de fundo animada

O efeito principal é uma grade de imagens que se move horizontalmente atrás do conteúdo.

- **HTML:** `componentes/background-grid.html`
- **CSS:** `css/components/background-grid.css`
- **Animação:** `webflow.js` via `data-w-id` — não remova esses atributos

### Conteúdo sobre a grade

| Componente | HTML | CSS |
|------------|------|-----|
| Logo | `componentes/header.html` | `css/components/header.css` |
| Hero | `componentes/hero.html` | `css/components/hero.css` |
| Rodapé | `componentes/footer.html` | `css/components/footer.css` |

### O que era a bagunça original

O export original tinha nomes com hash, scripts offline enormes, tudo minificado e referências ao CDN Webflow. Tudo foi separado em arquivos legíveis.

## Customização rápida

**Fotos:** coloque em `images/fotos/` e edite `css/components/background-grid.css`

**Textos:** edite `index.html` (classes `.main-heading`, `.primary-btn`, `.footer--text`)

**Logo:** substitua `images/logo.svg`

**JS:** escreva em `js/main.js`

## Rodar localmente

```bash
npx serve .
```

Acesse `http://localhost:3000`

## Créditos

Template original: [Moving Background Images Grid](https://webflow.com/made-in-webflow/website/moving-background-images-grid) por Nephew Media.
