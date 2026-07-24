/**
 * <rf-beach-scene> — Transição decorativa praia entre hero e conteúdo.
 */

class RFBeachScene extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="beach-scene" aria-hidden="true">
        <div class="beach-scene__sky"></div>
        <div class="beach-scene__sand"></div>
        <div class="beach-scene__umbrella">
          <div class="beach-scene__umbrella-top"></div>
          <div class="beach-scene__umbrella-pole"></div>
        </div>
        <div class="beach-scene__surfboard"></div>
        <div class="beach-scene__ball"></div>
        <div class="beach-scene__wave"></div>
      </section>
    `;
  }
}

customElements.define('rf-beach-scene', RFBeachScene);
