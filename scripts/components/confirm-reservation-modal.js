/**
 * <rf-confirm-reservation-modal> — Wizard para hóspedes Booking confirmarem a reserva.
 *
 * Abre via: window.dispatchEvent(new CustomEvent('rf-confirm-reservation-open'))
 */

import { APARTAMENTOS } from '../data/apartamentos.js';
import { whatsappUrl } from '../data/location.js';
import { buildConfirmReservationMessage } from '../utils/confirm-reservation.js';

const STEPS = [
  {
    id: 'name',
    title: 'Como você se chama?',
    hint: 'Digite o nome que consta na sua reserva',
    icon: 'user',
    field: 'name',
    placeholder: 'Ex: Maria da Silva',
    inputType: 'text',
  },
  {
    id: 'code',
    title: 'Número da reserva ou outro dado',
    hint: 'Informe o número da reserva ou e-mail/telefone usado no Booking',
    icon: 'clipboard',
    field: 'reservationCode',
    placeholder: 'Ex: 6556 ou seu e-mail',
    inputType: 'text',
  },
  {
    id: 'apartment',
    title: 'Qual apartamento você reservou?',
    hint: 'Selecione o apartamento que aparece na sua reserva',
    icon: 'home',
    field: 'apartmentSlug',
    kind: 'apartments',
  },
  {
    id: 'review',
    title: 'Revise suas informações',
    hint: 'Tudo correto? Enviaremos para o WhatsApp da proprietária',
    icon: 'review',
    kind: 'review',
  },
];

const ICONS = {
  user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
  clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/>',
  review: '<path d="M14 2H6a2 2 0 0 0-2 2v16l8-4 8 4V4a2 2 0 0 0-2-2Z"/>',
};

