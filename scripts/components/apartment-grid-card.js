/**
 * <rf-apartment-grid-card> — Card compacto para grids (hub e home).
 * Galeria de fotos com autoplay, link Google Maps e chips de comodidades.
 *
 * Uso: <rf-apartment-grid-card slug="flat-golden-view-1006"></rf-apartment-grid-card>
 */

import {
  getApartmentBySlug,
  resolveImages,
  FALLBACK_IMAGE,
  apartmentMapsUrl,
  excerptText,
} from '../data/apartamentos.js';
import { apartmentUrl } from '../data/site-structure.js';
import { prefersReducedMotion } from '../utils/dom.js';

const PHOTO_INTERVAL_MS = 3000;
const MAX_GALLERY_IMAGES = 8;

const PIN_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/></svg>';

const HEART_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 20.5l-1.1-1C5.5 14.2 2 11.1 2 7.2 2 4.4 4.2 2.2 7 2.2c1.7 0 3.3.8 4.3 2.1C12.3 3 13.9 2.2 15.6 2.2 18.4 2.2 20.6 4.4 20.6 7.2c0 3.9-3.5 7-8.9 12.3L12 20.5z"/></svg>';

/** @param {import('../data/apartamentos.js').Apartment} apt */
function buildChips(apt) {
  const chips = apt.amenities.slice(0, 4);
  return chips.map((item) => `<li class="apt-grid-card__chip">${item}</li>`).join('');
}

/** @param {import('../data/apartamentos.js').Apartment} apt */
function ratingLabel(apt) {
  if (apt.reviewCount) {
    return `${apt.rating.toFixed(1)} (${apt.reviewCount} avaliações)`;
  }
  return `${apt.rating.toFixed(1)} (Google)`;
}

class RFApartmentGridCard extends HTMLElement {
  /** @type {ReturnType<typeof setInterval> | null} */
  _photoTimer = null;

  /** @type {string[]} */
  _imageUrls = [];

  /** @type {number} */
  _photoIndex = 0;

  connectedCallback() {
    const slug = this.getAttribute('slug');
    const apt = getApartmentBySlug(slug);

    if (!apt) {
      this.innerHTML = '';
      return;
    }

    const images = resolveImages(apt).slice(0, MAX_GALLERY_IMAGES);
    this._imageUrls = images.map((img) => img.src);
    const cover = images[0];
    const fallback = cover.placeholder || FALLBACK_IMAGE;
    const href = apartmentUrl(apt.slug);
    const mapsUrl = apartmentMapsUrl(apt);
    const hasGallery = images.length > 1;

    const price = apt.priceFrom
      ? `<div class="apt-grid-card__price"><span class="apt-grid-card__price-label">a partir de:</span> <strong>${apt.priceFrom}</strong><span class="apt-grid-card__price-note">${apt.priceNote}</span></div>`
      : `<div class="apt-grid-card__price apt-grid-card__price--consult"><span class="apt-grid-card__price-label">consulte:</span> <strong>${apt.priceNote}</strong></div>`;

    const dots = hasGallery
      ? `<div class="apt-grid-card__dots" aria-hidden="true">${images.map((_, i) => `<span class="${i === 0 ? 'is-active' : ''}" data-apt-gallery-dot="${i}"></span>`).join('')}</div>`
      : '';

    const galleryNav = hasGallery
      ? `
        <button type="button" class="apt-grid-card__gallery-nav apt-grid-card__gallery-nav--prev" data-apt-gallery-prev aria-label="Foto anterior">‹</button>
        <button type="button" class="apt-grid-card__gallery-nav apt-grid-card__gallery-nav--next" data-apt-gallery-next aria-label="Próxima foto">›</button>
      `
      : '';

    this.innerHTML = `
      <article class="apt-grid-card"
               data-apt-grid-card
               data-slug="${apt.slug}"
               data-bedrooms="${apt.bedrooms}"
               data-pool="${apt.pool}"
               data-parking="${apt.parking}"
               data-neighborhood="${apt.neighborhoodSlug}">
        <div class="apt-grid-card__media" data-apt-gallery>
          <img src="${cover.src}" alt="${cover.alt}" loading="lazy" decoding="async"
               class="apt-grid-card__img"
               data-apt-gallery-img data-index="0"
               onerror="this.onerror=null;this.src='${fallback}'">
          ${apt.badge ? `<span class="apt-grid-card__badge">${apt.badge}</span>` : ''}
          <button type="button" class="apt-grid-card__fav" data-apt-fav aria-label="Salvar apartamento" aria-pressed="false">${HEART_SVG}</button>
          ${dots}
          ${galleryNav}
        </div>
        <div class="apt-grid-card__body">
          <h3 class="apt-grid-card__title"><a href="${href}">${apt.name}</a></h3>
          <div class="apt-grid-card__rating" aria-label="Nota ${apt.rating} de 5">
            <span class="apt-grid-card__stars">★ ${ratingLabel(apt)}</span>
          </div>
          <a href="${mapsUrl}" class="apt-grid-card__loc" target="_blank" rel="noopener noreferrer">
            ${PIN_SVG}
            <span>${apt.neighborhood} · ${apt.tagline}</span>
          </a>
          <p class="apt-grid-card__desc">${excerptText(apt.description)}</p>
          <ul class="apt-grid-card__chips">${buildChips(apt)}</ul>
          <div class="apt-grid-card__foot">
            ${price}
            <a href="${href}" class="btn btn--primary btn--sm apt-grid-card__cta">Ver detalhes</a>
          </div>
        </div>
      </article>
    `;

    this._bindGallery();
  }

