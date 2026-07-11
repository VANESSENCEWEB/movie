# Migração — Recife Flats Temporada

Guia para baixar o repositório no seu computador com **apenas o site de produção**, sem pastas duplicadas nem protótipos antigos.

---

## Opção recomendada: clonar a branch limpa

```bash
git clone -b recife-flats-migration-7ac6 https://github.com/VANESSENCEWEB/movie.git recife-flats-temporada
cd recife-flats-temporada
```

Se já tiver o repo clonado:

```bash
git fetch origin
git checkout recife-flats-migration-7ac6
```

---

## O que fica no projeto (site completo)

```
recife-flats-temporada/
├── index.html              ← Home (versão atual, sem telhado)
├── index-backup.html       ← Backup com telhado (referência)
├── bio.html                ← Landing /bio (Instagram)
├── apartamentos.html
├── apartmatch.html
├── boa-viagem.html
├── pina.html
├── contato.html
├── sobre.html
├── apartamentos/           ← Páginas de cada imóvel
├── assets/
│   ├── images/             ← Fotos dos apartamentos
│   └── videos/             ← Vídeo do hero
├── data/hero/              ← JSON do hero (dia/noite)
├── scripts/                ← Web Components (JS)
├── styles/                 ← CSS do site
├── docs/                   ← Integração Google Business
├── sql/                    ← Schema Supabase (opcional)
├── README.md
├── SUPABASE_SETUP.md
├── netlify.toml
└── vercel.json
```

---

## O que foi removido nesta branch

| Removido | Motivo |
|----------|--------|
| `recife-flats-preview/` | Cópia duplicada (~107 MB) |
| `recife_flats-fixes/` | Patches antigos de agente |
| `exemplo/` | Protótipo Webflow/Tripora |
| `css/`, `js/`, `images/` | Stack legada (site usa `styles/` + `scripts/`) |
| `componentes/`, `videos/` | Não usados pelo site atual |
| `index.original.html` | Template Webflow antigo |
| `*.patch`, notas internas | Histórico de correções do agente |
| Lixo em `assets/` (Webflow) | JPG/HTML/JS de templates importados |

---

## Branches no GitHub

| Branch | Uso |
|--------|-----|
| `main` | Código completo (com histórico e pastas extras) |
| `recife-flats-migration-7ac6` | **Só o que migrar** (esta branch) |
| `gh-pages-recife-flats` | Deploy do site no ar |

Para o dia a dia no seu PC, use **`recife-flats-migration-7ac6`** ou faça merge dela na `main` do seu fork.

---

## Rodar localmente

O site é HTML estático — **sem build**:

```bash
# Python
python3 -m http.server 8080

# ou Node
npx serve .
```

Abra: `http://localhost:8080/index.html`

---

## Deploy

- **Netlify / Vercel**: aponte para a pasta raiz; `index.html` é a home.
- **GitHub Pages**: branch `gh-pages-recife-flats` já está configurada para o site.

---

## Próximo passo (opcional)

Se quiser que a `main` fique igual à branch limpa:

```bash
git checkout main
git merge recife-flats-migration-7ac6
git push origin main
```

Isso remove o lixo também na branch principal do GitHub.