function stepIcon(name) {
  const path = ICONS[name] || ICONS.user;
  return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

/** @param {string} str */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function apartmentOptions(selectedSlug) {
  return APARTAMENTOS.map((apt) => `
    <button type="button"
            class="confirm-modal__apt${apt.slug === selectedSlug ? ' is-selected' : ''}"
            data-confirm-apt="${apt.slug}"
            aria-pressed="${apt.slug === selectedSlug}">
      <span class="confirm-modal__apt-name">${apt.name}</span>
      <span class="confirm-modal__apt-nb">${apt.neighborhood}</span>
      ${apt.slug === selectedSlug ? '<span class="confirm-modal__apt-check">✓ Selecionado</span>' : ''}
    </button>
  `).join('');
}

class RFConfirmReservationModal extends HTMLElement {
  /** @type {number} */
  _step = 0;

  /** @type {{ name: string, reservationCode: string, apartmentSlug: string }} */
  _data = { name: '', reservationCode: '', apartmentSlug: '' };

  connectedCallback() {
    this.innerHTML = `
      <div class="confirm-modal" data-confirm-modal role="dialog" aria-modal="true"
           aria-labelledby="confirm-modal-title" hidden>
        <div class="confirm-modal__backdrop" data-confirm-close></div>
        <div class="confirm-modal__panel">
          <header class="confirm-modal__header">
            <div class="confirm-modal__header-text">
              <span class="confirm-modal__brand">Booking.com</span>
              <h2 class="confirm-modal__title" id="confirm-modal-title">Confirmar Minha Reserva</h2>
            </div>
            <button type="button" class="confirm-modal__close" data-confirm-close aria-label="Fechar">✕</button>
          </header>

          <ol class="confirm-modal__progress" data-confirm-progress aria-label="Progresso"></ol>

          <div class="confirm-modal__body" data-confirm-body></div>

          <footer class="confirm-modal__footer">
            <p class="confirm-modal__note">Sem taxas extras — fale direto com a proprietária</p>
            <div class="confirm-modal__actions" data-confirm-actions></div>
          </footer>
        </div>
      </div>
    `;

    this._modal = this.querySelector('[data-confirm-modal]');
    this._body = this.querySelector('[data-confirm-body]');
    this._progress = this.querySelector('[data-confirm-progress]');
    this._actions = this.querySelector('[data-confirm-actions]');

    this.addEventListener('click', (e) => this._onClick(e));
    this._openHandler = () => this.open();
    window.addEventListener('rf-confirm-reservation-open', this._openHandler);
    this._keyHandler = (e) => {
      if (e.key === 'Escape' && !this._modal.hidden) this.close();
    };
    document.addEventListener('keydown', this._keyHandler);

    this._render();
  }

  disconnectedCallback() {
    window.removeEventListener('rf-confirm-reservation-open', this._openHandler);
    document.removeEventListener('keydown', this._keyHandler);
  }

  open() {
    this._step = 0;
    this._data = { name: '', reservationCode: '', apartmentSlug: '' };
    this._render();
    this._modal.hidden = false;
    requestAnimationFrame(() => this._modal.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    this.querySelector('input, button')?.focus();
  }

  close() {
    this._modal.classList.remove('is-open');
    this._modal.hidden = true;
    document.body.style.overflow = '';
  }

  _onClick(e) {
    if (e.target.closest('[data-confirm-close]')) {
      this.close();
      return;
    }

    const aptBtn = e.target.closest('[data-confirm-apt]');
    if (aptBtn) {
      this._data.apartmentSlug = aptBtn.dataset.confirmApt;
      this._render();
      return;
    }

    if (e.target.closest('[data-confirm-back]')) {
      this._step = Math.max(0, this._step - 1);
      this._render();
      return;
    }

    if (e.target.closest('[data-confirm-next]')) {
      if (!this._validateCurrent()) return;
      this._syncInputs();
      this._step = Math.min(STEPS.length - 1, this._step + 1);
      this._render();
      return;
    }

    if (e.target.closest('[data-confirm-send]')) {
      this._sendWhatsApp();
    }
  }

  _syncInputs() {
    const nameInput = this.querySelector('[data-confirm-field="name"]');
    const codeInput = this.querySelector('[data-confirm-field="reservationCode"]');
    if (nameInput) this._data.name = nameInput.value.trim();
    if (codeInput) this._data.reservationCode = codeInput.value.trim();
  }

  _validateCurrent() {
    this._syncInputs();
    const step = STEPS[this._step];

    if (step.field === 'name' && !this._data.name) {
      this._shakeField('name');
      return false;
    }
    if (step.field === 'reservationCode' && !this._data.reservationCode) {
      this._shakeField('reservationCode');
      return false;
    }
    if (step.kind === 'apartments' && !this._data.apartmentSlug) {
      this._body.classList.add('is-shake');
      setTimeout(() => this._body.classList.remove('is-shake'), 400);
      return false;
    }
    return true;
  }

  /** @param {string} field */
  _shakeField(field) {
    const input = this.querySelector(`[data-confirm-field="${field}"]`);
    input?.classList.add('is-invalid');
    input?.focus();
    setTimeout(() => input?.classList.remove('is-invalid'), 1200);
  }

  _selectedApartment() {
    return APARTAMENTOS.find((a) => a.slug === this._data.apartmentSlug) || null;
  }

  _sendWhatsApp() {
    const apt = this._selectedApartment();
    if (!apt || !this._data.name || !this._data.reservationCode) return;

    const message = buildConfirmReservationMessage({
      name: this._data.name,
      reservationCode: this._data.reservationCode,
      apartmentName: apt.name,
    });

    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
    this.close();
  }

  _renderProgress() {
    this._progress.innerHTML = STEPS.map((step, i) => {
      const done = i < this._step;
      const active = i === this._step;
      return `
        <li class="confirm-modal__step${active ? ' is-active' : ''}${done ? ' is-done' : ''}">
          <span class="confirm-modal__step-dot" aria-hidden="true">${done ? '✓' : i + 1}</span>
          <span class="sr-only">${step.title}${active ? ' (atual)' : ''}</span>
        </li>
      `;
    }).join('');
  }

  _renderBody() {
    const step = STEPS[this._step];
    const apt = this._selectedApartment();

    if (step.kind === 'review') {
      const message = apt
        ? buildConfirmReservationMessage({
            name: this._data.name,
            reservationCode: this._data.reservationCode,
            apartmentName: apt.name,
          })
        : '';

      this._body.innerHTML = `
        <div class="confirm-modal__step-head">
          ${stepIcon(step.icon)}
          <div>
            <h3 class="confirm-modal__step-title">${step.title}</h3>
            <p class="confirm-modal__step-hint">${step.hint}</p>
          </div>
        </div>
        <dl class="confirm-modal__summary">
          <div><dt>Nome</dt><dd>${escapeHtml(this._data.name)}</dd></div>
          <div><dt>Nº da reserva</dt><dd>${escapeHtml(this._data.reservationCode)}</dd></div>
          <div><dt>Apartamento</dt><dd>${escapeHtml(apt?.name || '—')}</dd></div>
          <div><dt>Endereço</dt><dd>${escapeHtml(apt?.address || '—')}</dd></div>
        </dl>
        <div class="confirm-modal__preview">
          <span class="confirm-modal__preview-label">Mensagem que será enviada:</span>
          <p>${escapeHtml(message)}</p>
        </div>
      `;
      return;
    }

    if (step.kind === 'apartments') {
      this._body.innerHTML = `
        <div class="confirm-modal__step-head">
          ${stepIcon(step.icon)}
          <div>
            <h3 class="confirm-modal__step-title">${step.title}</h3>
            <p class="confirm-modal__step-hint">${step.hint}</p>
          </div>
        </div>
        <div class="confirm-modal__apts" role="group" aria-label="Apartamentos">${apartmentOptions(this._data.apartmentSlug)}</div>
      `;
      return;
    }

    const value = this._data[step.field] || '';
    this._body.innerHTML = `
      <div class="confirm-modal__step-head">
        ${stepIcon(step.icon)}
        <div>
          <h3 class="confirm-modal__step-title">${step.title}</h3>
          <p class="confirm-modal__step-hint">${step.hint}</p>
        </div>
      </div>
      <label class="confirm-modal__field">
        <span class="sr-only">${step.title}</span>
        <input type="${step.inputType}"
               data-confirm-field="${step.field}"
               placeholder="${step.placeholder}"
               autocomplete="${step.field === 'name' ? 'name' : 'off'}">
      </label>
    `;

    const input = this.querySelector(`[data-confirm-field="${step.field}"]`);
    if (input) input.value = value;
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (this._validateCurrent()) {
          this._step = Math.min(STEPS.length - 1, this._step + 1);
          this._render();
        }
      }
    });
  }

  _renderActions() {
    const isFirst = this._step === 0;
    const isLast = this._step === STEPS.length - 1;

    this._actions.innerHTML = `
      ${isFirst ? '' : '<button type="button" class="confirm-modal__btn confirm-modal__btn--ghost" data-confirm-back>← Voltar</button>'}
      ${isLast
        ? `<button type="button" class="confirm-modal__btn confirm-modal__btn--whatsapp" data-confirm-send>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A10 10 0 0 0 3.6 17l-1.6 5 5.1-1.6A10 10 0 1 0 20.5 3.5z"/></svg>
            Enviar via WhatsApp
          </button>`
        : '<button type="button" class="confirm-modal__btn confirm-modal__btn--primary" data-confirm-next>Continuar →</button>'
      }
    `;
  }

  _render() {
    this._renderProgress();
    this._renderBody();
    this._renderActions();
  }
}

customElements.define('rf-confirm-reservation-modal', RFConfirmReservationModal);

if (!document.querySelector('rf-confirm-reservation-modal')) {
  document.body.appendChild(document.createElement('rf-confirm-reservation-modal'));
}
