/**
 * <rf-home-marquee> — Faixa ticker estilo exemplo (com ícones).
 */

class RFHomeMarquee extends HTMLElement {
  connectedCallback() {
    const items = [
      '🏠 Flats mobiliados em Boa Viagem',
      '🌊 A 100 m da praia',
      '📶 Wi-Fi rápido',
      '🏊 Piscina e garagem',
      '🔒 Reserva direta',
      '⭐ Nota 4.9',
      '🏖️ Boa Viagem e Pina',
      '💬 Atendimento humano',
    ];
    const track = [...items, ...items]
      .map((t) => `<span class="marquee__item">${t}</span>`)
      .join('');

    this.innerHTML = `
      <div class="marquee marquee--ticker" aria-hidden="true">
        <div class="marquee__track">${track}</div>
      </div>
    `;
  }
}

customElements.define('rf-home-marquee', RFHomeMarquee);
