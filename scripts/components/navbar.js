/**
 * <rf-navbar> — Header fixo com nav desktop + botões de ação.
 *
 * Eventos: rf-menu-toggle { open: boolean }
 */

import { pageHref } from '../data/site-structure.js';
import { whatsappUrl } from '../data/location.js';
import { getLang, setLang, initDocumentLang } from '../utils/i18n.js';
import { FLAG_BR_SVG, FLAG_US_SVG, GLOBE_SVG } from '../data/brand-icons.js';
import { getDesktopNavItems } from '../data/nav-items.js';

class RFNavbar extends HTMLElement {
  connectedCallback() {
    initDocumentLang();

    const overHero = this.hasAttribute('over-hero');
    const heroTarget = this.getAttribute('hero-target') || '#hero';
    const lang = getLang();
    const flagSvg = lang === 'en' ? FLAG_US_SVG : FLAG_BR_SVG;
    const langMenuLabel = lang === 'en' ? 'Choose language' : 'Escolher idioma';
    const desktopLinks = getDesktopNavItems().map((item) => `
      <li>
        <a href="${item.href}" class="desktop-nav__link">
          <span data-pt="${item.label}" data-en="${item.labelEn}">${lang === 'en' ? item.labelEn : item.label}</span>
        </a>
      </li>
    `).join('');

    this.innerHTML = /* html */`
      <header class="navbar ${overHero ? 'is-over-hero' : ''}" data-navbar>
        <div class="navbar__inner container">

          <a href="${pageHref('./index.html')}" class="navbar__logo" aria-label="Recife Flats — Início">
            <span class="navbar__logo-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="8"  width="7" height="10" rx="1" fill="white" fill-opacity="0.9"/>
                <rect x="11" y="5" width="7" height="13" rx="1" fill="white" fill-opacity="0.7"/>
                <rect x="5"  y="11" width="1.5" height="2" rx="0.3" fill="#6E2410"/>
                <rect x="8"  y="11" width="1.5" height="2" rx="0.3" fill="#6E2410"/>
                <rect x="13" y="8"  width="1.5" height="2" rx="0.3" fill="#6E2410"/>
                <rect x="16" y="8"  width="1.5" height="2" rx="0.3" fill="#6E2410"/>
                <rect x="13" y="11" width="1.5" height="2" rx="0.3" fill="#6E2410"/>
                <rect x="16" y="11" width="1.5" height="2" rx="0.3" fill="#6E2410"/>
              </svg>
            </span>
            <span class="navbar__logo-text">
              <span class="navbar__logo-name">Recife Flats</span>
              <span class="navbar__logo-sub">Temporada</span>
            </span>
          </a>

          <nav class="desktop-nav" aria-label="Navegação principal">
            <ul class="desktop-nav__list">${desktopLinks}</ul>
          </nav>

          <div class="navbar__actions">
            <div class="lang-switcher" data-lang-switcher>
              <button class="lang-toggle"
                      type="button"
                      data-lang-toggle
                      aria-haspopup="listbox"
                      aria-expanded="false"
                      aria-label="${langMenuLabel}"
                      title="${langMenuLabel}">
                ${GLOBE_SVG}
                <span class="lang-toggle__flag-wrap" data-lang-flag>${flagSvg}</span>
                <span class="lang-toggle__code" data-lang-code>${lang.toUpperCase()}</span>
                <svg class="lang-toggle__chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <div class="lang-menu" data-lang-menu role="listbox" hidden>
                <button type="button" class="lang-menu__option${lang === 'pt' ? ' is-active' : ''}" data-lang-option="pt" role="option" aria-selected="${lang === 'pt'}">
                  ${FLAG_BR_SVG}
                  <span>Português</span>
                </button>
                <button type="button" class="lang-menu__option${lang === 'en' ? ' is-active' : ''}" data-lang-option="en" role="option" aria-selected="${lang === 'en'}">
                  ${FLAG_US_SVG}
                  <span>English</span>
                </button>
              </div>
            </div>

            <a href="${whatsappUrl()}" class="navbar__whatsapp" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
              <span class="navbar__whatsapp-label">WhatsApp</span>
            </a>

            <button class="menu-toggle"
                    data-menu-toggle
                    type="button"
                    aria-label="Abrir menu de navegação"
                    aria-expanded="false"
                    aria-controls="rf-menu">
              <span class="menu-toggle__icon" aria-hidden="true">
                <span></span><span></span><span></span>
              </span>
            </button>
          </div>
        </div>
      </header>
    `;

    this._navbar = this.querySelector('[data-navbar]');
    this._toggle = this.querySelector('[data-menu-toggle]');
    this._langBtn = this.querySelector('[data-lang-toggle]');
    this._langCode = this.querySelector('[data-lang-code]');
    this._langFlag = this.querySelector('[data-lang-flag]');
    this._langMenu = this.querySelector('[data-lang-menu]');
    this._langRoot = this.querySelector('[data-lang-switcher]');
    this._heroEl = document.querySelector(heroTarget);

    if (this._heroEl) {
      this._observer = new IntersectionObserver(
        ([entry]) => {
          const over = entry.isIntersecting;
          this._navbar.classList.toggle('is-over-hero', over);
          this._navbar.classList.toggle('is-scrolled', !over);
        },
        { threshold: 0.05 },
      );
      this._observer.observe(this._heroEl);
    } else {
      this._navbar.classList.add('is-scrolled');
    }

    const closeLangMenu = () => {
      this._langMenu?.setAttribute('hidden', '');
      this._langBtn?.setAttribute('aria-expanded', 'false');
    };

    const openLangMenu = () => {
      this._langMenu?.removeAttribute('hidden');
      this._langBtn?.setAttribute('aria-expanded', 'true');
    };

    const applyLangUi = (next) => {
      if (this._langCode) this._langCode.textContent = next.toUpperCase();
      if (this._langFlag) this._langFlag.innerHTML = next === 'en' ? FLAG_US_SVG : FLAG_BR_SVG;
      this._langMenu?.querySelectorAll('[data-lang-option]').forEach((btn) => {
        const active = btn.dataset.langOption === next;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
      });
      this.querySelectorAll('.desktop-nav__link [data-pt][data-en]').forEach((el) => {
        el.textContent = next === 'en' ? el.dataset.en : el.dataset.pt;
      });
      const label = next === 'en' ? 'Choose language' : 'Escolher idioma';
      this._langBtn?.setAttribute('aria-label', label);
      this._langBtn?.setAttribute('title', label);
    };

    this._langBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = this._langBtn.getAttribute('aria-expanded') === 'true';
      if (open) closeLangMenu();
      else openLangMenu();
    });

    this._langMenu?.querySelectorAll('[data-lang-option]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = setLang(btn.dataset.langOption);
        applyLangUi(next);
        closeLangMenu();
      });
    });

    this._onDocClick = (e) => {
      if (!this._langRoot?.contains(e.target)) closeLangMenu();
    };
    document.addEventListener('click', this._onDocClick);

    this._toggle.addEventListener('click', () => {
      const isOpen = this._toggle.classList.toggle('is-open');
      this._toggle.setAttribute('aria-expanded', String(isOpen));
      window.dispatchEvent(new CustomEvent('rf-menu-toggle', { detail: { open: isOpen } }));
    });

    this._unsync = (e) => {
      const open = e.detail.open;
      this._toggle.classList.toggle('is-open', open);
      this._toggle.setAttribute('aria-expanded', String(open));
    };
    window.addEventListener('rf-menu-state', this._unsync);

    this._onLangChange = (e) => applyLangUi(e.detail.lang);
    window.addEventListener('rf-lang-change', this._onLangChange);
  }

  disconnectedCallback() {
    this._observer?.disconnect();
    document.removeEventListener('click', this._onDocClick);
    window.removeEventListener('rf-menu-state', this._unsync);
    window.removeEventListener('rf-lang-change', this._onLangChange);
  }
}

customElements.define('rf-navbar', RFNavbar);
