/**
 * Conteúdo "Conheça Recife" — guias para hóspedes.
 */

/** @typedef {{ title: string, paragraphs?: string[], items?: string[] }} GuideSection */

/** @typedef {{
 *   slug: string,
 *   title: string,
 *   eyebrow: string,
 *   metaDescription: string,
 *   lead: string,
 *   updatedAt: string,
 *   sections: GuideSection[],
 *   related?: string[]
 * }} RecifeGuide
 */

/** @type {Record<string, RecifeGuide>} */
export const RECIFE_GUIDES = {
  praias: {
    slug: 'praias',
    title: 'Praias de Recife',
    eyebrow: 'Conheça Recife',
    metaDescription:
      'Guia das praias de Boa Viagem e arredores — orla, estrutura, segurança e dicas para quem fica em temporada.',
    lead:
      'Recife é porta de entrada para algumas das praias urbanas mais famosas do Nordeste. Boa Viagem é a principal para quem se hospeda conosco — a poucos passos dos nossos apartamentos.',
    updatedAt: '2026-01-15',
    sections: [
      {
        title: 'Praia de Boa Viagem',
        paragraphs: [
          'Orla extensa com calçadão, quiosques, ciclovia e vista para as piscinas naturais de Piedade (Jaboatão). Nossos apartamentos ficam a cerca de 100 m da faixa de areia.',
          'A praia é monitorada em trechos e tem infraestrutura de bares e restaurantes ao longo da Avenida Boa Viagem.',
        ],
        items: [
          'Melhor horário: manhã cedo ou final da tarde',
          'Atenção às marés e avisos oficiais de banho',
          'Use protetor solar — sol forte o ano todo',
        ],
      },
      {
        title: 'Praia do Pina',
        paragraphs: [
          'Mais tranquila que Boa Viagem, com acesso fácil a partir do nosso apartamento no Pina. Boa opção para caminhada e pôr do sol.',
        ],
      },
      {
        title: 'Passeios de dia',
        items: [
          'Porto de Galinhas e Praia dos Carneiros (1h30–2h de carro)',
          'Ilha de Itamaracá e Coroa do Avião',
          'Praia de Piedade — piscinas naturais em maré baixa',
        ],
      },
    ],
    related: ['gastronomia', 'o-que-fazer', 'dicas-locais'],
  },

  gastronomia: {
    slug: 'gastronomia',
    title: 'Gastronomia em Recife',
    eyebrow: 'Conheça Recife',
    metaDescription:
      'Onde comer em Recife e Boa Viagem: culinária pernambucana, frutos do mar, botecos e restaurantes perto dos nossos apartamentos.',
    lead:
      'Pernambuco tem uma das culinárias mais ricas do Brasil. Em Boa Viagem e Pina você resolve o dia a dia a pé; para experiências especiais, o Recife Antigo e o centro concentram os melhores endereços.',
    updatedAt: '2026-01-15',
    sections: [
      {
        title: 'Pratos que você precisa provar',
        items: [
          'Bolo de rolo e cartola — sobremesas clássicas',
          'Tapioca e tapiocas recheadas em barracas da orla',
          'Peixe e frutos do mar — especialidade local',
          'Buchada de bode e feijoada pernambucana (restaurantes regionais)',
          'Caldinho e cachaça artesanal nos botecos do centro',
        ],
      },
      {
        title: 'Onde comer perto dos apartamentos',
        paragraphs: [
          'Boa Viagem tem padarias, mercados, restaurantes por quilo e opções de delivery 24h. O Pina está ao lado do RioMar Shopping, com praça de alimentação e restaurantes.',
        ],
      },
      {
        title: 'Recife Antigo e Marco Zero',
        paragraphs: [
          'À noite, o bairro do Recife Antigo reúne bares, música ao vivo e gastronomia contemporânea. Ideal para uma saída especial durante a estadia.',
        ],
      },
    ],
    related: ['praias', 'dicas-locais', 'o-que-fazer'],
  },

  'dicas-locais': {
    slug: 'dicas-locais',
    title: 'Dicas locais',
    eyebrow: 'Conheça Recife',
    metaDescription:
      'Dicas práticas de quem mora em Recife: transporte, segurança, compras, farmácias e rotina para hóspedes em temporada.',
    lead:
      'Informações que fazem diferença no dia a dia — de quem conhece Boa Viagem e Pina de verdade.',
    updatedAt: '2026-01-15',
    sections: [
      {
        title: 'Transporte',
        items: [
          'Uber e 99 funcionam bem em Recife',
          'Ônibus municipais passam na Av. Boa Viagem e no Pina',
          'Aeroporto (Guararapes): 20–40 min conforme trânsito',
          'Aluguel de carro: útil para passeios fora da cidade',
        ],
      },
      {
        title: 'Compras do dia a dia',
        items: [
          'Padarias e mercados a poucos passos em Boa Viagem',
          'RioMar Shopping (Pina) — supermercado, farmácia, cinema',
          'Shopping Recife e Center Um — opções em Boa Viagem',
        ],
      },
      {
        title: 'Segurança e rotina',
        items: [
          'Evite exibir objetos de valor na praia',
          'Use apps oficiais de transporte à noite',
          'Nossos apartamentos têm portaria 24h nos condomínios',
          'Salve o WhatsApp da Recife Flats para suporte rápido',
        ],
      },
    ],
    related: ['praias', 'gastronomia', 'o-que-fazer'],
  },

  'o-que-fazer': {
    slug: 'o-que-fazer',
    title: 'O que fazer em Recife',
    eyebrow: 'Conheça Recife',
    metaDescription:
      'Roteiro de atrações em Recife: Recife Antigo, Marco Zero, museus, cultura, compras e passeios para sua temporada.',
    lead:
      'Recife combina história, cultura, praia e vida urbana. Um roteiro equilibrado para quem fica alguns dias ou semanas em temporada.',
    updatedAt: '2026-01-15',
    sections: [
      {
        title: 'Essencial (1–2 dias)',
        items: [
          'Recife Antigo e Marco Zero — arquitetura colonial e vista para o mar',
          'Instituto Ricardo Brennand — castelo, arte e jardins',
          'Oficina Cerâmica Francisco Brennand',
          'Praia de Boa Viagem — manhã ou fim de tarde',
        ],
      },
      {
        title: 'Cultura e história',
        items: [
          'Paço do Frevo — museu interativo do frevo',
          'Cais do Sertão — museu no antigo armazém do porto',
          'Casa da Cultura — artesanato em antiga prisão',
          'Rua do Bom Jesus — sinagoga Kahal Zur Israel',
        ],
      },
      {
        title: 'Com crianças ou em família',
        items: [
          'Parque Dona Lindu — área verde e vista para o mar',
          'RioMar e shoppings — cinema e praça de alimentação',
          'Piscinas naturais de Piedade (passeio de dia)',
        ],
      },
      {
        title: 'À noite',
        items: [
          'Bares do Recife Antigo e da Rua da Moeda',
          'Apresentações de frevo e maracatu (consulte agenda local)',
          'Restaurantes na orla de Boa Viagem',
        ],
      },
    ],
    related: ['praias', 'gastronomia', 'dicas-locais'],
  },
};

/** @param {string} slug */
export function getRecifeGuide(slug) {
  return RECIFE_GUIDES[slug] || null;
}
