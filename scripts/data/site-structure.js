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

import { getApartmentBySlug, APARTAMENTOS } from './apartamentos.js';
import {
  getCurrentNeighborhoodSlug,
  isApartmentDetailPage,
  isNeighborhoodHubPage,
  pageHref,
} from '../utils/paths.js';

export const APARTMENTS_HUB_URL = './apartamentos/index.html';

/** @typedef {{ slug: string, name: string, pageUrl: string, description: string, intro: string, highlights: string[] }} Neighborhood */

/** @typedef {{ slug: string, label: string, pageUrl: string, category: 'reserva'|'legal', icon: string, description: string }} InfoPage */

/** @typedef {{ slug: string, label: string, pageUrl: string, category: 'guia'|'bairro', icon: string, description: string }} RecifePage */

/** @typedef {{ slug: string, label: string, pageUrl: string, breadcrumbLabel: string }} StaticPage */

/** @type {Record<string, Neighborhood>} */
export const NEIGHBORHOODS = {
  'boa-viagem': {
    slug: 'boa-viagem',
    name: 'Boa Viagem',
    pageUrl: './apartamentos/boa-viagem/index.html',
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
    pageUrl: './apartamentos/pina/index.html',
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
    pageUrl: APARTMENTS_HUB_URL,
    breadcrumbLabel: 'Apartamentos',
  },
};

export const INFO_HUB_URL = './informacoes/index.html';

/** Guias "Conheça Recife" — /conheca-recife/ */
export const RECIFE_PAGES = {
  praias: {
    slug: 'praias',
    label: 'Praias',
    pageUrl: './conheca-recife/praias.html',
    category: 'guia',
    icon: 'beach',
    description: 'Boa Viagem, Pina e passeios de praia.',
  },
  gastronomia: {
    slug: 'gastronomia',
    label: 'Gastronomia',
    pageUrl: './conheca-recife/gastronomia.html',
    category: 'guia',
    icon: 'food',
    description: 'Culinária pernambucana e onde comer.',
  },
  'dicas-locais': {
    slug: 'dicas-locais',
    label: 'Dicas locais',
    pageUrl: './conheca-recife/dicas-locais.html',
    category: 'guia',
    icon: 'map',
    description: 'Transporte, compras e rotina prática.',
  },
  'o-que-fazer': {
    slug: 'o-que-fazer',
    label: 'O que fazer em Recife',
    pageUrl: './conheca-recife/o-que-fazer.html',
    category: 'guia',
    icon: 'compass',
    description: 'Roteiros, cultura e passeios.',
  },
  'boa-viagem': {
    slug: 'boa-viagem',
    label: 'Boa Viagem',
    pageUrl: './apartamentos/boa-viagem/index.html',
    category: 'bairro',
    icon: 'pin',
    description: 'Apartamentos perto da praia.',
  },
  pina: {
    slug: 'pina',
    label: 'Pina',
    pageUrl: './apartamentos/pina/index.html',
    category: 'bairro',
    icon: 'pin',
    description: 'Ao lado do RioMar Shopping.',
  },
};

export const RECIFE_HUB_URL = './conheca-recife/index.html';
export const BLOG_HUB_URL = './blog/index.html';

/** Links do footer — coluna Informações (todas as políticas + FAQ) */
export function getFooterInfoLinks() {
  return [
    ...Object.values(INFO_PAGES).filter((p) => p.category === 'reserva'),
    { slug: 'faq', label: 'Perguntas frequentes', pageUrl: './index.html#faq', icon: 'help', category: 'reserva' },
    ...Object.values(INFO_PAGES).filter((p) => p.category === 'legal'),
  ];
}

/** Links do footer — coluna Conheça Recife */
export function getFooterRecifeLinks() {
  return Object.values(RECIFE_PAGES);
}

/** @param {string} neighborhoodName */
export function neighborhoodKeyFromName(neighborhoodName) {
  const map = { 'Boa Viagem': 'boa-viagem', Pina: 'pina' };
  return map[neighborhoodName] || neighborhoodName.toLowerCase().replace(/\s+/g, '-');
}

