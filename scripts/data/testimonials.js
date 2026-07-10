/**
 * Depoimentos — fonte única para home, marquee e /bio.
 *
 * Para trocar por foto real do hóspede:
 *   1. Salve em assets/images/depoimentos/nome.jpg
 *   2. Defina photoLocal (caminho local) — tem prioridade sobre photo (web).
 */

import { assetUrl } from '../utils/paths.js';

/** @typedef {{
 *   id: string,
 *   initials: string,
 *   name: string,
 *   meta: string,
 *   quote: string,
 *   stars: boolean,
 *   photo?: string,
 *   photoLocal?: string,
 * }} Testimonial
 */

/** @type {Testimonial[]} */
export const TESTIMONIALS = [
  {
    id: 'mariana-r',
    initials: 'MR',
    name: 'Mariana R.',
    meta: 'São Paulo · 7 noites',
    quote: 'Apartamento idêntico às fotos, pertinho da praia. Atendimento impecável do check-in ao check-out.',
    stars: true,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face',
    // photoLocal: './assets/images/depoimentos/mariana-r.jpg',
  },
  {
    id: 'caio-p',
    initials: 'CP',
    name: 'Caio P.',
    meta: 'Brasília · 5 noites',
    quote: 'Flat Golden View perfeito para o casal. Resposta rápida no WhatsApp e tudo muito limpo.',
    stars: true,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face',
    // photoLocal: './assets/images/depoimentos/caio-p.jpg',
  },
  {
    id: 'familia-lopes',
    initials: 'FL',
    name: 'Família Lopes',
    meta: 'Porto Alegre · 10 noites',
    quote: 'Apt espaçoso para a família, bem localizado em Boa Viagem. Voltaremos com certeza.',
    stars: true,
    photo: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=128&h=128&fit=crop&crop=face',
    // photoLocal: './assets/images/depoimentos/familia-lopes.jpg',
  },
  {
    id: 'ana-s',
    initials: 'AS',
    name: 'Ana S.',
    meta: 'Rio de Janeiro · 4 noites',
    quote: 'Localização excelente no Pina, perto do RioMar. Check-in simples e apartamento impecável.',
    stars: true,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&crop=face',
    // photoLocal: './assets/images/depoimentos/ana-s.jpg',
  },
  {
    id: 'joao-t',
    initials: 'JT',
    name: 'João T.',
    meta: 'Curitiba · 6 noites',
    quote: 'Wi-Fi ótimo para trabalho remoto e praia a poucos passos. Recomendo demais!',
    stars: false,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face',
    // photoLocal: './assets/images/depoimentos/joao-t.jpg',
  },
  {
    id: 'rita-c',
    initials: 'RC',
    name: 'Rita C.',
    meta: 'Salvador · 8 noites',
    quote: 'Reserva direta sem surpresa: valores claros, fotos reais e suporte durante toda a estadia.',
    stars: true,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face',
    // photoLocal: './assets/images/depoimentos/rita-c.jpg',
  },
  {
    id: 'lucas-m',
    initials: 'LM',
    name: 'Lucas M.',
    meta: 'Fortaleza · 3 noites',
    quote: 'Melhor custo-benefício em Boa Viagem. Voltaria sem pensar duas vezes.',
    stars: true,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face',
    // photoLocal: './assets/images/depoimentos/lucas-m.jpg',
  },
  {
    id: 'patricia-f',
    initials: 'PF',
    name: 'Patrícia F.',
    meta: 'Belo Horizonte · 5 noites',
    quote: 'Equipe atenciosa, apartamento confortável e muito perto da orla. Experiência nota 10.',
    stars: true,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop&crop=face',
    // photoLocal: './assets/images/depoimentos/patricia-f.jpg',
  },
];

/** @param {Testimonial} t */
export function getTestimonialPhoto(t) {
  if (t.photoLocal) return assetUrl(t.photoLocal);
  return t.photo || '';
}

/**
 * @param {Testimonial} t
 * @param {{ baseClass?: string, imgClass?: string, fallbackClass?: string }} [opts]
 */
export function renderTestimonialAvatar(t, opts = {}) {
  const base = opts.baseClass || 'review-card__avatar';
  const imgClass = opts.imgClass || `${base} ${base}--photo`;
  const fallbackClass = opts.fallbackClass || `${base} ${base}--fallback`;
  const src = getTestimonialPhoto(t);
  const alt = `Foto de ${t.name}`;

  if (!src) {
    return `<span class="${base}" aria-hidden="true">${t.initials}</span>`;
  }

  return `
    <span class="${base}-wrap">
      <img class="${imgClass}"
           src="${src}"
           alt="${alt}"
           width="48"
           height="48"
           loading="lazy"
           decoding="async"
           onerror="this.hidden=true; this.nextElementSibling.hidden=false">
      <span class="${fallbackClass}" hidden aria-hidden="true">${t.initials}</span>
    </span>
  `;
}

/** Depoimentos resumidos para componentes legados (home-sections). */
export const TESTIMONIALS_SHORT = TESTIMONIALS.slice(0, 4).map((t) => ({
  stars: 5,
  quote: t.quote,
  author: t.name,
  meta: t.meta.replace(' · ', ' — '),
  initials: t.initials,
  photo: getTestimonialPhoto(t),
}));
