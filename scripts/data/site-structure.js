/**
 * Estrutura do site — URLs, bairros, breadcrumbs e SEO.
 *
 * Hierarquia de conteúdo (funil de imóveis):
 *   Início → Apartamentos → Bairro → Imóvel
 *
 * Hierarquia institucional:
 *   Início → Informações → [Política]
 *   Início → Sobre | Contato | ApartMatch
 */

import { getApartmentBySlug } from './apartamentos.js';
import { getPathDepth, isNestedApartmentPage, pageHref } from '../utils/paths.js';

/** @typedef {{ slug: string, name: string, pageUrl: string, description: string, intro: string, highlights: string[] }} Neighborhood */

/** @typedef {{ slug: string, label: string, pageUrl: string, category: 'reserva'|'legal', icon: string, description: string }} InfoPage */

/** @typedef {{ slug: string, label: string, pageUrl: string, breadcrumbLabel: string }} StaticPage */

/** @type {Record<string, Neighborhood>} */
export const NEIGHBORHOODS = {
  'boa-viagem': {
    slug: 'boa-viagem',
    name: 'Boa Viagem',
    pageUrl: './boa-viagem.html',
    description:
      'Aluguel por temporada em Boa Viagem, Recife — praia, comércio e mobilidade a pé.',
    intro:
      'Boa Viagem é o bairro mais procurado para temporada em Recife: orla acessível, padarias, restaurantes, farmácias e shoppings por perto. Ideal para famílias, casais e quem trabalha remotamente com rotina prática.',
    highlights: [
      '100 m a 200 m da orla em unidades selecionadas',
      'Mercados, farmácias e cafés a poucos passos',
      'Ótima base para lazer, compras e trabalho remoto',
    ],
  },
  pina: {
    slug: 'pina',
    name: 'Pina',
    pageUrl: './pina.html',
    description:
      'Apartamento para temporada no Pina, Recife — ao lado do RioMar e bem conectado à cidade.',
    intro:
      'O Pina combina localização estratégica com acesso rápido ao RioMar Shopping, ao Centro do Recife e à orla de Boa Viagem. Excelente para estadias médias e longas, com tudo que você precisa no entorno.',
    highlights: [
      'Ao lado do RioMar Shopping',
      'O bairro mais próximo do Centro do Recife entre nossas opções',
      'Boa conexão com vias principais e aeroporto',
    ],
  },
};

/** Páginas informativas e legais — /informacoes/ */
export const INFO_PAGES = {
  caucao: {
    slug: 'caucao',
    label: 'Caução reembolsável',
    pageUrl: './informacoes/caucao.html',
    category: 'reserva',
    icon: 'shield',
    description: 'Valor, pagamento e prazo de devolução da caução.',
  },
  cancelamento: {
    slug: 'cancelamento',
    label: 'Política de cancelamento',
    pageUrl: './informacoes/cancelamento.html',
    category: 'reserva',
    icon: 'file',
    description: 'Prazos, reembolso e alteração de datas.',
  },
  'check-in': {
    slug: 'check-in',
    label: 'Check-in / Check-out',
    pageUrl: './informacoes/check-in.html',
    category: 'reserva',
    icon: 'clock',
    description: 'Horários, documentos e instruções de chegada e saída.',
  },
  privacidade: {
    slug: 'privacidade',
    label: 'Privacidade',
    pageUrl: './informacoes/privacidade.html',
    category: 'legal',
    icon: 'file',
    description: 'Como tratamos seus dados pessoais.',
  },
  termos: {
    slug: 'termos',
    label: 'Termos de uso',
    pageUrl: './informacoes/termos.html',
    category: 'legal',
    icon: 'file',
    description: 'Condições de uso do site e das reservas.',
  },
  cookies: {
    slug: 'cookies',
    label: 'Cookies',
    pageUrl: './informacoes/cookies.html',
    category: 'legal',
    icon: 'file',
    description: 'Uso de cookies e tecnologias similares.',
  },
  lgpd: {
    slug: 'lgpd',
    label: 'LGPD',
    pageUrl: './informacoes/lgpd.html',
    category: 'legal',
    icon: 'shield',
    description: 'Seus direitos sob a Lei Geral de Proteção de Dados.',
  },
};

