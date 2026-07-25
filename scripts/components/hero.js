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

        <div class="hero__trust-bar" data-hero-trust aria-label="Destaques">
          <div class="container hero__trust-inner">
            <div class="hero__trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span><strong>4.9</strong> no Google</span>
            </div>
            <div class="hero__trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2v20"/><path d="M2 12c2-8 8-10 10-10s8 2 10 10"/></svg>
              <span><strong>100m</strong> da praia</span>
            </div>
            <div class="hero__trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>
              <span><strong>Wi-Fi</strong> 300Mbps</span>
            </div>
            <div class="hero__trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span><strong>Reserva</strong> direta</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  _animate() {
    const reduce = prefersReducedMotion();
    const titleEl = this.querySelector('[data-hero-title]');
    const eyebrowEl = this.querySelector('[data-hero-eyebrow]');
    const descEl = this.querySelector('[data-hero-desc]');
    const trustEl = this.querySelector('[data-hero-trust]');
    const ctaEl = this.querySelector('[data-hero-cta]');
    const searchEl = this.querySelector('[data-hero-search]');

    const revealEls = [eyebrowEl, titleEl, descEl, trustEl, ctaEl, searchEl].filter(Boolean);

    if (reduce) {
      revealEls.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const tl = gsap.timeline({ delay: 0.12 });
    if (eyebrowEl) tl.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0);
    if (titleEl) tl.to(titleEl, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 0.08);
    if (descEl) tl.to(descEl, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.22);
    if (trustEl) tl.to(trustEl, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.32);
    if (ctaEl) tl.to(ctaEl, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.4);
    if (searchEl) tl.to(searchEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.48);
  }

  _applyLang(lang) {
    applyHeroCopy(this, lang);

    const copy = getHeroCopy(lang);
    const waBtn = this.querySelector('[data-hero-wa]');
    if (waBtn) waBtn.href = whatsappUrl(copy.whatsappMsg);
  }
}

customElements.define('rf-hero', RFHero);
