/**
 * <rf-breadcrumbs> — Navegação hierárquica para SEO e usabilidade.
 * Inclui JSON-LD BreadcrumbList para rich results no Google.
 *
 * Uso:
 *   <rf-breadcrumbs context="apartments"></rf-breadcrumbs>
 *   <rf-breadcrumbs context="neighborhood" slug="boa-viagem"></rf-breadcrumbs>
 *   <rf-breadcrumbs context="apartment" slug="flat-golden-view-1006"></rf-breadcrumbs>
 */

import { getBreadcrumbs, pageHref } from '../data/site-structure.js';
import { absolutePageUrl } from '../utils/paths.js';
import { getBlogPost } from '../data/site-blog.js';

function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => {
      const item = {
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.label,
      };
      if (crumb.href && !crumb.current) {
        item.item = absolutePageUrl(crumb.href);
      }
      return item;
    }),
  };
}

class RFBreadcrumbs extends HTMLElement {
  connectedCallback() {
    const context = this.getAttribute('context') || 'apartments';
    const slug    = this.getAttribute('slug') || '';
    const label   = this.getAttribute('label')
      || (context === 'blog-post' && slug ? getBlogPost(slug)?.title : '')
      || '';
    const crumbs  = getBreadcrumbs(context, { slug, label });

    const items = crumbs.map((crumb, i) => {
      const isLast = crumb.current || i === crumbs.length - 1;
      if (isLast || !crumb.href) {
        return `<li class="breadcrumbs__item" aria-current="page"><span>${crumb.label}</span></li>`;
      }
      return `<li class="breadcrumbs__item"><a href="${pageHref(crumb.href)}">${crumb.label}</a></li>`;
    }).join('');

    const schemaId = 'rf-breadcrumb-schema';
    let schemaEl = document.getElementById(schemaId);
    if (!schemaEl) {
      schemaEl = document.createElement('script');
      schemaEl.id = schemaId;
      schemaEl.type = 'application/ld+json';
      document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify(breadcrumbSchema(crumbs));

    this.innerHTML = `
      <nav class="breadcrumbs" aria-label="Navegação estrutural">
        <ol class="breadcrumbs__list">${items}</ol>
      </nav>
    `;
  }
}

customElements.define('rf-breadcrumbs', RFBreadcrumbs);
