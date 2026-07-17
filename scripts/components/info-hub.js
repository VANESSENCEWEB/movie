/**
 * <rf-info-hub> — Índice das páginas informativas e legais
 */

import { INFO_PAGES, infoPageUrl, pageHref } from '../data/site-structure.js';
import { whatsappUrl } from '../data/location.js';

const CATEGORY_LABELS = {
  reserva: 'Reserva e estadia',
  legal: 'Legal e privacidade',
};

class RFInfoHub extends HTMLElement {
  connectedCallback() {
    const byCategory = { reserva: [], legal: [] };
    Object.values(INFO_PAGES).forEach((page) => {
      byCategory[page.category]?.push(page);
    });

    const columns = Object.entries(byCategory)
      .filter(([, pages]) => pages.length)
      .map(([cat, pages]) => `
        <div class="info-hub__col">
          <h2>${CATEGORY_LABELS[cat]}</h2>
          <ul class="info-hub__list">
            ${pages.map((p) => `
              <li>
                <a href="${infoPageUrl(p.slug)}" class="info-hub__card">
                  <strong>${p.label}</strong>
                  <span>${p.description}</span>
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      `).join('');

    this.innerHTML = `
      <article class="info-hub">
        <header class="info-hub__hero">
          <div class="container info-hub__hero-inner">
            <span class="eyebrow eyebrow--pill">Transparência</span>
            <h1>Informações para sua <em class="display-italic">estadia</em></h1>
            <p class="info-hub__lead">
              Políticas claras sobre caução, cancelamento, check-in, privacidade e termos.
              Tudo o que um site de hospedagem de qualidade precisa ter — em linguagem direta.
            </p>
          </div>
        </header>
        <div class="container info-hub__grid">${columns}</div>
        <div class="container info-hub__cta">
          <p>Ainda com dúvidas? Fale conosco pelo WhatsApp.</p>
          <a href="${whatsappUrl('Olá! Tenho uma dúvida sobre as políticas de hospedagem.')}" class="btn btn--primary btn--lg" target="_blank" rel="noopener noreferrer">
            Abrir WhatsApp
          </a>
          <a href="${pageHref('./index.html#faq')}" class="btn btn--secondary btn--lg">Ver perguntas frequentes</a>
        </div>
      </article>
    `;
  }
}

customElements.define('rf-info-hub', RFInfoHub);
