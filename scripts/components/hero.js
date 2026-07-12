/**
 * <rf-hero> — Hero com vídeo dia/noite, badges, CTAs e buscador.
 *
 * Suporta vídeos diferentes para dia e noite, carregados via API
 * (JSON estático ou CMS) com fallback nos atributos HTML.
 *
 * API (duas chamadas em paralelo):
 *   GET {api-base}/hero/{hero-id}/day.json
 *   GET {api-base}/hero/{hero-id}/night.json
 */

import { splitTextIntoLetters } from '../utils/split-text.js';
import { prefersReducedMotion } from '../utils/dom.js';
import { whatsappUrl } from '../data/location.js';
import { getTimeOfDay, getTimeOptionsFromElement } from '../utils/time-of-day.js';
import {
  applyVideoAsset,
  fetchHeroAssetsByPeriod,
  getFallbackAssetsFromElement,
  pickActiveAsset,
} from '../modules/hero-assets.js';
import { applyHeroCopy, getHeroCopy, getLang } from '../utils/i18n.js';
import { renderHeroWaves } from '../utils/wave-divider.js';

const PERIOD_CHECK_MS = 60_000;

class RFHero extends HTMLElement {
  connectedCallback() {
    this._periodCheckInterval = null;
    this._currentPeriod = null;
    this._assets = null;
    this._onLangChange = (e) => this._applyLang(e.detail.lang);
    window.addEventListener('rf-lang-change', this._onLangChange);
    this._init();
  }

  disconnectedCallback() {
    if (this._periodCheckInterval) {
      clearInterval(this._periodCheckInterval);
      this._periodCheckInterval = null;
    }
    window.removeEventListener('rf-lang-change', this._onLangChange);
  }

  async _init() {
    const timeOptions = getTimeOptionsFromElement(this);
    const period = getTimeOfDay(timeOptions);
    this._currentPeriod = period;

    const fallback = getFallbackAssetsFromElement(this);
    const initial = pickActiveAsset(fallback, period);

    this._renderShell(initial);
    this.dataset.period = period;
    if (getLang() === 'en') this._applyLang('en');
    this._animate();
    this._bindVideoFallback(fallback);

    const heroId = this.getAttribute('hero-id') || 'home';
    const apiBase = this.getAttribute('api-base');

    if (apiBase === '' || apiBase === 'false') {
      this._assets = fallback;
      this._startPeriodWatcher(timeOptions);
      return;
    }

    try {
      const assets = await fetchHeroAssetsByPeriod(heroId, apiBase || './data');
      this._assets = assets;

      const active = pickActiveAsset(assets, period);
      applyVideoAsset(
        this.querySelector('.hero__video'),
        this.querySelector('.hero__poster'),
        active
      );
      this._bindVideoFallback(assets);
    } catch (err) {
      console.warn('[rf-hero] API unavailable, using HTML fallbacks', err);
      this._assets = fallback;
      this._bindVideoFallback(fallback);
    }

    this._startPeriodWatcher(timeOptions);
  }

