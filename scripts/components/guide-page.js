/**
 * <rf-guide-page> — Guia "Conheça Recife" a partir de site-recife-guides.js
 * Uso: <rf-guide-page slug="praias"></rf-guide-page>
 */

import { getRecifeGuide } from '../data/site-recife-guides.js';
import { getRecifePage, recifePageUrl, pageHref, RECIFE_HUB_URL } from '../data/site-structure.js';

function renderSection(section) {
  const paragraphs = (section.paragraphs || []).map((p) => `<p>${p}</p>`).join('');
  const list = section.items?.length
    ? `<ul class="article-page__list">${section.items.map((i) => `<li>${i}</li>`).join('')}</ul>`
    : '';
  return `
    <section class="article-page__section">
      ${section.title ? `<h2>${section.title}</h2>` : ''}
      ${paragraphs}
      ${list}
    </section>
  `;
}

class RFGuidePage extends HTMLElement {
  connectedCallback() {
    const slug = this.getAttribute('slug');
    const guide = getRecifeGuide(slug);

    if (!guide) {
      this.innerHTML = `
        <section class="article-page article-page--error">
          <div class="container">
            <h1>Guia não encontrado</h1>
            <p><a href="${pageHref(RECIFE_HUB_URL)}" class="btn btn--primary">Conheça Recife</a></p>
          </div>
        </section>`;
      return;
    }

    document.title = `${guide.title} — Recife Flats Temporada`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = guide.metaDescription;

    const sections = guide.sections.map(renderSection).join('');
    const related = (guide.related || [])
      .map((rel) => getRecifePage(rel))
      .filter(Boolean)
      .map((p) => `<a href="${recifePageUrl(p.slug)}" class="article-page__related-link">${p.label}</a>`)
      .join('');

    this.innerHTML = `
      <article class="article-page">
        <header class="article-page__hero">
          <div class="container article-page__hero-inner">
            <span class="eyebrow eyebrow--pill">${guide.eyebrow}</span>
            <h1>${guide.title}</h1>
            <p class="article-page__lead">${guide.lead}</p>
            <p class="article-page__meta">Atualizado em ${formatDate(guide.updatedAt)}</p>
          </div>
        </header>
        <div class="container article-page__body">
          ${sections}
          ${related ? `
            <aside class="article-page__related" aria-label="Guias relacionados">
              <h2>Veja também</h2>
              <div class="article-page__related-links">${related}</div>
            </aside>
          ` : ''}
        </div>
      </article>
    `;
  }
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return iso;
  }
}

customElements.define('rf-guide-page', RFGuidePage);
