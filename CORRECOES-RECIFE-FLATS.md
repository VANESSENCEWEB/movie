# Correções aplicadas (copie para recife_flats_temporada)

O projeto certo é **recife_flats_temporada**, não `movie`.

## Por que o vídeo não pegava

O vídeo estava em `assets/videos/video.mp4`, mas o código apontava para:

- `0624-otimizado.mp4` (dia)
- `0624-otimizado-night.mp4` (noite) — **esse arquivo não existe**

Além disso, o componente `<rf-hero>` carrega o vídeo dos JSON em `data/hero/home/` — **não basta mudar só o index.html**.

## Arquivos alterados

| Arquivo | Mudança |
|---------|---------|
| `index.html` | `video-day` e `video-night` → `./assets/videos/video.mp4` |
| `data/hero/home/day.json` | `"video": "./assets/videos/video.mp4"` |
| `data/hero/home/night.json` | `"video": "./assets/videos/video.mp4"` |
| `styles/components/hero-roof.css` | Bordas terracota → verde `--mangue-500` |
| `scripts/components/hero.js` | Onda embaixo: branco → verde `#1A2E22` |
| `styles/components/hero.css` | Frase mais alta; busca fixa acima da onda; **description e CTAs visíveis** |
| `styles/components/navbar.css` | Botão de idioma PT/EN; labels WhatsApp e Menu visíveis no mobile |
| `scripts/components/navbar.js` | Botão de idioma + WhatsApp/Menu no header |
| `scripts/components/hero.js` | Troca de texto PT/EN no hero |
| `scripts/utils/i18n.js` | Traduções mínimas do hero (novo arquivo) |

## Como aplicar

Opção A — copie a pasta `recife_flats_temporada` deste workspace para o seu PC.

Opção B — no GitHub, edite os 6 arquivos acima manualmente.

## Pasta do vídeo

```
assets/videos/video.mp4   ✅ (com "s" em videos)
```

Não é `assets/video/` (singular).
