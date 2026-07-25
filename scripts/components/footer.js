/**
 * <rf-footer> — Rodapé completo (mesmo em todas as páginas).
 *
 * Colunas: Apartamentos · Informações · Conheça Recife · Suporte
 * Meio: formas de pagamento + redes sociais
 * Base: dados da empresa · crédito · links legais
 */

import { BUSINESS, DEVELOPER, MAPS_LINKS, whatsappUrl } from '../data/location.js';
import { APARTAMENTOS } from '../data/apartamentos.js';
import { apartmentUrl, pageHref } from '../data/site-structure.js';

const INFO_LINKS = [
  { label: 'Caução Reembolsável', href: './contato.html', icon: 'shield' },
  { label: 'Check-in / Check-out', href: './index.html#como-funciona', icon: 'clock' },
  { label: 'Regras da Casa', href: './contato.html', icon: 'list' },
  { label: 'Perguntas Frequentes', href: './index.html#faq', icon: 'help' },
  { label: 'Como Funciona', href: './index.html#como-funciona', icon: 'info' },
  { label: 'FNRH', href: './contato.html', icon: 'doc' },
];

const RECIFE_LINKS = [
  { label: 'Boa Viagem', href: './boa-viagem.html', icon: 'beach' },
  { label: 'Pina', href: './pina.html', icon: 'pin' },
  { label: 'Localização', href: './index.html#localizacao', icon: 'map' },
  { label: 'ApartMatch', href: './apartmatch.html', icon: 'spark' },
  { label: 'Sobre nós', href: './sobre.html', icon: 'info' },
];

const SUPPORT_LINKS = [
  { label: 'Fale Conosco', href: './contato.html', icon: 'mail' },
  { label: 'WhatsApp', href: 'whatsapp', icon: 'whatsapp' },
  { label: 'Suporte para Hóspedes', href: './contato.html', icon: 'headset' },
  { label: 'Confirmar Reserva', href: 'confirm-reservation', icon: 'check' },
  { label: 'Reclamações', href: './contato.html', icon: 'alert' },
];

const LEGAL_LINKS = [
  { label: 'Política de Privacidade', href: './contato.html' },
  { label: 'Termos de Uso', href: './contato.html' },
  { label: 'Cookies', href: './contato.html' },
  { label: 'LGPD', href: './contato.html' },
];

