/**
 * <rf-footer> — Rodapé completo com trust badges, pagamentos e colunas.
 */

import { BUSINESS, MAPS_LINKS, whatsappUrl } from '../data/location.js';
import { APARTAMENTOS } from '../data/apartamentos.js';
import { apartmentUrl, pageHref } from '../data/site-structure.js';

const TRUST_BADGES = [
  { icon: 'star', value: '4.9/5.0', label: '127 avaliações' },
  { icon: 'lock', value: 'Pagamento seguro', label: 'Dados protegidos' },
  { icon: 'headset', value: 'Suporte 24/7', label: 'Sempre online' },
];

const INFO_LINKS = [
  { label: 'Caução reembolsável', href: './index.html#faq', icon: 'shield' },
  { label: 'Check-in / Check-out', href: './index.html#como-funciona', icon: 'clock' },
  { label: 'Perguntas frequentes', href: './index.html#faq', icon: 'help' },
  { label: 'Política de cancelamento', href: './index.html#faq', icon: 'file' },
  { label: 'Termos de uso', href: '#termos', icon: 'file' },
];

const RECIFE_LINKS = [
  { label: 'Praias', href: './boa-viagem.html', icon: 'beach' },
  { label: 'Gastronomia', href: './sobre.html', icon: 'food' },
  { label: 'Dicas locais', href: './sobre.html', icon: 'map' },
  { label: 'Boa Viagem', href: './boa-viagem.html', icon: 'pin' },
  { label: 'Pina', href: './pina.html', icon: 'pin' },
  { label: 'O que fazer', href: './index.html#localizacao', icon: 'compass' },
];

