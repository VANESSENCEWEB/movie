/**
 * Posts do blog — dicas de viagem e temporada em Recife.
 */

/** @typedef {{
 *   slug: string,
 *   title: string,
 *   excerpt: string,
 *   category: string,
 *   publishedAt: string,
 *   readMinutes: number,
 *   author: string,
 *   metaDescription: string,
 *   sections: { title?: string, paragraphs: string[], items?: string[] }[]
 * }} BlogPost
 */

/** @type {Record<string, BlogPost>} */
export const BLOG_POSTS = {
  'guia-boa-viagem-temporada': {
    slug: 'guia-boa-viagem-temporada',
    title: 'Guia completo: temporada em Boa Viagem',
    excerpt:
      'Tudo o que você precisa saber para ficar em Boa Viagem — praia, comércio, transporte e como escolher o apartamento ideal.',
    category: 'Boa Viagem',
    publishedAt: '2026-01-10',
    readMinutes: 6,
    author: 'Recife Flats',
    metaDescription:
      'Guia de temporada em Boa Viagem, Recife: localização, infraestrutura, praia e dicas para escolher apartamento mobiliado.',
    sections: [
      {
        paragraphs: [
          'Boa Viagem é o bairro mais procurado para temporada em Recife — e com razão. Orla acessível, comércio completo e apartamentos prontos para morar fazem da região a escolha natural para famílias, casais e nômades digitais.',
        ],
      },
      {
        title: 'Por que Boa Viagem?',
        items: [
          'Praia a poucos passos dos principais condomínios',
          'Padarias, mercados, farmácias e restaurantes 24h',
          'Boa infraestrutura de transporte por app',
          'Base perfeita para trabalho remoto com Wi-Fi de qualidade',
        ],
      },
      {
        title: 'Como escolher o apartamento',
        paragraphs: [
          'Defina prioridades: proximidade da praia, piscina, garagem, número de quartos e orçamento. Na Recife Flats você compara 3 unidades em Boa Viagem com fotos reais e reserva direta — sem taxa de plataforma.',
        ],
      },
    ],
  },

  'o-que-fazer-recife-3-dias': {
    slug: 'o-que-fazer-recife-3-dias',
    title: 'O que fazer em Recife em 3 dias',
    excerpt:
      'Roteiro prático para aproveitar Recife em um fim de semana prolongado — praia, cultura e gastronomia.',
    category: 'Roteiros',
    publishedAt: '2026-01-05',
    readMinutes: 5,
    author: 'Recife Flats',
    metaDescription:
      'Roteiro de 3 dias em Recife: praia, Recife Antigo, museus e gastronomia pernambucana para quem está em temporada.',
    sections: [
      {
        title: 'Dia 1 — Praia e bairro',
        items: [
          'Manhã na praia de Boa Viagem',
          'Almoço em restaurante da orla',
          'Tarde de compras ou trabalho no apartamento',
          'Pôr do sol no calçadão',
        ],
      },
      {
        title: 'Dia 2 — Centro e cultura',
        items: [
          'Recife Antigo e Marco Zero pela manhã',
          'Almoço no centro histórico',
          'Paço do Frevo ou Cais do Sertão à tarde',
          'Noite no Recife Antigo',
        ],
      },
      {
        title: 'Dia 3 — Passeio ou descanso',
        paragraphs: [
          'Use o terceiro dia para um passeio de carro (Porto de Galinhas, Olinda) ou para descansar no apartamento com piscina — dependendo do seu ritmo.',
        ],
      },
    ],
  },

  'gastronomia-pernambucana': {
    slug: 'gastronomia-pernambucana',
    title: '5 pratos da gastronomia pernambucana para provar',
    excerpt:
      'Da tapioca ao bolo de rolo: o que pedir quando chegar em Recife pela primeira vez.',
    category: 'Gastronomia',
    publishedAt: '2025-12-20',
    readMinutes: 4,
    author: 'Recife Flats',
    metaDescription:
      '5 pratos típicos de Pernambuco para experimentar durante sua temporada em Recife.',
    sections: [
      {
        paragraphs: [
          'A culinária pernambucana mistura influências indígenas, africanas e portuguesas. Estes são os pratos que todo hóspede deveria experimentar pelo menos uma vez.',
        ],
      },
      {
        title: 'Não pode faltar',
        items: [
          'Tapioca na barraca da praia — café da manhã clássico',
          'Bolo de rolo — fino, com goiabada',
          'Peixe na folha de bananeira — frutos do mar frescos',
          'Cartola — banana, queijo e canela (sobremesa)',
          'Caldinho de sururu — petisco de boteco autêntico',
        ],
      },
    ],
  },
};

/** @returns {BlogPost[]} mais recentes primeiro */
export function getAllBlogPosts() {
  return Object.values(BLOG_POSTS).sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
  );
}

/** @param {string} slug */
export function getBlogPost(slug) {
  return BLOG_POSTS[slug] || null;
}
