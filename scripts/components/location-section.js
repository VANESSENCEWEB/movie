/**
 * <rf-location-section> — Localização estilo Google Business Profile
 * Mapa incorporado, rotas, Waze, pontos de referência e avaliações.
 */

import {
  BUSINESS,
  MAPS_EMBED_URL,
  MAPS_LINKS,
  WAZE_EMBED_URL,
  WAZE_QR_URL,
  ROUTE_REFERENCES,
  LOCATION_BENEFITS,
} from '../data/location.js';
import { loadReviews, renderStars } from '../utils/google-reviews.js';
import { prefersReducedMotion } from '../utils/dom.js';

const ROUTE_ICONS = {
  bus: '<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19"/><path d="M18 18h3v3h-3a4 4 0 0 1-8 0H8a4 4 0 0 1-8 0H1v-3h3l1.5-6H20l1.5 6h2v3h-3a4 4 0 0 1-3 3"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  landmark: '<path d="M12 2 2 22h20L12 2Z"/><path d="M12 16v4"/><path d="M10 20h4"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H8l3 1 4 5 1-1-3-4 4.5-2.5c.4-.2.5-.7.3-1.2l-.5-.3c-.4-.2-.9-.2-1.3 0Z"/>',
};

function svgIcon(name) {
  const path = ROUTE_ICONS[name] || ROUTE_ICONS.landmark;
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

function benefitCard(benefit) {
  const items = benefit.items.map((item) => `<li>${item}</li>`).join('');
  return `
    <article class="location-benefit" data-location-reveal>
      <h3 class="location-benefit__title">${benefit.title}</h3>
      <p class="location-benefit__desc">${benefit.description}</p>
      <ul class="location-benefit__list">${items}</ul>
    </article>
  `;
}

function routeCard(route) {
  return `
    <li class="location-route">
      <div class="location-route__info">
        <span class="location-route__icon">${svgIcon(route.icon)}</span>
        <div>
          <strong class="location-route__label">${route.label}</strong>
          <span class="location-route__meta">${route.meta}</span>
        </div>
      </div>
      <a href="${route.mapsUrl}" class="location-route__btn" target="_blank" rel="noopener noreferrer">
        Ver rota
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>
      </a>
    </li>
  `;
}

function reviewCard(review) {
  const authorLink = review.authorUri
    ? `<a href="${review.authorUri}" target="_blank" rel="noopener noreferrer" class="location-review__author">${review.author}</a>`
    : `<span class="location-review__author">${review.author}</span>`;

  return `
    <blockquote class="location-review" data-location-reveal>
      <div class="location-review__stars" aria-label="Nota ${review.rating} de 5">
        ${renderStars(review.rating)}
      </div>
      <p class="location-review__text">"${review.text}"</p>
      <footer class="location-review__footer">
        ${authorLink}
        ${review.relativeTime ? `<span class="location-review__time">${review.relativeTime}</span>` : ''}
      </footer>
    </blockquote>
  `;
}

function buildJsonLd(rating, reviewCount) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: BUSINESS.name,
    url: BUSINESS.website,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.state,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.lat,
      longitude: BUSINESS.lng,
    },
    areaServed: ['Boa Viagem', 'Pina', 'Recife'],
  };

  if (rating && reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount,
      bestRating: 5,
    };
  }

  return JSON.stringify(schema);
}

