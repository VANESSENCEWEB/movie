/**
 * <rf-bio-page> — Landing /bio para Instagram (estilo HostBio).
 */

import { APARTAMENTOS, resolveImages, FALLBACK_IMAGE } from '../data/apartamentos.js';
import { apartmentUrl } from '../data/site-structure.js';
import { BUSINESS, MAPS_LINKS } from '../data/location.js';
import { assetUrl } from '../utils/paths.js';

const TESTIMONIALS = [
  {
    initials: 'MR',
    name: 'Mariana R.',
    meta: 'São Paulo · 7 noites',
    quote: 'Apartamento idêntico às fotos, pertinho da praia. Atendimento impecável do check-in ao check-out.',
  },
  {
    initials: 'CP',
    name: 'Caio P.',
    meta: 'Brasília · 5 noites',
    quote: 'Flat Golden View perfeito para o casal. Resposta rápida no WhatsApp e tudo muito limpo.',
  },
  {
    initials: 'FL',
    name: 'Família Lopes',
    meta: 'Porto Alegre · 10 noites',
    quote: 'Apt espaçoso para a família, bem localizado em Boa Viagem. Voltaremos com certeza.',
  },
];

function shortName(apt) {
  if (apt.building) {
    const part = apt.building.split('·')[0].trim().toUpperCase();
    const num = apt.building.match(/Apt\s*(\d+)/i);
    return num ? `${part.split(' ').pop()} ${num[1]}` : part;
  }
  return apt.name.split(' ').slice(0, 2).join(' ').toUpperCase();
}

function bedLabel(apt) {
  if (apt.bedrooms >= 2) return `${apt.bedrooms} quartos · até ${apt.guests} hóspedes`;
  if (apt.beds > 1) return `1 quarto + sofá-cama · até ${apt.guests} hóspedes`;
  return `1 quarto · até ${apt.guests} hóspedes`;
}

function priceHtml(apt) {
  if (apt.priceFrom) {
    return `<p class="bio-card__price">A partir de <strong>${apt.priceFrom}</strong>${apt.priceNote}</p>`;
  }
  return `<p class="bio-card__price bio-card__price--consult">${apt.priceNote}</p>`;
}

function apartmentCard(apt) {
  const images = resolveImages(apt);
  const cover = images[0];
  const src = cover.src || assetUrl(FALLBACK_IMAGE);
  const fallback = cover.placeholder || assetUrl(FALLBACK_IMAGE);
  const href = apartmentUrl(apt.slug);
  const dots = images.length > 1
    ? `<div class="bio-card__dots" aria-hidden="true">${images.slice(0, 5).map((_, i) => `<span class="${i === 0 ? 'is-active' : ''}"></span>`).join('')}</div>`
    : '';

  return `
    <article class="bio-card" data-bio-card data-slug="${apt.slug}">
      <div class="bio-card__media" data-bio-carousel>
        <img src="${src}" alt="${cover.alt}" loading="lazy" decoding="async"
             data-bio-img data-index="0"
             onerror="this.onerror=null;this.src='${fallback}'">
        ${apt.badge ? `<span class="bio-card__badge">${apt.badge}</span>` : ''}
        ${dots}
        ${images.length > 1 ? `
          <button type="button" class="bio-card__nav bio-card__nav--prev" data-bio-prev aria-label="Foto anterior">‹</button>
          <button type="button" class="bio-card__nav bio-card__nav--next" data-bio-next aria-label="Próxima foto">›</button>
        ` : ''}
      </div>
      <div class="bio-card__body">
        <h3 class="bio-card__name">${shortName(apt)}</h3>
        <p class="bio-card__tagline">${apt.tagline}</p>
        <a href="${href}" class="bio-card__more">Ver mais</a>
        ${priceHtml(apt)}
        <p class="bio-card__beds">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M3 7v11M3 7h18v11M3 7l2-4h14l2 4M7 11v4M17 11v4"/>
          </svg>
          ${bedLabel(apt)}
        </p>
        <button type="button" class="bio-card__reserve" data-bio-reserve="${apt.slug}">
          Reservar
        </button>
      </div>
    </article>
  `;
}

