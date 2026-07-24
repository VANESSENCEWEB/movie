/**
 * Navegação compartilhada — navbar desktop + menu mobile.
 */

import { pageHref } from './site-structure.js';

const ICONS = {
  home: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  building: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/><path d="M12 14h.01"/></svg>',
  pin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  compass: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
  help: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
  sparkles: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m12 3 1.9 5.8H20l-4.8 3.5 1.8 5.7L12 14.5l-5 3.5 1.8-5.7L4 8.8h6.1z"/></svg>',
  user: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
};

/** @typedef {{ id: string, label: string, labelEn: string, href: string, icon: keyof typeof ICONS, desktop?: boolean, badge?: string }} NavItem */

/** @returns {NavItem[]} */
export function getNavItems() {
  return [
    {
      id: 'home',
      label: 'Início',
      labelEn: 'Home',
      href: pageHref('./index.html'),
      icon: 'home',
      desktop: true,
    },
    {
      id: 'apartments',
      label: 'Apartamentos',
      labelEn: 'Apartments',
      href: pageHref('./apartamentos.html'),
      icon: 'building',
      desktop: true,
    },
    {
      id: 'location',
      label: 'Localização',
      labelEn: 'Location',
      href: pageHref('./index.html#localizacao'),
      icon: 'pin',
      desktop: true,
    },
    {
      id: 'explore',
      label: 'Explore Recife',
      labelEn: 'Explore Recife',
      href: pageHref('./boa-viagem.html'),
      icon: 'compass',
      desktop: true,
    },
    {
      id: 'faq',
      label: 'Suporte',
      labelEn: 'FAQ',
      href: pageHref('./index.html#faq'),
      icon: 'help',
      desktop: true,
    },
    {
      id: 'apartmatch',
      label: 'ApartMatch',
      labelEn: 'ApartMatch',
      href: pageHref('./apartmatch.html'),
      icon: 'sparkles',
      badge: 'Novo',
    },
    {
      id: 'about',
      label: 'Sobre nós',
      labelEn: 'About',
      href: pageHref('./sobre.html'),
      icon: 'user',
    },
    {
      id: 'contact',
      label: 'Contato',
      labelEn: 'Contact',
      href: pageHref('./contato.html'),
      icon: 'mail',
    },
  ];
}

/** @param {keyof typeof ICONS} name */
export function navIcon(name) {
  return ICONS[name] || ICONS.home;
}

/** @returns {NavItem[]} */
export function getDesktopNavItems() {
  return getNavItems().filter((item) => item.desktop);
}