export { isNestedApartmentPage, isApartmentDetailPage, assetUrl, pageHref, getPathDepth } from '../utils/paths.js';

/** @param {string} slug */
export function getNeighborhood(slug) {
  return NEIGHBORHOODS[slug] || null;
}

/** @param {string} slug */
export function getRecifePage(slug) {
  return RECIFE_PAGES[slug] || null;
}

/** @param {string} slug */
export function recifePageUrl(slug) {
  const page = getRecifePage(slug);
  if (!page) return pageHref(RECIFE_HUB_URL);
  return pageHref(page.pageUrl);
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
  const apt = getApartmentBySlug(apartmentSlug);
  if (!apt) return pageHref(APARTMENTS_HUB_URL);

  const neighborhood = apt.neighborhoodSlug;
  const current = getCurrentNeighborhoodSlug();

  if (
    (isApartmentDetailPage() || isNeighborhoodHubPage())
    && current === neighborhood
  ) {
    return `./${apartmentSlug}.html`;
  }

  return pageHref(`./apartamentos/${neighborhood}/${apartmentSlug}.html`);
}

/** @param {string} neighborhoodSlug */
export function neighborhoodUrl(neighborhoodSlug) {
  const url = NEIGHBORHOODS[neighborhoodSlug]?.pageUrl || APARTMENTS_HUB_URL;
  return pageHref(url);
}

/** @param {string} [path] */
export function apartmentsHubUrl(path = APARTMENTS_HUB_URL) {
  return pageHref(path);
}

/**
 * @typedef {{ label: string, href?: string, current?: boolean }} Crumb
 * @param {'home'|'apartments'|'neighborhood'|'apartment'|'info'|'info-hub'|'recife'|'recife-hub'|'blog'|'blog-post'|'sobre'|'contato'|'apartmatch'} type
 * @param {{ slug?: string }} [params]
 * @returns {Crumb[]}
 */
export function getBreadcrumbs(type, params = {}) {
  const home = { label: 'Início', href: './index.html' };
  const hub  = { label: 'Apartamentos', href: APARTMENTS_HUB_URL };
  const infoHub = { label: 'Informações', href: INFO_HUB_URL };
  const recifeHub = { label: 'Conheça Recife', href: RECIFE_HUB_URL };
  const blogHub = { label: 'Blog', href: BLOG_HUB_URL };

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
        { label: apt.neighborhood, href: n?.pageUrl || APARTMENTS_HUB_URL },
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
    case 'recife-hub':
      return [home, { label: 'Conheça Recife', current: true }];
    case 'recife': {
      const guide = getRecifePage(params.slug);
      if (!guide || guide.category === 'bairro') {
        const n = getNeighborhood(params.slug);
        if (n) return [home, hub, { label: n.name, current: true }];
      }
      if (!guide) return [home, { label: 'Conheça Recife', current: true }];
      return [home, recifeHub, { label: guide.label, current: true }];
    }
    case 'blog-hub':
      return [home, { label: 'Blog', current: true }];
    case 'blog-post': {
      return [home, blogHub, { label: params.label || 'Artigo', current: true }];
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
    '/apartamentos/',
    '/apartamentos/index.html',
    '/apartamentos/boa-viagem/',
    '/apartamentos/boa-viagem/index.html',
    '/apartamentos/pina/',
    '/apartamentos/pina/index.html',
    '/sobre.html',
    '/contato.html',
    '/apartmatch.html',
    '/informacoes/',
    '/informacoes/index.html',
    '/conheca-recife/',
    '/conheca-recife/index.html',
    '/blog/',
    '/blog/index.html',
  ];

  APARTAMENTOS.forEach((apt) => {
    paths.push(`/apartamentos/${apt.neighborhoodSlug}/${apt.slug}.html`);
  });

  Object.values(INFO_PAGES).forEach((p) => {
    paths.push(p.pageUrl.replace('./', '/'));
  });

  Object.values(RECIFE_PAGES).filter((p) => p.category === 'guia').forEach((p) => {
    paths.push(p.pageUrl.replace('./', '/'));
  });

  return paths;
}