/** Logos oficiais simplificados (SVG) — melhor que só o nome do cartão */
const PAYMENTS = [
  {
    label: 'Visa',
    className: 'is-visa',
    logo: `<svg viewBox="0 0 48 16" width="48" height="16" aria-hidden="true"><path fill="#1A1F71" d="M17.5 1.2h-3.4c-.3 0-.5.2-.6.4L10.2 14.5h3.7l.7-2.1h3.4l.4 2.1h3.3L19.3 1.6c0-.3-.2-.4-.5-.4zm-.6 8.2-1.1-4.5-.8 4.5h1.9zM28.7 1.2l-2.9 13.3h3.5l2.9-13.3h-3.5zM39.4 1.2c-.7 0-1.2.2-1.8.7l-.3-.5h-3.1l1.8 4.2-2.5 9h3.6l2.5-8.5c.3-.1.5-.2.8-.2.5 0 .7.3.7.8l-.9 7.9h3.5l1-8.6c.2-1.8-.8-3.8-3.3-3.8zM8.6 1.2 5.1 10.4 4.8 9c-.6-1.9-2.4-4-4.5-5.1l3 10.4h3.7L12.3 1.2H8.6z"/></svg>`,
  },
  {
    label: 'Mastercard',
    className: 'is-mastercard',
    logo: `<svg viewBox="0 0 40 24" width="40" height="24" aria-hidden="true"><circle cx="15" cy="12" r="9" fill="#EB001B"/><circle cx="25" cy="12" r="9" fill="#F79E1B"/><path fill="#FF5F00" d="M20 5.2a9 9 0 0 1 0 13.6 9 9 0 0 1 0-13.6z"/></svg>`,
  },
  {
    label: 'American Express',
    className: 'is-amex',
    logo: `<svg viewBox="0 0 48 16" width="48" height="16" aria-hidden="true"><rect width="48" height="16" rx="2" fill="#2E77BC"/><text x="24" y="11.5" text-anchor="middle" fill="#fff" font-size="7" font-family="Arial,sans-serif" font-weight="700">AMEX</text></svg>`,
  },
  {
    label: 'PIX',
    className: 'is-pix',
    logo: `<svg viewBox="0 0 48 16" width="48" height="16" aria-hidden="true"><path fill="#fff" d="M22.4 2.2c-.4-.4-1-.4-1.4 0l-2.3 2.3c-.2.2-.2.4 0 .6l3.4 3.4c.2.2.2.4 0 .6l-3.4 3.4c-.2.2-.2.4 0 .6l2.3 2.3c.4.4 1 .4 1.4 0l2.6-2.6c.8-.8.8-2 0-2.8l-.8-.8.8-.8c.8-.8.8-2 0-2.8L22.4 2.2zm5.2 0 2.6 2.6c.8.8.8 2 0 2.8l-.8.8.8.8c.8.8.8 2 0 2.8l-2.6 2.6c-.4.4-1 .4-1.4 0l-2.3-2.3c-.2-.2-.2-.4 0-.6l3.4-3.4c.2-.2.2-.4 0-.6l-3.4-3.4c-.2-.2-.2-.4 0-.6l2.3-2.3c.4-.4 1-.4 1.4 0z"/></svg>`,
  },
  {
    label: 'Elo',
    className: 'is-elo',
    logo: `<svg viewBox="0 0 40 16" width="40" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="#FFCB05"/><circle cx="20" cy="8" r="6" fill="#00A4E0"/><circle cx="32" cy="8" r="6" fill="#EF4123"/></svg>`,
  },
];

const SOCIALS = [
  { label: 'WhatsApp', href: whatsappUrl(), icon: 'whatsapp', className: 'is-whatsapp' },
  { label: 'Instagram', href: 'https://instagram.com/recifeflats', icon: 'instagram', className: 'is-instagram' },
  { label: 'Facebook', href: 'https://facebook.com/recifeflats', icon: 'facebook', className: 'is-facebook' },
  { label: 'E-mail', href: `mailto:${BUSINESS.email}`, icon: 'mail', className: 'is-email' },
  { label: 'YouTube', href: 'https://youtube.com/@recifeflats', icon: 'youtube', className: 'is-youtube' },
];

const ICONS = {
  home: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
  shield: '<path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>',
  clock: '<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>',
  list: '<path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>',
  help: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>',
  info: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>',
  doc: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>',
  beach: '<path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>',
  pin: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>',
  map: '<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>',
  spark: '<path d="M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>',
  mail: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
  whatsapp: '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>',
  headset: '<path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>',
  check: '<path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
  alert: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>',
  arrow: '<path d="M12 4 10.59 5.41 16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>',
  instagram: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>',
  facebook: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
  youtube: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
};

