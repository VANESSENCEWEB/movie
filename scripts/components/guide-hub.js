/**
 * <rf-guide-hub> — Índice "Conheça Recife"
 */

import { RECIFE_PAGES, RECIFE_HUB_URL, APARTMENTS_HUB_URL, pageHref, recifePageUrl } from '../data/site-structure.js';

class RFGuideHub extends HTMLElement {
  connectedCallback() {
    const guias = Object.values(RECIFE_PAGES).filter((p) => p.category === 'guia');
    const bairros = Object.values(RECIFE_PAGES).filter((p) => p.category === 'bairro');

    const guiaCards = guias.map((p) => `
      <li>
        <a href="${recifePageUrl(p.slug)}" class="hub-card">
          <strong>${p.label}</strong>
          <span>${p.description}</span>
        </a>
      </li>
    `).join('');

    const bairroCards = bairros.map((p) => `
      <li>
        <a href="${pageHref(p.pageUrl)}" class="hub-card hub-card--bairro">
          <strong>${p.label}</strong>
          <span>${p.description}</span>
        </a>
      </li>
    `).join('');

    this.innerHTML = `
      <article class="content-hub content-hub--recife">
        <header class="content-hub__hero">
          <div class="container content-hub__hero-inner">
            <span class="eyebrow eyebrow--pill">Destino</span>
            <h1>Conheça <em class="display-italic">Recife</em></h1>
            <p class="content-hub__lead">
              Praias, gastronomia, dicas locais e roteiros — tudo para aproveitar sua temporada
              em Boa Viagem e Pina com quem conhece a cidade.
            </p>
          </div>
        </header>
        <div class="container content-hub__grid">
          <section class="content-hub__col" aria-labelledby="guias-heading">
            <h2 id="guias-heading">Guias e dicas</h2>
            <ul class="content-hub__list">${guiaCards}</ul>
          </section>
          <section class="content-hub__col" aria-labelledby="bairros-heading">
            <h2 id="bairros-heading">Nossos bairros</h2>
            <ul class="content-hub__list">${bairroCards}</ul>
          </section>
        </div>
        <div class="container content-hub__footer">
          <a href="${pageHref('./blog/index.html')}" class="btn btn--secondary">Ler no blog</a>
          <a href="${pageHref(APARTMENTS_HUB_URL)}" class="btn btn--primary">Ver apartamentos</a>
        </div>
      </article>
    `;
  }
}

customElements.define('rf-guide-hub', RFGuideHub);
