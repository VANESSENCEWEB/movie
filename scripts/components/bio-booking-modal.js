/**
 * <rf-bio-booking-modal> — Modal de reserva estilo HostBio.
 *
 * Abre via: window.dispatchEvent(new CustomEvent('rf-bio-booking-open', { detail: { slug } }))
 */

import { getApartmentBySlug } from '../data/apartamentos.js';
import { whatsappUrl } from '../data/location.js';
import {
  buildBioWhatsAppMessage,
  defaultCheckin,
  defaultCheckout,
  formatDateBR,
  formatPhoneBR,
  nightsBetween,
  nightsLabel,
} from '../utils/bio-booking.js';

class RFBioBookingModal extends HTMLElement {
  connectedCallback() {
    this._apt = null;
    this._state = this._emptyState();

    this.innerHTML = `
      <div class="bio-modal" data-bio-modal role="dialog" aria-modal="true" aria-labelledby="bio-modal-title" hidden>
        <div class="bio-modal__backdrop" data-bio-close></div>
        <div class="bio-modal__sheet">
          <header class="bio-modal__header">
            <span class="bio-modal__title" id="bio-modal-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
              Selecionar datas
            </span>
            <button type="button" class="bio-modal__close" data-bio-close aria-label="Fechar">✕</button>
          </header>

          <form class="bio-modal__form" data-bio-form novalidate>
            <p class="bio-modal__apt" data-bio-apt-label hidden></p>

            <div class="bio-modal__dates" data-bio-dates-summary>
              <button type="button" class="bio-modal__dates-btn" data-bio-toggle-dates>
                <span data-bio-dates-text>—</span>
                <span class="bio-modal__dates-change">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                  </svg>
                  Alterar
                </span>
              </button>
              <span class="bio-modal__nights" data-bio-nights-badge>—</span>
            </div>

            <div class="bio-modal__date-fields" data-bio-date-fields hidden>
              <label class="bio-modal__field">
                <span class="bio-modal__label">Entrada</span>
                <input type="date" name="checkin" data-bio-checkin required>
              </label>
              <label class="bio-modal__field">
                <span class="bio-modal__label">Saída</span>
                <input type="date" name="checkout" data-bio-checkout required>
              </label>
            </div>

            <div class="bio-modal__steppers">
              <div class="bio-modal__stepper">
                <span class="bio-modal__stepper-label">Quartos</span>
                <div class="bio-modal__stepper-ctrl">
                  <button type="button" data-bio-dec="rooms" aria-label="Menos quartos">−</button>
                  <span data-bio-val="rooms">1</span>
                  <button type="button" data-bio-inc="rooms" aria-label="Mais quartos">+</button>
                </div>
              </div>
              <div class="bio-modal__stepper">
                <span class="bio-modal__stepper-label">Adultos</span>
                <div class="bio-modal__stepper-ctrl">
                  <button type="button" data-bio-dec="adults" aria-label="Menos adultos">−</button>
                  <span data-bio-val="adults">2</span>
                  <button type="button" data-bio-inc="adults" aria-label="Mais adultos">+</button>
                </div>
              </div>
            </div>

            <div class="bio-modal__lead">
              <label class="bio-modal__field">
                <span class="bio-modal__label">Seu nome *</span>
                <input type="text" name="name" data-bio-name placeholder="Ex: Maria Silva" required autocomplete="name">
              </label>
              <label class="bio-modal__field">
                <span class="bio-modal__label">Telefone / WhatsApp *</span>
                <input type="tel" name="phone" data-bio-phone placeholder="(81) 99999-9999" required autocomplete="tel">
              </label>
              <label class="bio-modal__field">
                <span class="bio-modal__label">E-mail <span class="bio-modal__optional">(opcional)</span></span>
                <input type="email" name="email" data-bio-email placeholder="voce@exemplo.com" autocomplete="email">
              </label>
            </div>

            <button type="submit" class="bio-modal__submit" data-bio-submit disabled>
              Ver disponibilidade
            </button>
          </form>
        </div>
      </div>
    `;

    this._modal = this.querySelector('[data-bio-modal]');
    this._form = this.querySelector('[data-bio-form]');
    this._checkin = this.querySelector('[data-bio-checkin]');
    this._checkout = this.querySelector('[data-bio-checkout]');
    this._submit = this.querySelector('[data-bio-submit]');

    this.addEventListener('click', (e) => this._onClick(e));
    this._form.addEventListener('submit', (e) => this._onSubmit(e));
    this._form.addEventListener('input', () => this._sync());
    this._checkin.addEventListener('change', () => this._onCheckinChange());

    this._phone = this.querySelector('[data-bio-phone]');
    this._phone.addEventListener('input', () => {
      this._phone.value = formatPhoneBR(this._phone.value);
      this._sync();
    });

    window.addEventListener('rf-bio-booking-open', (e) => this.open(e.detail?.slug));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._modal && !this._modal.hidden) this.close();
    });
  }

  _emptyState() {
    const checkin = defaultCheckin();
    return {
      rooms: 1,
      adults: 2,
      checkin,
      checkout: defaultCheckout(checkin),
      showDateFields: false,
    };
  }

  open(slug) {
    const apt = getApartmentBySlug(slug);
    if (!apt) return;

    this._apt = apt;
    this._state = {
      ...this._emptyState(),
      adults: Math.min(2, apt.guests),
      rooms: Math.min(1, apt.bedrooms) || 1,
    };

    const aptLabel = this.querySelector('[data-bio-apt-label]');
    if (aptLabel) {
      aptLabel.textContent = apt.name;
      aptLabel.hidden = false;
    }

    this._checkin.value = this._state.checkin;
    this._checkout.value = this._state.checkout;
    this._checkout.min = this._state.checkin;
    this.querySelector('[data-bio-name]').value = '';
    this.querySelector('[data-bio-email]').value = '';
    this._phone.value = '';

    this._renderSteppers();
    this._sync();

    this._modal.hidden = false;
    requestAnimationFrame(() => this._modal.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    this.querySelector('[data-bio-name]')?.focus();
  }

  close() {
    this._modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { this._modal.hidden = true; }, 280);
  }

  _onClick(e) {
    if (e.target.closest('[data-bio-close]')) {
      this.close();
      return;
    }

    const inc = e.target.closest('[data-bio-inc]');
    const dec = e.target.closest('[data-bio-dec]');
    if (inc || dec) {
      const btn = inc || dec;
      const key = btn.dataset.bioInc || btn.dataset.bioDec;
      const delta = inc ? 1 : -1;
      const max = key === 'adults' ? (this._apt?.guests || 6) : (this._apt?.bedrooms || 2);
      const min = 1;
      this._state[key] = Math.min(max, Math.max(min, this._state[key] + delta));
      this._renderSteppers();
      this._sync();
      return;
    }

    if (e.target.closest('[data-bio-toggle-dates]')) {
      this._state.showDateFields = !this._state.showDateFields;
      this.querySelector('[data-bio-date-fields]').hidden = !this._state.showDateFields;
    }
  }

  _onCheckinChange() {
    if (this._checkout.value <= this._checkin.value) {
      const d = new Date(`${this._checkin.value}T12:00:00`);
      d.setDate(d.getDate() + 1);
      this._checkout.value = d.toISOString().slice(0, 10);
    }
    this._checkout.min = this._checkin.value;
    this._state.checkin = this._checkin.value;
    this._state.checkout = this._checkout.value;
    this._sync();
  }

  _renderSteppers() {
    this.querySelector('[data-bio-val="rooms"]').textContent = String(this._state.rooms);
    this.querySelector('[data-bio-val="adults"]').textContent = String(this._state.adults);
  }

  _sync() {
    this._state.checkin = this._checkin.value;
    this._state.checkout = this._checkout.value;

    const nights = nightsBetween(this._state.checkin, this._state.checkout);
    const datesText = this.querySelector('[data-bio-dates-text]');
    const nightsBadge = this.querySelector('[data-bio-nights-badge]');

    if (datesText && this._state.checkin && this._state.checkout) {
      datesText.textContent = `${formatDateBR(this._state.checkin)} → ${formatDateBR(this._state.checkout)}`;
    }
    if (nightsBadge) nightsBadge.textContent = nightsLabel(nights);

    const name = this.querySelector('[data-bio-name]').value.trim();
    const phone = this._phone.value.replace(/\D/g, '');
    const valid = name.length >= 2 && phone.length >= 10
      && this._state.checkin && this._state.checkout
      && nights > 0;

    this._submit.disabled = !valid;
  }

  _onSubmit(e) {
    e.preventDefault();
    if (!this._apt || this._submit.disabled) return;

    const msg = buildBioWhatsAppMessage({
      apt: this._apt,
      checkin: this._state.checkin,
      checkout: this._state.checkout,
      rooms: this._state.rooms,
      adults: this._state.adults,
      name: this.querySelector('[data-bio-name]').value.trim(),
      phone: this._phone.value.trim(),
      email: this.querySelector('[data-bio-email]').value.trim(),
    });

    window.open(whatsappUrl(msg), '_blank', 'noopener,noreferrer');
    this.close();
  }
}

customElements.define('rf-bio-booking-modal', RFBioBookingModal);
