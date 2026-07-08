# CORREÇÃO URGENTE — vídeo não funciona à noite

## O problema (confirmado no site ao vivo)

Agora em Recife é **madrugada** → o site entra em modo **noite**.

Ele tenta carregar:
```
assets/videos/0624-otimizado-night.mp4
```

Esse arquivo **NÃO EXISTE** no GitHub (erro 404).

Por isso não funciona nem em aba anônima — não é cache, é arquivo errado.

---

## Correção em 2 minutos (no GitHub)

### 1. Abra este arquivo no GitHub:
`recife_flats_temporada` → `data` → `hero` → `home` → **`night.json`**

### 2. Troque a linha do vídeo para:
```json
"video": "./assets/videos/video.mp4"
```

### 3. Abra **`index.html`** e troque:
```html
video-night="./assets/videos/video.mp4"
```

### 4. Commit → aguarde 1–2 min → **Ctrl+F5**

---

## Site publicado
https://vanessenceweb.github.io/recife_flats_temporada/

## Não abra pelo Explorer
Este projeto usa JavaScript modular (`type="module"`).  
Duplo clique no `index.html` **não funciona**. Use o link acima ou `iniciar.bat`.

---

## Arquivos corrigidos prontos
Na pasta `recife_flats-fixes/` deste repositório (branch `cursor/organize-template-structure-7ac6`).