const SOCIALS = [
  { label: 'WhatsApp', href: whatsappUrl(), icon: 'whatsapp' },
  { label: 'Instagram', href: 'https://instagram.com/recifeflats', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com/recifeflats', icon: 'facebook' },
  { label: 'E-mail', href: `mailto:${BUSINESS.email}`, icon: 'mail' },
  { label: 'YouTube', href: 'https://youtube.com/@recifeflats', icon: 'youtube' },
];

const LEGAL_LINKS = [
  { label: 'Privacidade', href: '#privacidade' },
  { label: 'Termos de uso', href: '#termos' },
  { label: 'Cookies', href: '#cookies' },
  { label: 'LGPD', href: '#lgpd' },
];

const FOOTER_ICONS = {
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8-5-4.9 6.9-1L12 2Z"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 1 1 8 0v3"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="6" rx="2"/><rect x="17" y="14" width="5" height="6" rx="2"/>',
  home: '<path d="m4 11 8-7 8 7"/><path d="M6 10v9h12v-9"/>',
  shield: '<path d="M12 3 20 6v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.8.7-1.2 1.2-1.2 2.2"/><circle cx="12" cy="17" r=".5" fill="currentColor"/>',
  file: '<path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/>',
  beach: '<path d="M3 17h18"/><path d="M7 17c2-4 4-6 5-6s3 2 5 6"/><path d="M12 11V7"/>',
  food: '<path d="M8 3v8a3 3 0 0 0 6 0V3"/><path d="M16 3v18"/><path d="M6 21h12"/>',
  map: '<path d="M9 18 3 20V6l6-2 6 2 6-2v14l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/>',
  pin: '<path d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z"/><circle cx="12" cy="11" r="2"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15 9-6 2 2 6 6-2-2-6Z"/>',
  whatsapp: '<path d="M20.5 3.5A10 10 0 0 0 3.6 17l-1.6 5 5.1-1.6A10 10 0 1 0 20.5 3.5z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>',
  youtube: '<path d="M22 10.5a3 3 0 0 0-2.1-2.2C18 7.8 12 7.8 12 7.8s-6 0-7.9.5A3 3 0 0 0 2 10.5 31 31 0 0 0 1.6 12a31 31 0 0 0 .4 1.5 3 3 0 0 0 2.1 2.2C6 16.2 12 16.2 12 16.2s6 0 7.9-.5a3 3 0 0 0 2.1-2.2 31 31 0 0 0 .4-1.5 31 31 0 0 0-.4-1.5Z"/><path d="M10 15V9l5 3-5 3Z"/>',
  location: '<path d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z"/><circle cx="12" cy="11" r="2"/>',
};

function svgIcon(name, size = 16) {
  const path = FOOTER_ICONS[name] || FOOTER_ICONS.home;
  const fill = ['star', 'whatsapp', 'facebook', 'youtube'].includes(name) ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.75"';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" ${fill} aria-hidden="true">${path}</svg>`;
}

function trustCard(badge) {
  return `
    <div class="site-footer__trust-card" data-footer-reveal>
      <span class="site-footer__trust-icon">${svgIcon(badge.icon, 18)}</span>
      <div>
        <strong>${badge.value}</strong>
        <span>${badge.label}</span>
      </div>
    </div>
  `;
}

function linkItem(link) {
  return `
    <li>
      <a href="${pageHref(link.href)}">
        <span class="site-footer__link-icon">${svgIcon(link.icon, 14)}</span>
        <span class="site-footer__link-text">${link.label}</span>
      </a>
    </li>
  `;
}

class RFFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    const waLink = whatsappUrl('Olá! Gostaria de saber mais sobre os apartamentos para temporada em Recife.');

    const aptLinks = APARTAMENTOS.map((a) => `
      <li>
        <a href="${apartmentUrl(a.slug)}" title="${a.name}">
          <span class="site-footer__link-icon">${svgIcon('home', 14)}</span>
          <span class="site-footer__link-text">${a.shortName || a.name}</span>
        </a>
      </li>
    `).join('');

    const trustCards = TRUST_BADGES.map(trustCard).join('');
    const infoLinks = INFO_LINKS.map(linkItem).join('');
    const recifeLinks = RECIFE_LINKS.map(linkItem).join('');
    const socials = SOCIALS.map((s) => `
      <a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">
        ${svgIcon(s.icon, 18)}
      </a>
    `).join('');
    const legalLinks = LEGAL_LINKS.map((l) => `<a href="${l.href}">${l.label}</a>`).join('');

    this.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer__main">
          <div class="container site-footer__grid">

            <div class="site-footer__brand" data-footer-reveal>
              <div class="site-footer__brand-header">
                <span class="site-footer__logo-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="8" width="7" height="10" rx="1" fill="white" fill-opacity="0.9"/>
                    <rect x="11" y="5" width="7" height="13" rx="1" fill="white" fill-opacity="0.7"/>
                  </svg>
                </span>
                <div>
                  <strong class="site-footer__brand-name">Recife <em>Flats</em></strong>
                  <span class="site-footer__brand-sub">Temporada</span>
                </div>
              </div>

              <p class="site-footer__desc">
                Flats mobiliados em Boa Viagem e Pina. Reserva direta, fotos reais e atendimento local.
              </p>

              <div class="site-footer__trust">${trustCards}</div>

              <div class="site-footer__payments" data-footer-reveal>
                <span class="site-footer__payments-label">Aceitamos</span>
                <div class="site-footer__payments-logos" aria-label="Formas de pagamento">
                  <span>Visa</span>
                  <span>Mastercard</span>
                  <span>Amex</span>
                  <span>Pix</span>
                </div>
              </div>

              <div class="site-footer__socials" data-footer-reveal>
                <span class="site-footer__socials-label">Siga-nos</span>
                <div class="site-footer__socials-row">${socials}</div>
              </div>
            </div>

            <div class="site-footer__col" data-footer-reveal>
              <h4><span class="site-footer__col-line"></span>Apartamentos</h4>
              <ul>${aptLinks}
                <li class="site-footer__see-all">
                  <a href="${pageHref('./apartamentos.html')}">
                    <span class="site-footer__link-text">Ver todos</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </a>
                </li>
              </ul>
            </div>

            <div class="site-footer__col" data-footer-reveal>
              <h4><span class="site-footer__col-line"></span>Informações</h4>
              <ul>${infoLinks}</ul>
            </div>

            <div class="site-footer__col" data-footer-reveal>
              <h4><span class="site-footer__col-line"></span>Conheça Recife</h4>
              <ul>${recifeLinks}</ul>
            </div>

            <div class="site-footer__col site-footer__col--support" data-footer-reveal>
              <h4><span class="site-footer__col-line"></span>Suporte</h4>
              <div class="site-footer__contact">
                <a href="${waLink}" class="site-footer__contact-box" target="_blank" rel="noopener noreferrer">
                  <span class="site-footer__contact-icon">${svgIcon('whatsapp', 18)}</span>
                  <div>
                    <strong>WhatsApp</strong>
                    <span class="site-footer__contact-value">${BUSINESS.phoneDisplay}</span>
                  </div>
                </a>
                <a href="mailto:${BUSINESS.email}" class="site-footer__contact-box">
                  <span class="site-footer__contact-icon">${svgIcon('mail', 18)}</span>
                  <div>
                    <strong>E-mail</strong>
                    <span class="site-footer__contact-value">${BUSINESS.email}</span>
                  </div>
                </a>
                <a href="${MAPS_LINKS.place}" class="site-footer__contact-box" target="_blank" rel="noopener noreferrer">
                  <span class="site-footer__contact-icon">${svgIcon('location', 18)}</span>
                  <div>
                    <strong>Localização</strong>
                    <span class="site-footer__contact-value">${BUSINESS.neighborhood}, ${BUSINESS.city}/${BUSINESS.state}</span>
                  </div>
                </a>
              </div>
              <div class="site-footer__status">
                <span class="site-footer__status-dot" aria-hidden="true"></span>
                Atendimento online
              </div>
            </div>

          </div>
        </div>

        <div class="site-footer__bottom">
          <div class="container site-footer__bottom-inner">
            <p>© ${year} Recife Flats. Todos os direitos reservados.</p>
            <p class="site-footer__credit">
              Desenvolvido por
              <a href="https://vanessenceweb.com" target="_blank" rel="noopener noreferrer">VanessenceWeb</a>
            </p>
            <nav class="site-footer__legal" aria-label="Links legais">${legalLinks}</nav>
            <div class="site-footer__secure" aria-label="Site seguro">
              <span title="Dados protegidos">${svgIcon('shield', 16)}</span>
              <span title="Pagamento seguro">${svgIcon('lock', 16)}</span>
            </div>
          </div>
        </div>
      </footer>
    `;

    this._animate();
  }

  _animate() {
    const els = this.querySelectorAll('[data-footer-reveal]');
    if (!els.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (window.gsap && window.ScrollTrigger) {
      gsap.from(els, {
        opacity: 0,
        y: 20,
        duration: 0.55,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: { trigger: this, start: 'top 92%', once: true },
      });
    }
  }
}

customElements.define('rf-footer', RFFooter);
