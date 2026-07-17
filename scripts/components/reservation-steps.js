/**
 * <rf-reservation-steps> — Como funciona sua reserva (reserva direta).
 */

import { whatsappUrl } from '../data/location.js';
import { APARTMENTS_HUB_URL } from '../data/site-structure.js';
import { pageHref } from '../utils/paths.js';
import { prefersReducedMotion } from '../utils/dom.js';
import { renderWaveDivider } from '../utils/wave-divider.js';

const STEPS = [
  {
    num: '01',
    title: 'Escolha o apartamento ideal',
    text: 'Compare localização, capacidade, estrutura e faixa de preço para a sua viagem em Recife.',
  },
  {
    num: '02',
    title: 'Fale conosco pelo WhatsApp',
    text: 'Enviamos disponibilidade, valores, regras e orientações objetivas — sem intermediação de plataforma.',
  },
  {
    num: '03',
    title: 'Confirme e receba o check-in',
    text: 'Após a confirmação, você recebe os dados da hospedagem, instruções de acesso e suporte até o check-out.',
  },
];

const HIGHLIGHTS = [
  { title: 'Preço direto', text: 'Condição mais competitiva sem comissão de marketplace inflando sua diária.' },
  { title: 'Atendimento rápido', text: 'Você fala com quem resolve disponibilidade, chegada e dúvidas reais.' },
  { title: 'Mais previsibilidade', text: 'Informações claras sobre caução, regras, horários e estrutura antes de fechar.' },
];

class RFReservationSteps extends HTMLElement {
  connectedCallback() {
    const steps = STEPS.map((step) => `
      <article class="reservation-step" data-reservation-card>
        <span class="reservation-step__num">${step.num}</span>
        <h3 class="reservation-step__title">${step.title}</h3>
        <p class="reservation-step__text">${step.text}</p>
      </article>
    `).join('');

    const highlights = HIGHLIGHTS.map((h) => `
      <div class="reservation-highlight" data-reservation-card>
        <h4>${h.title}</h4>
        <p>${h.text}</p>
      </div>
    `).join('');

    this.innerHTML = `
      <section class="reservation-steps" id="como-funciona" aria-labelledby="reservation-heading">
        <div class="container reservation-steps__inner">
          <header class="reservation-steps__header" data-reservation-reveal>
            <span class="eyebrow eyebrow--on-dark">Reserva direta</span>
            <h2 class="reservation-steps__title" id="reservation-heading">
              Como funciona sua <em class="display-italic">reserva</em>
            </h2>
            <p class="reservation-steps__lead">
              Processo simples, atendimento humano e negociação direta para você reservar com mais segurança e menos atrito.
            </p>
          </header>

          <div class="reservation-steps__grid">${steps}</div>

          <div class="reservation-steps__highlights">${highlights}</div>

          <div class="reservation-steps__cta" data-reservation-reveal>
            <a href="${whatsappUrl('Olá! Quero verificar disponibilidade para minhas datas.')}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">
              Pedir disponibilidade
            </a>
            <a href="${pageHref(APARTMENTS_HUB_URL)}" class="btn btn--outline">Comparar apartamentos</a>
          </div>
        </div>
        ${renderWaveDivider('var(--sand-200)')}
      </section>
    `;

    this._animate();
    this._initScrollGlow();
  }

  disconnectedCallback() {
    this._scrollTriggers?.forEach((st) => st.kill());
    this._scrollTriggers = null;
    this._cardObserver?.disconnect();
    this._cardObserver = null;
  }

  _initScrollGlow() {
    const cards = [...this.querySelectorAll('[data-reservation-card]')];
    if (!cards.length) return;

    if (prefersReducedMotion()) {
      cards.forEach((card) => card.classList.add('is-lit'));
      return;
    }

    if (window.gsap && window.ScrollTrigger) {
      this._scrollTriggers = cards.map((card) =>
        ScrollTrigger.create({
          trigger: card,
          start: 'top 86%',
          once: true,
          onEnter: () => card.classList.add('is-lit'),
        }),
      );
      return;
    }

    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-lit'));
      return;
    }

    this._cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-lit');
          this._cardObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.35, rootMargin: '0px 0px -6% 0px' },
    );

    cards.forEach((card) => this._cardObserver.observe(card));
  }

  _animate() {
    if (prefersReducedMotion() || !window.gsap) return;

    const cards = this.querySelectorAll('[data-reservation-card]');
    const staticReveal = this.querySelectorAll('[data-reservation-reveal]');

    gsap.from(staticReveal, {
      opacity: 0,
      y: 28,
      duration: 0.65,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: this, start: 'top 85%', once: true },
    });

    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 26,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
      });
    });
  }
}

customElements.define('rf-reservation-steps', RFReservationSteps);
