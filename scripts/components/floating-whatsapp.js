/**
 * <rf-floating-whatsapp> — Botão fixo de WhatsApp.
 */

import { whatsappUrl } from '../data/location.js';
import { WHATSAPP_ICON_SVG } from '../data/brand-icons.js';

class RFFloatingWhatsapp extends HTMLElement {
  connectedCallback() {
    const href = whatsappUrl('Olá! Vim pelo site e gostaria de mais informações.');

    this.innerHTML = `
      <a href="${href}"
         class="floating-whatsapp"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Falar no WhatsApp">
        ${WHATSAPP_ICON_SVG.replace('<svg', '<svg width="28" height="28"')}
        <span class="floating-whatsapp__pulse" aria-hidden="true"></span>
      </a>
    `;
  }
}

customElements.define('rf-floating-whatsapp', RFFloatingWhatsapp);
