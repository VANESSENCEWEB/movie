/**
 * <rf-blog-post> — Artigo do blog
 * Uso: <rf-blog-post slug="guia-boa-viagem-temporada"></rf-blog-post>
 */

import { getBlogPost } from '../data/site-blog.js';
import { pageHref, BLOG_HUB_URL, APARTMENTS_HUB_URL } from '../data/site-structure.js';

function renderSection(section) {
  const paragraphs = section.paragraphs.map((p) => `<p>${p}</p>`).join('');
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

class RFBlogPost extends HTMLElement {
  connectedCallback() {
    const slug = this.getAttribute('slug');
    const post = getBlogPost(slug);

    if (!post) {
      this.innerHTML = `
        <section class="article-page article-page--error">
          <div class="container">
            <h1>Artigo não encontrado</h1>
            <p><a href="${pageHref(BLOG_HUB_URL)}" class="btn btn--primary">Voltar ao blog</a></p>
          </div>
        </section>`;
      return;
    }

    document.title = `${post.title} — Blog Recife Flats`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = post.metaDescription;

    this.dispatchEvent(new CustomEvent('rf-blog-post-loaded', {
      bubbles: true,
      detail: { title: post.title, slug: post.slug },
    }));

    const sections = post.sections.map(renderSection).join('');

    this.innerHTML = `
      <article class="article-page article-page--blog">
        <header class="article-page__hero">
          <div class="container article-page__hero-inner">
            <span class="blog-post__category">${post.category}</span>
            <h1>${post.title}</h1>
            <p class="article-page__lead">${post.excerpt}</p>
            <p class="article-page__meta">
              <time datetime="${post.publishedAt}">${formatDate(post.publishedAt)}</time>
              · ${post.readMinutes} min · ${post.author}
            </p>
          </div>
        </header>
        <div class="container article-page__body">
          ${sections}
          <footer class="blog-post__footer">
            <a href="${pageHref(BLOG_HUB_URL)}" class="btn btn--secondary">← Voltar ao blog</a>
            <a href="${pageHref(APARTMENTS_HUB_URL)}" class="btn btn--primary">Ver apartamentos</a>
          </footer>
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

customElements.define('rf-blog-post', RFBlogPost);