  /** Se o vídeo da noite não existir (404), usa o do dia automaticamente */
  _bindVideoFallback(assets) {
    const videoEl = this.querySelector('.hero__video');
    const posterEl = this.querySelector('.hero__poster');
    if (!videoEl || !assets) return;

    const onVideoError = () => {
      const dayAsset = pickActiveAsset(assets, 'day');
      if (!dayAsset?.video) return;

      const mp4 = videoEl.querySelector('source[type="video/mp4"]');
      const current = mp4?.getAttribute('src') || '';
      if (current === dayAsset.video || current.endsWith(dayAsset.video.replace(/^\.\//, ''))) return;

      console.warn('[rf-hero] Vídeo indisponível — fallback:', dayAsset.video);
      applyVideoAsset(videoEl, posterEl, dayAsset);
    };

    videoEl.addEventListener('error', onVideoError, { once: true });
    videoEl.querySelectorAll('source').forEach((source) => {
      source.addEventListener('error', onVideoError, { once: true });
    });
  }

  _startPeriodWatcher(timeOptions) {
    this._periodCheckInterval = setInterval(() => {
      const period = getTimeOfDay(timeOptions);
      if (period === this._currentPeriod || !this._assets) return;

      this._currentPeriod = period;
      this.dataset.period = period;

      const active = pickActiveAsset(this._assets, period);
      applyVideoAsset(
        this.querySelector('.hero__video'),
        this.querySelector('.hero__poster'),
        active
      );
    }, PERIOD_CHECK_MS);
  }

  _renderShell(asset) {
    const lang = getLang();
    const copy = getHeroCopy(lang);
    const eyebrow = this.getAttribute('eyebrow') || copy.eyebrow;
    const title = this.getAttribute('title') || this.getAttribute('heading') || copy.title;
    const description = this.getAttribute('description') || copy.description;
    const noSearch = this.hasAttribute('no-search');
    const waLink = whatsappUrl(copy.whatsappMsg);

    const video = asset?.video || '';
    const videoWebm = asset?.videoWebm || '';
    const poster = asset?.poster || '';

    this.innerHTML = `
      <section class="hero" id="hero" aria-label="Apresentação">

        ${poster ? `<img class="hero__poster" src="${poster}" alt="" loading="eager" aria-hidden="true">` : ''}

        ${video ? `
          <video class="hero__video"
                 autoplay muted loop playsinline preload="metadata"
                 ${poster ? `poster="${poster}"` : ''}
                 aria-hidden="true">
            ${videoWebm ? `<source src="${videoWebm}" type="video/webm">` : ''}
            <source src="${video}" type="video/mp4">
          </video>
        ` : ''}

        <div class="hero__overlay"></div>
        <div class="hero__grain"></div>

        <div class="hero__ticker" aria-hidden="true">
          <div class="hero__ticker-track">
            <span class="hero__ticker-item">🏠 Flats mobiliados em Boa Viagem</span>
            <span class="hero__ticker-item">🌊 A 100m da praia</span>
            <span class="hero__ticker-item">📶 WiFi 300Mbps incluído</span>
            <span class="hero__ticker-item">🏊 Piscina e academia</span>
            <span class="hero__ticker-item">🔒 Segurança 24h</span>
            <span class="hero__ticker-item">⭐ Nota 4.9 no Google</span>
            <span class="hero__ticker-item">🏠 Flats mobiliados em Boa Viagem</span>
            <span class="hero__ticker-item">🌊 A 100m da praia</span>
            <span class="hero__ticker-item">📶 WiFi 300Mbps incluído</span>
            <span class="hero__ticker-item">🏊 Piscina e academia</span>
            <span class="hero__ticker-item">🔒 Segurança 24h</span>
            <span class="hero__ticker-item">⭐ Nota 4.9 no Google</span>
          </div>
        </div>

        <div class="hero__beach" aria-hidden="true">
          <svg class="hero__beach-palm hero__beach-palm--left" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 118V55" stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-linecap="round"/>
            <path d="M40 55C40 55 12 48 8 28C8 28 28 38 40 55Z" fill="rgba(255,255,255,0.12)"/>
            <path d="M40 55C40 55 68 42 72 22C72 22 52 34 40 55Z" fill="rgba(255,255,255,0.1)"/>
            <path d="M40 62C40 62 20 58 16 44C16 44 30 52 40 62Z" fill="rgba(255,255,255,0.08)"/>
            <path d="M40 62C40 62 60 56 64 40C64 40 50 50 40 62Z" fill="rgba(255,255,255,0.08)"/>
          </svg>
          <svg class="hero__beach-wave" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 28C25 18 50 38 75 28C100 18 125 38 150 28C175 18 190 32 200 28V40H0V28Z" fill="rgba(27,154,170,0.25)"/>
            <path d="M0 32C30 22 60 36 90 30C120 24 150 36 180 30C190 28 195 34 200 32V40H0V32Z" fill="rgba(255,255,255,0.08)"/>
          </svg>
          <svg class="hero__beach-palm hero__beach-palm--right" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 118V55" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round"/>
            <path d="M40 55C40 55 12 48 8 28C8 28 28 38 40 55Z" fill="rgba(255,255,255,0.1)"/>
            <path d="M40 55C40 55 68 42 72 22C72 22 52 34 40 55Z" fill="rgba(255,255,255,0.08)"/>
          </svg>
        </div>

        <div class="hero__container container">
          <div class="hero__text">
            <span class="eyebrow hero__eyebrow" data-hero-eyebrow>${eyebrow}</span>

            <h1 class="hero__title" data-hero-title>${title}</h1>

            ${description ? `
              <p class="hero__description" data-hero-desc>${description}</p>
            ` : ''}

            <div class="hero__cta" data-hero-cta>
              <a href="./apartamentos.html" class="btn btn--shiny">
                <span>${copy.ctaPrimary}</span>
              </a>
              <a href="${waLink}" class="btn btn--outline-hero" target="_blank" rel="noopener noreferrer" data-hero-wa>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A10 10 0 0 0 3.6 17l-1.6 5 5.1-1.6A10 10 0 1 0 20.5 3.5z"/></svg>
                ${copy.ctaWhatsapp}
              </a>
            </div>

            ${noSearch ? '' : `
              <div class="hero__search" data-hero-search>
                <rf-booking-search variant="hero" action="./apartamentos.html"></rf-booking-search>
              </div>
            `}
          </div>
        </div>

        ${renderHeroWaves()}
      </section>
    `;
  }

  _animate() {
    const reduce = prefersReducedMotion();
    const titleEl = this.querySelector('[data-hero-title]');
    const eyebrowEl = this.querySelector('[data-hero-eyebrow]');
    const descEl = this.querySelector('[data-hero-desc]');
    const ctaEl = this.querySelector('[data-hero-cta]');
    const searchEl = this.querySelector('[data-hero-search]');

    const letters = titleEl ? splitTextIntoLetters(titleEl) : [];
    const revealEls = [eyebrowEl, descEl, ctaEl, searchEl].filter(Boolean);

    if (reduce) {
      revealEls.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      letters.forEach((l) => { l.style.opacity = '1'; l.style.transform = 'none'; });
      return;
    }

    const tl = gsap.timeline({ delay: 0.15 });

    if (letters.length) {
      tl.to(letters, {
        opacity: 1, y: 0,
        duration: 0.5, ease: 'power2.out',
        stagger: 0.022,
      }, 0);
    }
    if (eyebrowEl) tl.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.1);
    if (descEl) tl.to(descEl, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.35);
    if (ctaEl) tl.to(ctaEl, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.45);
    if (searchEl) tl.to(searchEl, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.55);
  }

  _applyLang(lang) {
    applyHeroCopy(this, lang);

    const copy = getHeroCopy(lang);
    const waBtn = this.querySelector('[data-hero-wa]');
    if (waBtn) waBtn.href = whatsappUrl(copy.whatsappMsg);
  }
}

customElements.define('rf-hero', RFHero);