class RFLocationSection extends HTMLElement {
  connectedCallback() {
    const benefits = LOCATION_BENEFITS.map(benefitCard).join('');
    const routes = ROUTE_REFERENCES.map(routeCard).join('');
    const fullAddress = `${BUSINESS.streetAddress} — ${BUSINESS.neighborhood}, ${BUSINESS.city} - ${BUSINESS.state}, ${BUSINESS.postalCode}`;

    this.innerHTML = `
      <section class="location-section" id="localizacao" aria-labelledby="location-heading">
        <div class="container location-section__inner">

          <header class="location-section__header" data-location-reveal>
            <span class="eyebrow eyebrow--pill">Recife bem localizado</span>
            <h2 class="location-section__title" id="location-heading">
              Perto da praia, shopping, aeroporto e da <em class="display-italic">vida real</em>
            </h2>
            <p class="location-section__lead">
              Nossos imóveis concentram-se em Boa Viagem e Pina — regiões práticas para lazer,
              trabalho, compras e deslocamento rápido em Recife.
            </p>
          </header>

          <div class="location-gbp" data-location-reveal>

            <aside class="location-gbp__sidebar">
              <div class="location-gbp__card">
                <div class="location-gbp__card-head">
                  <div class="location-gbp__logo" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 21h18"/><path d="M5 21V9l7-4 7 4v12"/><path d="M9 21v-6h6v6"/></svg>
                  </div>
                  <div>
                    <h3 class="location-gbp__name">${BUSINESS.name}</h3>
                    <p class="location-gbp__category">${BUSINESS.category} · ${BUSINESS.neighborhood}</p>
                  </div>
                </div>

                <div class="location-rating location-gbp__rating" data-rating-summary aria-live="polite">
                  <span class="location-rating__value" data-rating-value>—</span>
                  <div class="location-stars" data-rating-stars aria-hidden="true"></div>
                  <span class="location-gbp__rating-meta" data-rating-count>Google Business</span>
                </div>

                <address class="location-gbp__address">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
                  <span>${fullAddress}</span>
                </address>

                <div class="location-gbp__actions">
                  <a href="${MAPS_LINKS.directions}" class="location-gbp__action location-gbp__action--primary" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                    Como chegar
                  </a>
                  <a href="${MAPS_LINKS.place}" class="location-gbp__action" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                    Abrir no Google Maps
                  </a>
                  <a href="${MAPS_LINKS.waze}" class="location-gbp__action location-gbp__action--waze" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm-2.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
                    Abrir no Waze
                  </a>
                  <a href="${MAPS_LINKS.reviews}" class="location-gbp__action" target="_blank" rel="noopener noreferrer" data-reviews-link>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8-5-4.9 6.9-1L12 2Z"/></svg>
                    Avaliações
                  </a>
                </div>
              </div>

              <div class="location-gbp__routes">
                <h4 class="location-gbp__routes-title">Rotas a partir de</h4>
                <ul class="location-gbp__routes-list">${routes}</ul>
              </div>

              <div class="location-gbp__waze-qr">
                <img src="${WAZE_QR_URL}" width="140" height="140" alt="QR Code para abrir ${BUSINESS.name} no Waze" loading="lazy">
                <div>
                  <strong>QR Code Waze</strong>
                  <p>Escaneie para traçar rota até o endereço no app Waze.</p>
                  <a href="${MAPS_LINKS.waze}" target="_blank" rel="noopener noreferrer">Abrir no Waze</a>
                </div>
              </div>

              <div class="location-gbp__reviews">
                <div class="location-reviews-header">
                  <h4 class="location-gbp__reviews-title">Avaliações recentes</h4>
                  <a href="${MAPS_LINKS.reviews}" class="location-reviews-link" target="_blank" rel="noopener noreferrer" data-reviews-link-secondary>
                    Ver todas
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>
                  </a>
                </div>
                <div class="location-reviews-list" data-reviews-list role="list">
                  <p class="location-reviews-placeholder" data-reviews-placeholder>
                    Carregando avaliações do Google Business…
                  </p>
                </div>
              </div>
            </aside>

            <div class="location-gbp__map-col">
              <div class="location-gbp__map-tabs" role="tablist" aria-label="Escolher mapa">
                <button type="button" class="location-gbp__map-tab is-active" role="tab" aria-selected="true" aria-controls="location-map-google" data-map-tab="google" id="tab-map-google">
                  Google Maps
                </button>
                <button type="button" class="location-gbp__map-tab" role="tab" aria-selected="false" aria-controls="location-map-waze" data-map-tab="waze" id="tab-map-waze">
                  Waze
                </button>
              </div>

              <div class="location-gbp__map-frame">
                <iframe
                  id="location-map-google"
                  class="location-gbp__iframe is-active"
                  data-map-panel="google"
                  src="${MAPS_EMBED_URL}"
                  title="Mapa Google — ${BUSINESS.name}"
                  loading="lazy"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
                <iframe
                  id="location-map-waze"
                  class="location-gbp__iframe"
                  data-map-panel="waze"
                  data-src="${WAZE_EMBED_URL}"
                  title="Mapa Waze — ${BUSINESS.name}"
                  loading="lazy"
                  allowfullscreen
                  hidden
                ></iframe>
              </div>

              <p class="location-gbp__map-note">
                <a href="${MAPS_LINKS.profile}" target="_blank" rel="noopener noreferrer">Ver perfil completo no Google Business</a>
                · Endereço verificado em Boa Viagem, Recife
              </p>
            </div>

          </div>

          <div class="location-benefits" data-location-reveal>${benefits}</div>
        </div>
        <script type="application/ld+json" data-location-schema></script>
      </section>
    `;

    this._initMapTabs();
    this._loadReviews();
    this._animate();
  }

