/**
 * <rf-menu> — Menu mobile compacto (drawer lateral).
 *
 * Escuta 'rf-menu-toggle' da navbar e emite 'rf-menu-state'.
 */

import { BUSINESS, whatsappUrl } from '../data/location.js';
import { getLang, setLang } from '../utils/i18n.js';
import { FLAG_BR_SVG, FLAG_US_SVG } from '../data/brand-icons.js';
import { getNavItems, navIcon } from '../data/nav-items.js';

class RFMenu extends HTMLElement {
  connectedCallback() {
    this._isOpen = false;
    const lang = getLang();
    const navItems = getNavItems();

    const links = navItems.map((item) => `
      <li>
        <a href="${item.href}" class="mobile-nav__link" data-menu-link>
          <span class="mobile-nav__icon">${navIcon(item.icon)}</span>
          <span class="mobile-nav__label" data-pt="${item.label}" data-en="${item.labelEn}">${lang === 'en' ? item.labelEn : item.label}</span>
          ${item.badge ? `<span class="mobile-nav__badge">${item.badge}</span>` : ''}
        </a>
      </li>
    `).join('');

    this.innerHTML = `
      <div class="menu-backdrop" data-menu-backdrop hidden aria-hidden="true"></div>

      <aside class="mobile-menu"
             id="rf-menu"
             role="dialog"
             aria-modal="true"
             aria-label="Menu de navegação"
             aria-hidden="true"
             data-menu>

        <header class="mobile-menu__header">
          <span class="mobile-menu__title">Menu</span>
          <button type="button" class="mobile-menu__close" data-menu-close aria-label="Fechar menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </header>

        <nav class="mobile-menu__nav" aria-label="Menu principal">
          <ul class="mobile-nav__list">${links}</ul>
        </nav>

        <div class="mobile-menu__stats">
          <div class="mobile-menu__stat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span data-pt="5000+ Hóspedes" data-en="5000+ Guests">5000+ Hóspedes</span>
          </div>
          <div class="mobile-menu__stat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span data-pt="4.9 Avaliação" data-en="4.9 Rating">4.9 Avaliação</span>
          </div>
        </div>

        <div class="mobile-menu__controls">
          <button type="button" class="mobile-menu__control" data-menu-lang>
            <span class="mobile-menu__control-left">
              <span class="mobile-menu__emoji" aria-hidden="true">🌐</span>
              <span data-pt="Idioma" data-en="Language">Idioma</span>
            </span>
            <span class="mobile-menu__control-right">
              <span data-lang-display>${lang.toUpperCase()}</span>
              ${lang === 'en' ? FLAG_US_SVG : FLAG_BR_SVG}
            </span>
          </button>
          <a href="${whatsappUrl()}" class="mobile-menu__control mobile-menu__control--wa" target="_blank" rel="noopener noreferrer" data-menu-link>
            <span class="mobile-menu__control-left">
              <span class="mobile-menu__emoji" aria-hidden="true">💬</span>
              <span>WhatsApp</span>
            </span>
            <span class="mobile-menu__control-right">
              <span data-pt="Falar agora" data-en="Chat now">Falar agora</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </a>
        </div>

        <footer class="mobile-menu__footer">
          <span>© ${new Date().getFullYear()} Recife Flats</span>
          <a href="tel:${BUSINESS.phone}">${BUSINESS.phoneDisplay}</a>
        </footer>
      </aside>
    `;

    this._menuEl = this.querySelector('[data-menu]');
    this._backdrop = this.querySelector('[data-menu-backdrop]');

    this.querySelector('[data-menu-close]').addEventListener('click', () => this.close());
    this._backdrop.addEventListener('click', () => this.close());
    this.querySelectorAll('[data-menu-link]').forEach((a) =>
      a.addEventListener('click', () => this.close()),
    );

    this.querySelector('[data-menu-lang]')?.addEventListener('click', () => {
      const next = setLang(getLang() === 'pt' ? 'en' : 'pt');
      this._applyMenuLang(next);
    });

    window.addEventListener('rf-menu-toggle', this._onToggle = (e) => {
      e.detail.open ? this.open() : this.close();
    });

    document.addEventListener('keydown', this._onKey = (e) => {
      if (e.key === 'Escape' && this._isOpen) this.close();
    });

    this._onLangChange = (e) => this._applyMenuLang(e.detail.lang);
    window.addEventListener('rf-lang-change', this._onLangChange);
  }

  _applyMenuLang(lang) {
    this.querySelectorAll('[data-lang-display]').forEach((el) => {
      el.textContent = lang.toUpperCase();
    });
    this.querySelectorAll('[data-pt][data-en]').forEach((el) => {
      el.textContent = lang === 'en' ? el.dataset.en : el.dataset.pt;
    });
    const langBtn = this.querySelector('[data-menu-lang] .mobile-menu__control-right');
    if (langBtn) {
      langBtn.innerHTML = `<span data-lang-display>${lang.toUpperCase()}</span>${lang === 'en' ? FLAG_US_SVG : FLAG_BR_SVG}`;
    }
  }

  disconnectedCallback() {
    window.removeEventListener('rf-menu-toggle', this._onToggle);
    document.removeEventListener('keydown', this._onKey);
    window.removeEventListener('rf-lang-change', this._onLangChange);
  }

  open() {
    if (this._isOpen) return;
    this._isOpen = true;
    this._menuEl.classList.add('is-open');
    this._menuEl.setAttribute('aria-hidden', 'false');
    this._backdrop.hidden = false;
    this._backdrop.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => this._backdrop.classList.add('is-visible'));
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('rf-menu-state', { detail: { open: true } }));
  }

  close() {
    if (!this._isOpen) return;
    this._isOpen = false;
    this._menuEl.classList.remove('is-open');
    this._menuEl.setAttribute('aria-hidden', 'true');
    this._backdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
    window.setTimeout(() => {
      if (!this._isOpen) this._backdrop.hidden = true;
    }, 280);
    window.dispatchEvent(new CustomEvent('rf-menu-state', { detail: { open: false } }));
  }
}

customElements.define('rf-menu', RFMenu);
