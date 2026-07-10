/**
 * <rf-testimonials-section> — Depoimentos com marquee vertical (3 colunas).
 */

import { prefersReducedMotion } from '../utils/dom.js';
import { TESTIMONIALS, renderTestimonialAvatar } from '../data/testimonials.js';

function reviewCard(t, variant = 'default') {
  const stars = t.stars
    ? '<div class="review-card__stars" aria-label="5 de 5 estrelas">★★★★★</div>'
    : '';

  return `
    <article class="review-card review-card--${variant}">
      ${stars}
      <blockquote class="review-card__quote">"${t.quote}"</blockquote>
      <div class="review-card__author">
        ${renderTestimonialAvatar(t)}
        <div>
          <strong>${t.name}</strong>
          <span>${t.meta}</span>
        </div>
      </div>
    </article>
  `;
}

function marqueeColumn(items, direction, speed) {
  const cards = items.map((t, i) => reviewCard(t, i % 2 ? 'alt' : 'default')).join('');
  return `
    <div class="testimonials-marquee__col">
      <div class="testimonials-marquee__track"
           data-marquee-track
           data-direction="${direction}"
           data-speed="${speed}">
        ${cards}
        ${cards}
      </div>
    </div>
  `;
}

class RFTestimonialsSection extends HTMLElement {
  connectedCallback() {
    const col1 = marqueeColumn(
      [TESTIMONIALS[0], TESTIMONIALS[3], TESTIMONIALS[6], TESTIMONIALS[1]],
      'up',
      '0.45',
    );
    const col2 = marqueeColumn(
      [TESTIMONIALS[1], TESTIMONIALS[4], TESTIMONIALS[7], TESTIMONIALS[2]],
      'down',
      '0.55',
    );
    const col3 = marqueeColumn(
      [TESTIMONIALS[2], TESTIMONIALS[5], TESTIMONIALS[0], TESTIMONIALS[4]],
      'up',
      '0.5',
    );

    this.innerHTML = `
      <section class="home-section testimonials testimonials--marquee" id="depoimentos" aria-labelledby="reviews-heading">
        <div class="container testimonials__head" data-reveal>
          <header class="section-head section-head--center">
            <span class="eyebrow eyebrow--pill eyebrow--on-dark">Avaliações</span>
            <h2 class="section-head__title" id="reviews-heading">
              O que dizem nossos <em>hóspedes</em>
            </h2>
            <p class="section-head__lead">
              Nota <strong class="testimonials__score">4.9</strong> no Google — avaliações reais de quem já se hospedou.
            </p>
          </header>
        </div>

        <div class="testimonials-marquee" aria-hidden="false">
          <div class="testimonials-marquee__grid">
            ${col1}
            ${col2}
            ${col3}
          </div>
        </div>
      </section>
    `;

    this._initMarquee();
    this._animate();
  }

  disconnectedCallback() {
    if (this._marqueeFrame) cancelAnimationFrame(this._marqueeFrame);
  }

  _initMarquee() {
    if (prefersReducedMotion()) return;

    const tracks = this.querySelectorAll('[data-marquee-track]');
    const states = new Map();

    tracks.forEach((track) => {
      const dir = track.dataset.direction || 'up';
      const speed = parseFloat(track.dataset.speed) || 0.5;
      const startY = dir === 'down' ? -(track.scrollHeight / 2) : 0;
      states.set(track, { y: startY, dir, speed });
      track.style.transform = `translate3d(0, ${startY}px, 0)`;
    });

    const tick = () => {
      states.forEach((state, track) => {
        const half = track.scrollHeight / 2;
        if (state.dir === 'up') {
          state.y -= state.speed;
          if (Math.abs(state.y) >= half) state.y = 0;
        } else {
          state.y += state.speed;
          if (state.y >= 0) state.y = -half;
        }
        track.style.transform = `translate3d(0, ${state.y}px, 0)`;
      });
      this._marqueeFrame = requestAnimationFrame(tick);
    };

    this._marqueeFrame = requestAnimationFrame(tick);
  }

  _animate() {
    const head = this.querySelector('[data-reveal]');
    if (!head || prefersReducedMotion() || !window.gsap) return;

    gsap.from(head, {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: this, start: 'top 88%', once: true },
    });
  }
}

customElements.define('rf-testimonials-section', RFTestimonialsSection);