  _initMapTabs() {
    const tabs = [...this.querySelectorAll('[data-map-tab]')];
    const panels = [...this.querySelectorAll('[data-map-panel]')];

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.mapTab;
        tabs.forEach((t) => {
          const active = t.dataset.mapTab === target;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', String(active));
        });
        panels.forEach((panel) => {
          const show = panel.dataset.mapPanel === target;
          panel.classList.toggle('is-active', show);
          panel.hidden = !show;
          if (show && panel.dataset.src && !panel.src) {
            panel.src = panel.dataset.src;
          }
        });
      });
    });
  }

  async _loadReviews() {
    const data = await loadReviews();

    const valueEl = this.querySelector('[data-rating-value]');
    const starsEl = this.querySelector('[data-rating-stars]');
    const countEl = this.querySelector('[data-rating-count]');
    const listEl = this.querySelector('[data-reviews-list]');
    const placeholder = this.querySelector('[data-reviews-placeholder]');
    const linkEl = this.querySelector('[data-reviews-link]');
    const linkSecondary = this.querySelector('[data-reviews-link-secondary]');
    const schemaEl = this.querySelector('[data-location-schema]');

    const rating = data.rating ?? 4.9;
    const count = data.userRatingCount ?? 0;

    if (valueEl) valueEl.textContent = rating.toFixed(1);
    if (starsEl) {
      starsEl.innerHTML = renderStars(rating);
      starsEl.setAttribute('aria-label', `Nota média ${rating} de 5`);
    }
    if (countEl) {
      countEl.textContent = count
        ? `${count} avaliações no Google`
        : 'Avaliações no Google Business';
    }

    const reviewsUrl = data.googleMapsUri || MAPS_LINKS.reviews;
    if (linkEl) linkEl.href = reviewsUrl;
    if (linkSecondary) linkSecondary.href = reviewsUrl;

    if (schemaEl) {
      schemaEl.textContent = buildJsonLd(rating, count);
    }

    if (!listEl) return;

    if (data.reviews?.length) {
      placeholder?.remove();
      listEl.innerHTML = data.reviews.map(reviewCard).join('');
      listEl.setAttribute('aria-label', 'Avaliações de hóspedes no Google');
    } else if (placeholder) {
      placeholder.innerHTML = data.live
        ? `Nenhuma avaliação com texto no momento. <a href="${reviewsUrl}" target="_blank" rel="noopener noreferrer">Veja no Google Maps</a>.`
        : `Nota <strong>${rating}</strong> no Google — <a href="${reviewsUrl}" target="_blank" rel="noopener noreferrer">leia as avaliações</a>.`;
    }
  }

  _animate() {
    if (prefersReducedMotion() || !window.gsap) return;

    this.querySelectorAll('[data-location-reveal]').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: 'power2.out',
        delay: i * 0.03,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
  }
}

customElements.define('rf-location-section', RFLocationSection);
