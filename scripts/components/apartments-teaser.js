/**
 * <rf-apartments-teaser> — Destaque na home com carrossel de apartamentos.
 */

import { APARTAMENTOS } from '../data/apartamentos.js';
import { NEIGHBORHOODS } from '../data/site-structure.js';
import { prefersReducedMotion } from '../utils/dom.js';

const CARD_INTERVAL_MS = 3000;
const PAUSE_AFTER_NAV_MS = 8000;

class RFApartmentsTeaser extends HTMLElement {
  /** @type {ReturnType<typeof setInterval> | null} */
  _carouselTimer = null;

  /** @type {ReturnType<typeof setTimeout> | null} */
  _resumeTimer = null;

  /** @type {number} */
  _carouselIndex = 0;

  connectedCallback() {
    const cards = APARTAMENTOS.map(
      (a) => `<rf-apartment-grid-card slug="${a.slug}"></rf-apartment-grid-card>`,
    ).join('');

    const neighborhoodLinks = Object.values(NEIGHBORHOODS).map((n) => {
      const count = APARTAMENTOS.filter((a) => a.neighborhoodSlug === n.slug).length;
      return `
        <a href="${n.pageUrl}" class="apt-teaser__nb-link">
          <span class="apt-teaser__nb-name">${n.name}</span>
          <span class="apt-teaser__nb-count">${count} imóve${count > 1 ? 'is' : 'l'}</span>
        </a>
      `;
    }).join('');

    this.innerHTML = `
      <section class="home-section home-section--white apt-teaser" id="apartamentos" aria-labelledby="apt-teaser-heading">
        <div class="container apt-teaser__inner">
          <header class="section-head" data-apt-teaser-reveal>
            <span class="eyebrow eyebrow--pill">Nossa coleção</span>
            <h2 class="section-head__title" id="apt-teaser-heading">
              Flats para <em>temporada</em> em Recife
            </h2>
            <p class="section-head__lead">
              Cada apartamento é escolhido a dedo — compare localização, estrutura e preço, e reserve direto conosco.
            </p>
          </header>

          <div class="apt-teaser__nb-row" data-apt-teaser-reveal>
            ${neighborhoodLinks}
          </div>

          <div class="apt-teaser__carousel-wrap" data-apt-teaser-reveal>
            <div class="apt-teaser__carousel" data-apt-carousel>
              <button type="button" class="apt-teaser__nav apt-teaser__nav--prev" data-apt-carousel-prev aria-label="Apartamento anterior">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <div class="apt-teaser__track" data-apt-carousel-track tabindex="0" aria-label="Carrossel de apartamentos">
                ${cards}
              </div>
              <button type="button" class="apt-teaser__nav apt-teaser__nav--next" data-apt-carousel-next aria-label="Próximo apartamento">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>

          <footer class="apt-teaser__footer" data-apt-teaser-reveal>
            <a href="./apartamentos.html" class="btn btn--secondary btn--lg">
              Ver todos os apartamentos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </footer>
        </div>
      </section>
    `;

    this._initCarousel();
    this._animate();
  }

  disconnectedCallback() {
    this._stopCarousel();
    if (this._resumeTimer) clearTimeout(this._resumeTimer);
  }

  _initCarousel() {
    const track = this.querySelector('[data-apt-carousel-track]');
    if (!track) return;

    const getSlides = () => [...track.children];

    const scrollToIndex = (index, smooth = true) => {
      const slides = getSlides();
      if (!slides.length) return 0;
      const total = slides.length;
      const idx = ((index % total) + total) % total;
      const slide = slides[idx];
      const reduce = prefersReducedMotion();
      track.scrollTo({
        left: slide.offsetLeft - track.offsetLeft,
        behavior: smooth && !reduce ? 'smooth' : 'auto',
      });
      this._carouselIndex = idx;
      return idx;
    };

    const pause = () => {
      this._stopCarousel();
      if (this._resumeTimer) clearTimeout(this._resumeTimer);
    };

    const resumeLater = () => {
      if (this._resumeTimer) clearTimeout(this._resumeTimer);
      this._resumeTimer = setTimeout(() => this._startCarousel(scrollToIndex), PAUSE_AFTER_NAV_MS);
    };

    const nav = (dir) => {
      scrollToIndex(this._carouselIndex + dir);
      pause();
      resumeLater();
    };

    this.querySelector('[data-apt-carousel-prev]')?.addEventListener('click', () => nav(-1));
    this.querySelector('[data-apt-carousel-next]')?.addEventListener('click', () => nav(1));

    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', () => this._startCarousel(scrollToIndex));
    track.addEventListener('focusin', pause);
    track.addEventListener('focusout', () => this._startCarousel(scrollToIndex));

    let scrollEndTimer;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        const slides = getSlides();
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        slides.forEach((slide, i) => {
          const slideCenter = slide.offsetLeft - track.offsetLeft + slide.offsetWidth / 2;
          const dist = Math.abs(center - slideCenter);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });
        this._carouselIndex = closest;
      }, 80);
    }, { passive: true });

    this._startCarousel(scrollToIndex);
  }

  /** @param {(index: number, smooth?: boolean) => number} scrollToIndex */
  _startCarousel(scrollToIndex) {
    this._stopCarousel();
    if (prefersReducedMotion()) return;

    this._carouselTimer = setInterval(() => {
      scrollToIndex(this._carouselIndex + 1);
    }, CARD_INTERVAL_MS);
  }

  _stopCarousel() {
    if (this._carouselTimer) {
      clearInterval(this._carouselTimer);
      this._carouselTimer = null;
    }
  }

  _animate() {
    if (prefersReducedMotion() || !window.gsap) return;
    gsap.from(this.querySelectorAll('[data-apt-teaser-reveal]'), {
      opacity: 0,
      y: 28,
      duration: 0.65,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: this, start: 'top 85%', once: true },
    });
  }
}

customElements.define('rf-apartments-teaser', RFApartmentsTeaser);