function icon(name, size = 15) {
  const inner = ICONS[name] || ICONS.home;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${inner}</svg>`;
}

function linkAttrs(href) {
  if (href === 'confirm-reservation') {
    return 'href="#confirmar-reserva" data-footer-confirm';
  }
  if (href === 'whatsapp') {
    const url = whatsappUrl('Olá! Preciso de suporte com minha reserva na Recife Flats.');
    return `href="${url}" target="_blank" rel="noopener noreferrer"`;
  }
  const url = pageHref(href);
  return `href="${url}"`;
}

function columnLink({ label, href, icon: iconName }) {
  return `
    <li>
      ${icon(iconName)}
      <a ${linkAttrs(href)}>${label}</a>
    </li>
  `;
}

function column(title, itemsHtml) {
  return `
    <div class="site-footer__col" data-footer-reveal>
      <h4 class="site-footer__col-title">${title}</h4>
      <ul>${itemsHtml}</ul>
    </div>
  `;
}

class RFFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    const waDefault = whatsappUrl();

    const aptLinks = APARTAMENTOS.map((a) => `
      <li>
        ${icon('home')}
        <a href="${apartmentUrl(a.slug)}" title="${a.name}">${a.shortName || a.name}</a>
      </li>
    `).join('');

    const payments = PAYMENTS.map((p) =>
      `<span class="site-footer__pay ${p.className}" title="${p.label}" aria-label="${p.label}">${p.logo}</span>`,
    ).join('');

    const socials = SOCIALS.map((s) => {
      const external = !s.href.startsWith('mailto:');
      return `
        <a href="${s.href}"
           class="site-footer__social ${s.className}"
           ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}
           aria-label="${s.label}"
           title="${s.label}">
          ${icon(s.icon, 17)}
        </a>
      `;
    }).join('');

    const legal = LEGAL_LINKS.map((l) =>
      `<a href="${pageHref(l.href)}">${l.label}</a>`,
    ).join('');

    const legalBits = [
      BUSINESS.cnpj ? `CNPJ ${BUSINESS.cnpj}` : null,
      BUSINESS.registration || null,
      `${BUSINESS.streetAddress} — ${BUSINESS.neighborhood}, ${BUSINESS.city}/${BUSINESS.state}`,
    ].filter(Boolean);

    this.innerHTML = `
      <footer class="site-footer">
        <div class="container site-footer__inner">

          <div class="site-footer__grid">
            ${column(
              'Apartamentos',
              `${aptLinks}
              <li>
                <a href="${pageHref('./apartamentos.html')}" class="site-footer__see-all">
                  ${icon('arrow', 13)}
                  Ver Todos os Apartamentos
                </a>
              </li>`,
            )}
            ${column('Informações', INFO_LINKS.map(columnLink).join(''))}
            ${column('Conheça Recife', RECIFE_LINKS.map(columnLink).join(''))}
            ${column('Suporte', SUPPORT_LINKS.map(columnLink).join(''))}
          </div>

          <div class="site-footer__mid" data-footer-reveal>
            <div class="site-footer__payments">
              <h5>Aceitamos</h5>
              <div class="site-footer__pay-row">${payments}</div>
            </div>
            <div class="site-footer__socials">
              <h5>Siga-nos</h5>
              <div class="site-footer__social-row">${socials}</div>
            </div>
          </div>

          <div class="site-footer__company" data-footer-reveal>
            <p class="site-footer__company-name">${BUSINESS.name}</p>
            <p class="site-footer__company-meta">${legalBits.join(' · ')}</p>
            <p class="site-footer__company-contact">
              <a href="${waDefault}" target="_blank" rel="noopener noreferrer">${BUSINESS.phoneDisplay}</a>
              ·
              <a href="mailto:${BUSINESS.email}">${BUSINESS.email}</a>
              ·
              <a href="${MAPS_LINKS.place}" target="_blank" rel="noopener noreferrer">Ver no mapa</a>
            </p>
          </div>

          <div class="site-footer__bottom">
            <div class="site-footer__copy">
              © ${year} Recife Flats. Todos os direitos reservados.
              &nbsp;|&nbsp;
              Desenvolvido por
              <a href="${DEVELOPER.url}" class="site-footer__dev" target="_blank" rel="noopener noreferrer">${DEVELOPER.name}</a>
            </div>
            <div class="site-footer__legal">${legal}</div>
          </div>

        </div>
      </footer>
    `;

    this._bindConfirm();
    this._animate();
  }

  _bindConfirm() {
    this.querySelectorAll('[data-footer-confirm]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('rf-confirm-reservation-open'));
      });
    });
  }

  _animate() {
    const els = this.querySelectorAll('[data-footer-reveal]');
    if (!els.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (window.gsap && window.ScrollTrigger) {
      gsap.from(els, {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: { trigger: this, start: 'top 92%', once: true },
      });
    }
  }
}

customElements.define('rf-footer', RFFooter);