class RFBioPage extends HTMLElement {
  connectedCallback() {
    const cards = APARTAMENTOS.map(apartmentCard).join('');
    const testimonial = TESTIMONIALS[0];

    this.innerHTML = `
      <div class="bio">
        <header class="bio__topbar">
          <a href="./index.html" class="bio__logo" aria-label="Recife Flats — Início">
            <span class="bio__logo-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="8" width="7" height="10" rx="1" fill="white" fill-opacity="0.95"/>
                <rect x="11" y="5" width="7" height="13" rx="1" fill="white" fill-opacity="0.75"/>
              </svg>
            </span>
            <span class="bio__logo-text">
              <span>Recife Flats</span>
              <small>Temporada</small>
            </span>
          </a>
          <a href="./index.html" class="bio__visit-site">Visitar site</a>
        </header>

        <section class="bio__hero" id="destaque">
          <video class="bio__hero-video" autoplay muted loop playsinline preload="metadata"
                 poster="${assetUrl('./assets/images/boa_viagem-01.avif.png')}" aria-hidden="true">
            <source src="${assetUrl('./assets/videos/video.mp4')}" type="video/mp4">
          </video>
          <div class="bio__hero-overlay"></div>
          <div class="bio__hero-content">
            <p class="bio__hero-eyebrow">Boa Viagem & Pina · Recife</p>
            <h1 class="bio__hero-title">Recife Flats<br><em>Temporada</em></h1>
            <p class="bio__hero-tagline">Um lugar de verdade pra ficar em Recife — reserva direta, sem taxa.</p>
            <p class="bio__hero-scroll" aria-hidden="true">Arraste para cima ↑</p>
          </div>
        </section>

        <nav class="bio__nav" aria-label="Seções">
          <a href="#destaque" class="bio__nav-link is-active">Destaque</a>
          <a href="#quartos" class="bio__nav-link">Quartos</a>
          <a href="#depoimentos" class="bio__nav-link">Depoimentos</a>
          <a href="#mapa" class="bio__nav-link">Mapa</a>
        </nav>

        <main class="bio__main">
          <section class="bio__rooms" id="quartos" aria-labelledby="bio-rooms-title">
            <h2 class="bio__section-title" id="bio-rooms-title">Nossos apartamentos</h2>
            <div class="bio__cards">${cards}</div>
          </section>

          <section class="bio__reviews" id="depoimentos" aria-labelledby="bio-reviews-title">
            <h2 class="bio__section-title" id="bio-reviews-title">Depoimentos</h2>
            <div class="bio-review" data-bio-review>
              <div class="bio-review__stars" aria-hidden="true">★★★★★</div>
              <blockquote class="bio-review__quote" data-bio-review-quote>"${testimonial.quote}"</blockquote>
              <div class="bio-review__author">
                <span class="bio-review__avatar" data-bio-review-avatar>${testimonial.initials}</span>
                <div>
                  <strong data-bio-review-name>${testimonial.name}</strong>
                  <span data-bio-review-meta>${testimonial.meta}</span>
                </div>
              </div>
              <div class="bio-review__dots" data-bio-review-dots aria-hidden="true">
                ${TESTIMONIALS.map((_, i) => `<button type="button" class="${i === 0 ? 'is-active' : ''}" data-bio-review-dot="${i}" aria-label="Depoimento ${i + 1}"></button>`).join('')}
              </div>
            </div>
          </section>

          <section class="bio__map" id="mapa" aria-labelledby="bio-map-title">
            <h2 class="bio__section-title" id="bio-map-title">Onde estamos</h2>
            <p class="bio__map-address">${BUSINESS.streetAddress} — ${BUSINESS.neighborhood}, ${BUSINESS.city}/${BUSINESS.state}</p>
            <a href="${MAPS_LINKS.directions}" class="bio__map-btn" target="_blank" rel="noopener noreferrer">
              Abrir no Google Maps
            </a>
          </section>
        </main>

        <footer class="bio__footer">
          <p>© ${new Date().getFullYear()} Recife Flats Temporada</p>
          <a href="./index.html">Site completo</a>
        </footer>
      </div>
    `;

    this._reviewIndex = 0;
    this._cardImages = new Map();

    APARTAMENTOS.forEach((apt) => {
      this._cardImages.set(apt.slug, resolveImages(apt).map((i) => i.src));
    });

    this.addEventListener('click', (e) => this._onClick(e));
    this._initNavSpy();
  }

  _onClick(e) {
    const reserve = e.target.closest('[data-bio-reserve]');
    if (reserve) {
      window.dispatchEvent(new CustomEvent('rf-bio-booking-open', {
        detail: { slug: reserve.dataset.bioReserve },
      }));
      return;
    }

    const prev = e.target.closest('[data-bio-prev]');
    const next = e.target.closest('[data-bio-next]');
    if (prev || next) {
      const card = e.target.closest('[data-bio-card]');
      if (card) this._slideImage(card, prev ? -1 : 1);
      return;
    }

    const dot = e.target.closest('[data-bio-review-dot]');
    if (dot) {
      this._showReview(Number(dot.dataset.bioReviewDot));
    }
  }

  _slideImage(card, dir) {
    const slug = card.dataset.slug;
    const urls = this._cardImages.get(slug);
    if (!urls?.length) return;

    const img = card.querySelector('[data-bio-img]');
    let idx = Number(img.dataset.index || 0);
    idx = (idx + dir + urls.length) % urls.length;
    img.dataset.index = String(idx);
    img.src = urls[idx];

    card.querySelectorAll('.bio-card__dots span').forEach((d, i) => {
      d.classList.toggle('is-active', i === idx);
    });
  }

  _showReview(i) {
    const t = TESTIMONIALS[i];
    if (!t) return;
    this._reviewIndex = i;
    this.querySelector('[data-bio-review-quote]').textContent = `"${t.quote}"`;
    this.querySelector('[data-bio-review-avatar]').textContent = t.initials;
    this.querySelector('[data-bio-review-name]').textContent = t.name;
    this.querySelector('[data-bio-review-meta]').textContent = t.meta;
    this.querySelectorAll('[data-bio-review-dot]').forEach((d, j) => {
      d.classList.toggle('is-active', j === i);
    });
  }

  _initNavSpy() {
    const links = [...this.querySelectorAll('.bio__nav-link')];
    const sections = links.map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((l) => {
          l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`);
        });
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach((s) => obs.observe(s));
  }
}

customElements.define('rf-bio-page', RFBioPage);
