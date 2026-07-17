/**
 * Chrome padrão do site — CSS e componentes obrigatórios em TODA página pública.
 *
 * O footer é composto por:
 *   JS  → scripts/components/footer.js   (registrado em scripts/main.js)
 *   CSS → styles/components/footer.css   (link manual em cada HTML)
 *
 * Uso em HTML (raiz do site):
 *   <link rel="stylesheet" href="./styles/components/footer.css" />
 *   <rf-footer></rf-footer>
 *   <script type="module" src="./scripts/main.js"></script>
 *
 * Em subpastas (/apartamentos/, /informacoes/, /conheca-recife/, /blog/):
 *   href="../styles/components/footer.css"
 *   src="../scripts/main.js"
 */

/** CSS base — ordem obrigatória */
export const CHROME_BASE_CSS = [
  'tokens.css',
  'base.css',
  'design-system.css',
  'utilities.css',
];

/** CSS dos componentes de chrome (nav + footer + overlays) */
export const CHROME_COMPONENT_CSS = [
  'announcement.css',
  'button.css',
  'navbar.css',
  'menu-overlay.css',
  'breadcrumbs.css',
  'footer.css',
  'floating-whatsapp.css',
  'matching.css',
];

/** Caminhos dos arquivos do footer */
export const FOOTER_FILES = {
  js: 'scripts/components/footer.js',
  css: 'styles/components/footer.css',
  tag: 'rf-footer',
};

/** Caminhos dos arquivos da navbar */
export const NAVBAR_FILES = {
  js: 'scripts/components/navbar.js',
  css: 'styles/components/navbar.css',
  tag: 'rf-navbar',
};

/** Shell HTML padrão (referência para novas páginas) */
export const PAGE_SHELL = {
  menu: '<rf-menu wraps=".site-content"></rf-menu>',
  announcement: '<rf-announcement>…</rf-announcement>',
  navbar: '<rf-navbar></rf-navbar>',
  footer: '<rf-footer></rf-footer>',
  whatsapp: '<rf-floating-whatsapp></rf-floating-whatsapp>',
  matchingWizard: '<rf-matching-wizard></rf-matching-wizard>',
  mainJs: 'scripts/main.js',
};
