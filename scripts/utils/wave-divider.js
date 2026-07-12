/**
 * wave-divider.js — Divisor animado entre seções (3 camadas de onda SVG
 * em velocidades diferentes), inspirado no efeito usado em
 * https://vanessenceweb.github.io/ALIQUOTA/
 *
 * Cada camada usa DUAS cópias idênticas do mesmo path lado a lado
 * (tiling real), então o loop da animação é perfeitamente contínuo —
 * sem esticar o desenho nem "cortar" a onda no reset do loop.
 *
 * Uso:
 *   `<section style="position:relative">...${renderWaveDivider('var(--cream)')}</section>`
 */

const PATHS = {
  a: 'M0,45 C240,90 480,0 720,45 C960,90 1200,0 1440,45 L1440,90 L0,90 Z',
  b: 'M0,27 C280,81 560,9 840,40 C1120,76 1300,14 1440,36 L1440,90 L0,90 Z',
  c: 'M0,54 C200,9 450,86 720,36 C990,9 1220,76 1440,50 L1440,90 L0,90 Z',
};

function tile(path) {
  const svg = `<svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="${path}"/></svg>`;
  return svg + svg;
}

/** @param {string} color cor final da 3ª camada (a que "entrega" a próxima seção) */
export function renderWaveDivider(color = 'var(--cream)') {
  return `
    <div class="wave-divider" style="--wave-color:${color}" aria-hidden="true">
      <div class="wave-divider__layer wave-divider__layer--a">${tile(PATHS.a)}</div>
      <div class="wave-divider__layer wave-divider__layer--b">${tile(PATHS.b)}</div>
      <div class="wave-divider__layer wave-divider__layer--c">${tile(PATHS.c)}</div>
    </div>
  `;
}

const HERO_WAVE_PATHS = {
  a: 'M0,26 C200,10 400,42 600,26 C800,10 1000,42 1200,26 L1200,48 L0,48 Z',
  b: 'M0,30 C200,44 400,16 600,30 C800,44 1000,16 1200,30 L1200,48 L0,48 Z',
  c: 'M0,34 C300,18 600,40 900,34 C1050,28 1150,38 1200,34 L1200,48 L0,48 Z',
};

function tileHero(path) {
  const svg = `<svg viewBox="0 0 1200 48" preserveAspectRatio="none" aria-hidden="true"><path d="${path}"/></svg>`;
  return svg + svg;
}

/** Ondas leves no rodapé do hero — transição para a próxima seção */
export function renderHeroWaves() {
  return `
    <div class="hero__waves" aria-hidden="true">
      <div class="hero__wave-layer hero__wave-layer--1">${tileHero(HERO_WAVE_PATHS.a)}</div>
      <div class="hero__wave-layer hero__wave-layer--2">${tileHero(HERO_WAVE_PATHS.b)}</div>
      <div class="hero__wave-layer hero__wave-layer--3">${tileHero(HERO_WAVE_PATHS.c)}</div>
    </div>
  `;
}
