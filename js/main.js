/**
 * Scripts do projeto
 */

document.addEventListener('DOMContentLoaded', function () {
  document.documentElement.classList.add('is-ready');

  var video = document.querySelector('.hero-video__media');
  if (!video) return;

  function avisar(mensagem) {
    console.warn('[Recife Flats]', mensagem);
    video.setAttribute('data-erro', '1');
  }

  video.addEventListener('error', function () {
    avisar(
      'Vídeo não encontrado em assets/video/hero.mp4 — ' +
      'confira se o arquivo foi commitado no GitHub (branch cursor/organize-template-structure-7ac6).'
    );
  });

  // Alguns navegadores só disparam erro no <source>
  var source = video.querySelector('source');
  if (source) {
    source.addEventListener('error', function () {
      avisar('Falha ao carregar: ' + source.getAttribute('src'));
    });
  }
});
