/**
 * <rf-info-page> — Página informativa/legal a partir de site-policies.js
 *
 * Uso: <rf-info-page slug="caucao"></rf-info-page>
 */

import { getPolicy } from '../data/site-policies.js';
import { getInfoPage, infoPageUrl, pageHref } from '../data/site-structure.js';

function renderSection(section) {
  const paragraphs = (section.paragraphs || [])
    .map((p) => `<p>${p}</p>`)
    .join('');
  const list = section.items?.length
    ? `<ul class="info-page__list">${section.items.map((i) => `<li>${i}</li>`).join('')}</ul>`
    : '';

  return `
    <section class="info-page__section">
      <h2>${section.title}</h2>
      ${paragraphs}
      ${list}
    </section>
  `;
}

class RFInfoPage extends HTMLElement {
  connectedCallback() {
    const slug = this.getAttribute('slug');
    const policy = getPolicy(slug);

    if (!policy) {
      this.innerHTML = `
        <section class="info-page info-page--error">
          <div class="container">
            <h1>Página não encontrada</h1>
            <p><a href="${pageHref('./informacoes/index.html')}" class="btn btn--primary">Ver informações</a></p>
          </div>
        </section>`;
      return;
    }

    document.title = `${policy.title} — Recife Flats Temporada`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = policy.metaDescription;

    const sections = policy.sections.map(renderSection).join('');
    const related = (policy.related || [])
      .map((rel) => getInfoPage(rel))
      .filter(Boolean)
      .map((p) => `<a href="${infoPageUrl(p.slug)}" class="info-page__related-link">${p.label}</a>`)
      .join('');

    this.innerHTML = `
      <article class="info-page">
        <header class="info-page__hero">
          <div class="container info-page__hero-inner">
            <span class="eyebrow eyebrow--pill">${policy.eyebrow}</span>
            <h1>${policy.title}</h1>
            <p class="info-page__lead">${policy.lead}</p>
            <p class="info-page__updated">Atualizado em ${formatDate(policy.updatedAt)}</p>
          </div>
        </header>
        <div class="container info-page__body">
          ${sections}
          ${related ? `
            <aside class="info-page__related" aria-label="Páginas relacionadas">
              <h2>Veja também</h2>
              <div class="info-page__related-links">${related}</div>
            </aside>
          ` : ''}
        </div>
      </article>
    `;
  }
}

/** @param {string} iso */
function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

customElements.define('rf-info-page', RFInfoPage);
