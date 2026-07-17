/**
 * <rf-blog-hub> — Listagem de posts do blog
 */

import { getAllBlogPosts } from '../data/site-blog.js';
import { pageHref, BLOG_HUB_URL } from '../data/site-structure.js';

class RFBlogHub extends HTMLElement {
  connectedCallback() {
    const posts = getAllBlogPosts();

    const cards = posts.map((post) => `
      <article class="blog-card">
        <a href="${pageHref(`./blog/${post.slug}.html`)}" class="blog-card__link">
          <span class="blog-card__category">${post.category}</span>
          <h2 class="blog-card__title">${post.title}</h2>
          <p class="blog-card__excerpt">${post.excerpt}</p>
          <footer class="blog-card__meta">
            <time datetime="${post.publishedAt}">${formatDate(post.publishedAt)}</time>
            <span>${post.readMinutes} min de leitura</span>
          </footer>
        </a>
      </article>
    `).join('');

    this.innerHTML = `
      <div class="blog-hub">
        <header class="blog-hub__hero">
          <div class="container blog-hub__hero-inner">
            <span class="eyebrow eyebrow--pill">Blog</span>
            <h1>Dicas de <em class="display-italic">temporada</em> em Recife</h1>
            <p class="blog-hub__lead">
              Roteiros, gastronomia e guias práticos para quem vem ficar em Boa Viagem e Pina.
            </p>
          </div>
        </header>
        <div class="container">
          <div class="blog-hub__grid" role="list">${cards}</div>
        </div>
        <div class="container blog-hub__cta">
          <a href="${pageHref('./conheca-recife/index.html')}" class="btn btn--secondary">Conheça Recife</a>
          <a href="${pageHref('./apartamentos.html')}" class="btn btn--primary">Ver apartamentos</a>
        </div>
      </div>
    `;
  }
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

customElements.define('rf-blog-hub', RFBlogHub);
