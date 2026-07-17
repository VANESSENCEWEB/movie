/**
 * Helpers de path para páginas em subpastas.
 */

const NESTED_PREFIXES = ['/apartamentos/', '/informacoes/', '/conheca-recife/', '/blog/'];
export const NEIGHBORHOOD_SLUGS = ['boa-viagem', 'pina'];

/** Segmentos após /apartamentos/ na URL atual. */
export function getApartmentPathSegments() {
  if (typeof window === 'undefined') return [];
  const parts = window.location.pathname.replace(/^\//, '').split('/').filter(Boolean);
  const idx = parts.indexOf('apartamentos');
  if (idx === -1) return [];
  return parts.slice(idx + 1).map((s) => s.replace(/\.html$/, ''));
}

/** @returns {number} Níveis acima da raiz do site (0 = raiz). */
export function getPathDepth() {
  if (typeof window === 'undefined') return 0;
  const parts = window.location.pathname.replace(/^\//, '').split('/').filter(Boolean);
  if (!parts.length) return 0;
  const last = parts[parts.length - 1];
  if (last.endsWith('.html')) return parts.length - 1;
  return parts.length;
}

/** Hub principal /apartamentos/ */
export function isApartmentsHubPage() {
  const segs = getApartmentPathSegments();
  return segs.length === 0 || segs[0] === 'index';
}

/** Página de bairro /apartamentos/{bairro}/ */
export function isNeighborhoodHubPage() {
  const segs = getApartmentPathSegments();
  return segs.length === 1 && NEIGHBORHOOD_SLUGS.includes(segs[0]);
}

/** Página de imóvel /apartamentos/{bairro}/{slug} */
export function isApartmentDetailPage() {
  const segs = getApartmentPathSegments();
  return segs.length >= 2 && NEIGHBORHOOD_SLUGS.includes(segs[0]);
}

/** @deprecated Use isApartmentDetailPage */
export function isNestedApartmentPage() {
  return isApartmentDetailPage();
}

/** Slug do bairro na URL atual (quando em hub de bairro ou detalhe). */
export function getCurrentNeighborhoodSlug() {
  const segs = getApartmentPathSegments();
  if (!segs.length || segs[0] === 'index') return null;
  return NEIGHBORHOOD_SLUGS.includes(segs[0]) ? segs[0] : null;
}

/** Página dentro de subpasta com paths relativos que precisam de ../ */
export function isNestedPage() {
  return getPathDepth() > 0;
}

/** @param {string} path */
export function assetUrl(path) {
  if (!path || /^https?:\/\//.test(path)) return path;
  const clean = path.replace(/^\.\//, '');
  const depth = getPathDepth();
  return depth > 0 ? `${'../'.repeat(depth)}${clean}` : `./${clean}`;
}

/** @param {string} path */
export function pageHref(path) {
  if (!path || /^https?:\/\//.test(path) || path.startsWith('#')) return path;
  const clean = path.replace(/^\.\//, '');
  const depth = getPathDepth();
  return depth > 0 ? `${'../'.repeat(depth)}${clean}` : `./${clean}`;
}

/** URL absoluta para JSON-LD e canonical. */
export function absolutePageUrl(relativePath) {
  if (typeof window === 'undefined') return relativePath;
  const href = pageHref(relativePath);
  if (/^https?:\/\//.test(href)) return href;
  return new URL(href, window.location.origin).href;
}
