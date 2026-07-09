/**
 * <rf-why-choose-section> — Por que escolher nossos apartamentos.
 * Grade 3×2 com ícones, hover lift e reveal em stagger ao rolar.
 */

import { prefersReducedMotion } from '../utils/dom.js';

const FEATURES = [
  {
    icon: 'location',
    title: 'Localização premium',
    text: 'Apartamentos nos melhores bairros de Recife, próximos às principais atrações turísticas e praias.',
  },
  {
    icon: 'wifi',
    title: 'Comodidades completas',
    text: 'Wi-Fi gratuito, ar-condicionado, cozinha equipada e tudo que você precisa para uma estadia confortável.',
  },
  {
    icon: 'shield',
    title: 'Segurança garantida',
    text: 'Apartamentos em edifícios com portaria 24h e sistemas de segurança modernos.',
  },
  {
    icon: 'headset',
    title: 'Suporte 24/7',
    text: 'Nossa equipe está sempre disponível para auxiliar você durante toda a sua estadia.',
  },
  {
    icon: 'price',
    title: 'Preços competitivos',
    text: 'Os melhores preços do mercado com total transparência e sem taxas ocultas.',
  },
  {
    icon: 'star',
    title: 'Avaliações excelentes',
    text: 'Mais de 95% dos nossos hóspedes recomendam nossos apartamentos para amigos e familiares.',
  },
];

const ICONS = {
  location: '<path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  wifi: '<path d="M5 12.5a14 14 0 0 1 14 0"/><path d="M8.5 15.5a9 9 0 0 1 7 0"/><path d="M12 18.5h.01"/><circle cx="12" cy="18.5" r="1"/>',
  shield: '<path d="M12 3 20 6v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3Z"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="6" rx="2"/><rect x="17" y="14" width="5" height="6" rx="2"/>',
  price: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8-5-4.9 6.9-1L12 2Z"/>',
};

function featureCard(feature, index) {
  return `
    <article class="why-card" data-why-reveal style="--why-delay:${index * 70}ms">
      <span class="why-card__icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          ${ICONS[feature.icon]}
        </svg>
      </span>
      <h3 class="why-card__title">${feature.title}</h3>
      <p class="why-card__text">${feature.text}</p>
    </article>
  `;
}

class RFWhyChooseSection extends HTMLElement {
  connectedCallback() {
    const cards = FEATURES.map(featureCard).join('');

    this.innerHTML = `
      <section class="home-section home-section--paper why-choose" id="por-que-escolher" aria-labelledby="why-heading">
        <div class="container">
          <header class="section-head section-head--center" data-why-reveal>
            <span class="eyebrow eyebrow--pill">Por que escolher</span>
            <h2 class="section-head__title" id="why-heading">
              Por que escolher nossos <em>apartamentos?</em>
            </h2>
            <p class="section-head__lead">
              Oferecemos a melhor experiência em hospedagem temporária em Recife — com reserva direta, fotos reais e atendimento de quem é da terra.
            </p>
          </header>
          <div class="why-choose__grid">${cards}</div>
        </div>
      </section>
    `;

    this._animate();
  }

  _animate() {
    const els = this.querySelectorAll('[data-why-reveal]');
    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    if (window.gsap && window.ScrollTrigger) {
      gsap.from(els, {
        opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: this, start: 'top 85%', once: true },
      });
      return;
    }

    if (!window.__rfWhyIO) {
      window.__rfWhyIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            window.__rfWhyIO.unobserve(entry.target);
          });
        },
        { threshold: 0.12 },
      );
    }

    els.forEach((el) => window.__rfWhyIO.observe(el));
  }
}

customElements.define('rf-why-choose-section', RFWhyChooseSection);
