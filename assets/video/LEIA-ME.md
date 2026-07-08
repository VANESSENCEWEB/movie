# Vídeo do hero

Caminho no site: `assets/video/hero.mp4`

## Subir pelo GitHub (navegador)

1. Abra esta pasta no GitHub:
   `movie` → branch **`cursor/organize-template-structure-7ac6`** → pasta **`assets/video`**
2. Clique em **Add file** → **Upload files**
3. Arraste o `.mp4` e renomeie para **`hero.mp4`** (se precisar)
4. Clique em **Commit changes** e aguarde terminar

## Se não aparecer no site

| Problema | Solução |
|---|---|
| Arquivo **maior que 50 MB** | GitHub pode recusar. Comprima o vídeo ou use [Git LFS](https://git-lfs.github.com/) |
| Nome diferente de `hero.mp4` | Troque o `src` no `index.html` |
| Subiu na branch **`main`** | O site usa a branch `cursor/organize-template-structure-7ac6` — suba na mesma branch |
| Só aparece `LEIA-ME.md` | O vídeo **não foi commitado** — repita o upload e confirme o commit |

## Conferir se subiu

Na pasta `assets/video` no GitHub deve aparecer **dois arquivos**:
- `LEIA-ME.md`
- `hero.mp4` (ou o nome do seu vídeo)
