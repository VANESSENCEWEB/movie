/**
 * <rf-footer> — Rodapé enxuto: marca, navegação e contato.
 * Mobile: colunas em accordion nativo (<details>).
 * Desktop: colunas sempre abertas.
 */

import { BUSINESS, MAPS_LINKS, whatsappUrl } from '../data/location.js';
import { APARTAMENTOS } from '../data/apartamentos.js';
import { apartmentUrl, pageHref } from '../data/site-structure.js';

const INFO_LINKS = [
  { label: 'Como reservar', href: './index.html#como-funciona' },
  { label: 'Perguntas frequentes', href: './index.html#faq' },
  { label: 'Sobre nós', href: './sobre.html' },
  { label: 'Contato', href: './contato.html' },
];

const RECIFE_LINKS = [
  { label: 'Boa Viagem', href: './boa-viagem.html' },
  { label: 'Pina', href: './pina.html' },
  { label: 'Localização', href: './index.html#localizacao' },
  { label: 'ApartMatch', href: './apartmatch.html' },
];

const SOCIALS = [
  { label: 'WhatsApp', href: whatsappUrl(), icon: 'whatsapp' },
  { label: 'Instagram', href: 'https://instagram.com/recifeflats', icon: 'instagram' },
  { label: 'E-mail', href: `mailto:${BUSINESS.email}`, icon: 'mail' },
];

const FOOTER_ICONS = {
  home: '<path d="m4 11 8-7 8 7"/><path d="M6 10v9h12v-9"/>',
  whatsapp: '<path d="M20.5 3.5A10 10 0 0 0 3.6 17l-1.6 5 5.1-1.6A10 10 0 1 0 20.5 3.5z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>',
  location: '<path d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z"/><circle cx="12" cy="11" r="2"/>',
};

function svgIcon(name, size = 16) {
  const path = FOOTER_ICONS[name] || FOOTER_ICONS.home;
  const fill = name === 'whatsapp' ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.75"';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" ${fill} aria-hidden="true">${path}</svg>`;
}

function linkItem(link) {
  return `
    <li>
      <a href="${pageHref(link.href)}">${link.label}</a>
    </li>
  `;
}

function navColumn(title, linksHtml) {
  return `
    <details class="site-footer__col" name="footer-nav" data-footer-col>
      <summary class="site-footer__col-summary">
        <span class="site-footer__col-line" aria-hidden="true"></span>
        <span class="site-footer__col-title">${title}</span>
        <span class="site-footer__col-chevron" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </summary>
      <ul>${linksHtml}</ul>
    </details>
  `;
}

class RFFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    const waLink = whatsappUrl('Olá! Gostaria de saber mais sobre os apartamentos para temporada em Recife.');

    const aptLinks = APARTAMENTOS.map((a) => `
      <li>
        <a href="${apartmentUrl(a.slug)}" title="${a.name}">${a.shortName || a.name}</a>
      </li>
    `).join('');

    const infoLinks = INFO_LINKS.map(linkItem).join('');
    const recifeLinks = RECIFE_LINKS.map(linkItem).join('');
    const socials = SOCIALS.map((s) => `
      <a href="${s.href}" ${s.href.startsWith('mailto:') ? '' : 'target="_blank" rel="noopener noreferrer"'} aria-label="${s.label}">
        ${svgIcon(s.icon, 18)}
      </a>
    `).join('');

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

              <div class="site-footer__socials" data-footer-reveal>
                <div class="site-footer__socials-row">${socials}</div>
              </div>

              <div class="site-footer__contact" data-footer-reveal>
                <a href="${waLink}" class="site-footer__contact-link" target="_blank" rel="noopener noreferrer">
                  ${svgIcon('whatsapp', 16)}
                  <span>${BUSINESS.phoneDisplay}</span>
                </a>
                <a href="mailto:${BUSINESS.email}" class="site-footer__contact-link">
                  ${svgIcon('mail', 16)}
                  <span>${BUSINESS.email}</span>
                </a>
                <a href="${MAPS_LINKS.place}" class="site-footer__contact-link" target="_blank" rel="noopener noreferrer">
                  ${svgIcon('location', 16)}
                  <span>${BUSINESS.neighborhood}, ${BUSINESS.city}/${BUSINESS.state}</span>
                </a>
              </div>
            </div>

            ${navColumn('Apartamentos', `${aptLinks}
              <li class="site-footer__see-all">
                <a href="${pageHref('./apartamentos.html')}">Ver todos →</a>
              </li>`)}

            ${navColumn('Informações', infoLinks)}

            ${navColumn('Conheça Recife', recifeLinks)}

          </div>
        </div>

        <div class="site-footer__bottom">
          <div class="container site-footer__bottom-inner">
            <p>© ${year} Recife Flats. Todos os direitos reservados.</p>
            <p class="site-footer__credit">
              Desenvolvido por
              <a href="https://vanessenceweb.com" target="_blank" rel="noopener noreferrer">VanessenceWeb</a>
            </p>
          </div>
        </div>
      </footer>
    `;

    this._syncColumns();
    this._animate();
  }

  disconnectedCallback() {
    this._mq?.removeEventListener('change', this._onMqChange);
  }

  _syncColumns() {
    this._mq = window.matchMedia('(min-width: 900px)');
    this._onMqChange = () => this._applyColumnState();
    this._mq.addEventListener('change', this._onMqChange);

    this.querySelectorAll('[data-footer-col]').forEach((details) => {
      details.addEventListener('toggle', () => {
        if (this._mq.matches && !details.open) details.open = true;
      });
    });

    this._applyColumnState();
  }

  _applyColumnState() {
    const desktop = this._mq.matches;
    this.querySelectorAll('[data-footer-col]').forEach((details) => {
      details.open = desktop;
    });
  }

  _animate() {
    const els = this.querySelectorAll('[data-footer-reveal], [data-footer-col]');
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
