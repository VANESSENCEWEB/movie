/**
 * <rf-reservation-steps> — Como funciona sua reserva (reserva direta).
 */

import { whatsappUrl } from '../data/location.js';
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

          <div class="reservation-steps__grid" data-reservation-steps>${steps}</div>

          <div class="reservation-steps__highlights" data-reservation-highlights>${highlights}</div>

          <div class="reservation-steps__cta" data-reservation-reveal>
            <a href="${whatsappUrl('Olá! Quero verificar disponibilidade para minhas datas.')}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">
              Pedir disponibilidade
            </a>
            <a href="./apartamentos.html" class="btn btn--outline">Comparar apartamentos</a>
          </div>
        </div>
        ${renderWaveDivider('var(--sand-200)')}
      </section>
    `;

    this._animate();
  }

  _lightCards(cards) {
    cards.forEach((card, i) => {
      window.setTimeout(() => card.classList.add('is-lit'), i * 80);
    });
  }

  _animate() {
    const header = this.querySelector('.reservation-steps__header');
    const stepsGrid = this.querySelector('[data-reservation-steps]');
    const highlightsGrid = this.querySelector('[data-reservation-highlights]');
    const stepCards = [...(stepsGrid?.querySelectorAll('[data-reservation-card]') || [])];
    const highlightCards = [...(highlightsGrid?.querySelectorAll('[data-reservation-card]') || [])];
    const staticReveal = this.querySelectorAll('[data-reservation-reveal]');

    if (prefersReducedMotion()) {
      [...stepCards, ...highlightCards].forEach((c) => c.classList.add('is-lit'));
      return;
    }

    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.from(header, {
      opacity: 0,
      y: 24,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: { trigger: header, start: 'top 85%', once: true },
    });

    gsap.from(staticReveal, {
      opacity: 0,
      y: 20,
      duration: 0.55,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: staticReveal[0] || this, start: 'top 85%', once: true },
    });

    gsap.from(stepCards, {
      opacity: 0,
      y: 36,
      scale: 0.94,
      duration: 0.7,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: { trigger: stepsGrid, start: 'top 82%', once: true },
      onComplete: () => this._lightCards(stepCards),
    });

    gsap.from(highlightCards, {
      opacity: 0,
      y: 28,
      x: -12,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: highlightsGrid, start: 'top 85%', once: true },
      onComplete: () => this._lightCards(highlightCards),
    });
  }
}

customElements.define('rf-reservation-steps', RFReservationSteps);