/** Páginas estáticas na raiz */
export const STATIC_PAGES = {
  sobre: {
    slug: 'sobre',
    label: 'Sobre nós',
    pageUrl: './sobre.html',
    breadcrumbLabel: 'Sobre nós',
  },
  contato: {
    slug: 'contato',
    label: 'Contato',
    pageUrl: './contato.html',
    breadcrumbLabel: 'Contato',
  },
  apartmatch: {
    slug: 'apartmatch',
    label: 'ApartMatch',
    pageUrl: './apartmatch.html',
    breadcrumbLabel: 'ApartMatch',
  },
  apartamentos: {
    slug: 'apartamentos',
    label: 'Apartamentos',
    pageUrl: './apartamentos.html',
    breadcrumbLabel: 'Apartamentos',
  },
};

export const INFO_HUB_URL = './informacoes/index.html';

/** @param {string} neighborhoodName */
export function neighborhoodKeyFromName(neighborhoodName) {
  const map = { 'Boa Viagem': 'boa-viagem', Pina: 'pina' };
  return map[neighborhoodName] || neighborhoodName.toLowerCase().replace(/\s+/g, '-');
}

export { isNestedApartmentPage, assetUrl, pageHref, getPathDepth } from '../utils/paths.js';

/** @param {string} slug */
export function getNeighborhood(slug) {
  return NEIGHBORHOODS[slug] || null;
}

/** @param {string} slug */
export function getInfoPage(slug) {
  return INFO_PAGES[slug] || null;
}

/** @param {string} slug */
export function infoPageUrl(slug) {
  const page = getInfoPage(slug);
  if (!page) return pageHref(INFO_HUB_URL);
  return pageHref(page.pageUrl);
}

/** @param {string} apartmentSlug */
export function apartmentUrl(apartmentSlug) {
  if (isNestedApartmentPage()) return `./${apartmentSlug}.html`;
  return pageHref(`./apartamentos/${apartmentSlug}.html`);
}

/** @param {string} neighborhoodSlug */
export function neighborhoodUrl(neighborhoodSlug) {
  const url = NEIGHBORHOODS[neighborhoodSlug]?.pageUrl || './apartamentos.html';
  return pageHref(url);
}

/**
 * @typedef {{ label: string, href?: string, current?: boolean }} Crumb
 * @param {'home'|'apartments'|'neighborhood'|'apartment'|'info'|'info-hub'|'sobre'|'contato'|'apartmatch'} type
 * @param {{ slug?: string }} [params]
 * @returns {Crumb[]}
 */
export function getBreadcrumbs(type, params = {}) {
  const home = { label: 'Início', href: './index.html' };
  const hub  = { label: 'Apartamentos', href: './apartamentos.html' };
  const infoHub = { label: 'Informações', href: INFO_HUB_URL };

  switch (type) {
    case 'home':
      return [{ label: 'Início', current: true }];
    case 'apartments':
      return [home, { label: 'Apartamentos', current: true }];
    case 'neighborhood': {
      const n = getNeighborhood(params.slug);
      if (!n) return [home, { label: 'Apartamentos', current: true }];
      return [home, hub, { label: n.name, href: n.pageUrl, current: true }];
    }
    case 'apartment': {
      const apt = getApartmentBySlug(params.slug);
      if (!apt) return [home, { label: 'Apartamentos', current: true }];
      const nKey = apt.neighborhoodSlug || neighborhoodKeyFromName(apt.neighborhood);
      const n = getNeighborhood(nKey);
      return [
        home,
        hub,
        { label: apt.neighborhood, href: n?.pageUrl || './apartamentos.html' },
        { label: apt.name, current: true },
      ];
    }
    case 'info-hub':
      return [home, { label: 'Informações', current: true }];
    case 'info': {
      const info = getInfoPage(params.slug);
      if (!info) return [home, { label: 'Informações', current: true }];
      return [home, infoHub, { label: info.label, current: true }];
    }
    case 'sobre':
      return [home, { label: STATIC_PAGES.sobre.breadcrumbLabel, current: true }];
    case 'contato':
      return [home, { label: STATIC_PAGES.contato.breadcrumbLabel, current: true }];
    case 'apartmatch':
      return [home, { label: STATIC_PAGES.apartmatch.breadcrumbLabel, current: true }];
    default:
      return [home];
  }
}

/** URLs públicas para sitemap (paths relativos à raiz do site). */
export function getAllPublicPaths() {
  const paths = [
    '/',
    '/index.html',
    '/apartamentos.html',
    '/boa-viagem.html',
    '/pina.html',
    '/sobre.html',
    '/contato.html',
    '/apartmatch.html',
    '/informacoes/',
    '/informacoes/index.html',
  ];

  Object.values(INFO_PAGES).forEach((p) => {
    paths.push(p.pageUrl.replace('./', '/'));
  });

  return paths;
}