  disconnectedCallback() {
    this._stopPhotoAutoplay();
  }

  _bindGallery() {
    if (this._imageUrls.length <= 1 || prefersReducedMotion()) return;

    const media = this.querySelector('[data-apt-gallery]');
    if (!media) return;

    media.addEventListener('mouseenter', () => this._stopPhotoAutoplay());
    media.addEventListener('mouseleave', () => this._startPhotoAutoplay());
    media.addEventListener('focusin', () => this._stopPhotoAutoplay());
    media.addEventListener('focusout', () => this._startPhotoAutoplay());

    this.querySelector('[data-apt-gallery-prev]')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this._slidePhoto(-1);
      this._startPhotoAutoplay();
    });

    this.querySelector('[data-apt-gallery-next]')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this._slidePhoto(1);
      this._startPhotoAutoplay();
    });

    this.querySelector('[data-apt-fav]')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const btn = /** @type {HTMLButtonElement} */ (e.currentTarget);
      const pressed = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!pressed));
      btn.classList.toggle('is-active', !pressed);
    });

    this._startPhotoAutoplay();
  }

  _startPhotoAutoplay() {
    this._stopPhotoAutoplay();
    if (this._imageUrls.length <= 1 || prefersReducedMotion()) return;
    this._photoTimer = setInterval(() => this._slidePhoto(1), PHOTO_INTERVAL_MS);
  }

  _stopPhotoAutoplay() {
    if (this._photoTimer) {
      clearInterval(this._photoTimer);
      this._photoTimer = null;
    }
  }

  /** @param {number} dir */
  _slidePhoto(dir) {
    const total = this._imageUrls.length;
    if (total <= 1) return;

    this._photoIndex = (this._photoIndex + dir + total) % total;
    const img = this.querySelector('[data-apt-gallery-img]');
    if (img) {
      img.src = this._imageUrls[this._photoIndex];
      img.dataset.index = String(this._photoIndex);
    }

    this.querySelectorAll('[data-apt-gallery-dot]').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === this._photoIndex);
    });
  }
}

customElements.define('rf-apartment-grid-card', RFApartmentGridCard);
