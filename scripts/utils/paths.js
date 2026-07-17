/**
 * Helpers de path para páginas em subpastas.
 */

const NESTED_PREFIXES = ['/apartamentos/', '/informacoes/', '/conheca-recife/', '/blog/'];

/** @returns {number} Níveis acima da raiz do site (0 = raiz). */
export function getPathDepth() {
  if (typeof window === 'undefined') return 0;
  const path = window.location.pathname;
  return NESTED_PREFIXES.some((prefix) => path.includes(prefix)) ? 1 : 0;
}

/** Página dentro de /apartamentos/*.html */
export function isNestedApartmentPage() {
  return typeof window !== 'undefined' && window.location.pathname.includes('/apartamentos/');
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
