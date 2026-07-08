# Coloque seu vídeo aqui

Exemplo: `meu-video.mp4`

## Regras importantes

1. **Formato:** `.mp4` com codec H.264 (o mais compatível)
2. **Não use** `.mov` direto do iPhone — converta antes
3. **Caminho no HTML:** `videos/nome-do-arquivo.mp4`
4. **O vídeo precisa estar NESTA pasta**, não na Área de Trabalho

## Onde trocar no código

Só no `index.html` (ou `componentes/hero-video.html`):

```html
<source src="videos/meu-video.mp4" type="video/mp4" />
```

## Se não aparecer

- Confira se o nome do arquivo está **igual** (maiúsculas contam: `Video.mp4` ≠ `video.mp4`)
- Abra o DevTools (F12) → aba **Console** — veja se dá erro 404
- Teste com `iniciar.bat` ou `python -m http.server 3000`
- Vídeo muito pesado (>50MB) pode demorar para carregar
