/**
 * Conteúdo das páginas informativas e legais.
 * Usado por <rf-info-page> e pelo hub em /informacoes/.
 */

/** @typedef {{ title: string, paragraphs?: string[], items?: string[] }} PolicySection */

/** @typedef {{
 *   slug: string,
 *   title: string,
 *   eyebrow: string,
 *   metaDescription: string,
 *   lead: string,
 *   updatedAt: string,
 *   sections: PolicySection[],
 *   related?: string[]
 * }} PolicyPage */

/** @type {Record<string, PolicyPage>} */
export const POLICIES = {
  caucao: {
    slug: 'caucao',
    title: 'Caução reembolsável',
    eyebrow: 'Reserva',
    metaDescription:
      'Política de caução da Recife Flats Temporada: valor, forma de pagamento, vistoria e prazo de reembolso após o check-out.',
    lead:
      'A caução é uma garantia temporária para cobrir eventuais danos ou pendências. Na Recife Flats, o valor é reembolsado após a vistoria de saída, conforme as regras abaixo.',
    updatedAt: '2026-01-15',
    sections: [
      {
        title: 'Para que serve a caução',
        paragraphs: [
          'A caução protege o imóvel contra danos acima do uso normal, perda de chaves, itens extraviados ou descumprimento de regras da casa.',
          'Não é uma taxa extra: quando tudo está em ordem, o valor integral é devolvido ao hóspede.',
        ],
      },
      {
        title: 'Valor e forma de pagamento',
        paragraphs: [
          'O valor da caução varia conforme o apartamento e o período da estadia. Informamos o valor exato antes da confirmação da reserva.',
        ],
        items: [
          'Pagamento via Pix ou transferência bancária, conforme orientação no ato da reserva',
          'A caução não substitui o pagamento das diárias',
          'Em alguns casos, plataformas parceiras podem reter o valor em cartão — confirmamos o método no WhatsApp',
        ],
      },
      {
        title: 'Vistoria e reembolso',
        items: [
          'Check-out com vistoria do apartamento (presencial ou por checklist acordado)',
          'Reembolso em até 7 dias úteis após a saída, quando não houver pendências',
          'Descontos apenas em caso de dano comprovado, limpeza extraordinária ou violação de regras',
          'Relatório fotográfico disponível quando aplicável',
        ],
      },
      {
        title: 'Dúvidas',
        paragraphs: [
          'Cada unidade pode ter particularidades (mobiliário, eletrodomésticos, áreas comuns). Envie suas datas e o apartamento de interesse pelo WhatsApp para receber o valor exato da caução antes de confirmar.',
        ],
      },
    ],
    related: ['cancelamento', 'check-in', 'termos'],
  },

  cancelamento: {
    slug: 'cancelamento',
    title: 'Política de cancelamento',
    eyebrow: 'Reserva',
    metaDescription:
      'Política de cancelamento e reembolso da Recife Flats Temporada para reservas diretas em Boa Viagem e Pina, Recife.',
    lead:
      'Trabalhamos com reserva direta e transparência. As condições de cancelamento são informadas antes da confirmação e variam conforme antecedência e período.',
    updatedAt: '2026-01-15',
    sections: [
      {
        title: 'Reservas diretas (WhatsApp / site)',
        items: [
          'Cancelamento gratuito até 7 dias antes do check-in — reembolso integral das diárias já pagas',
          'Entre 7 e 3 dias antes do check-in — reembolso de 50% das diárias',
          'Menos de 3 dias antes do check-in — sem reembolso das diárias, salvo acordo específico',
          'No-show (não comparecimento) — sem reembolso',
        ],
      },
      {
        title: 'Reservas via plataformas (Booking, Airbnb etc.)',
        paragraphs: [
          'Quando a reserva é feita por marketplace, aplicam-se as regras e prazos da própria plataforma. A Recife Flats segue o contrato vigente no canal em que você reservou.',
        ],
      },
      {
        title: 'Alteração de datas',
        paragraphs: [
          'Mudanças de datas dependem de disponibilidade e podem ser feitas sem custo quando solicitadas com pelo menos 7 dias de antecedência. Entre em contato pelo WhatsApp o quanto antes.',
        ],
      },
      {
        title: 'Força maior',
        paragraphs: [
          'Em situações excepcionais (emergências sanitárias, desastres naturais, restrições oficiais de viagem), analisamos caso a caso com prioridade para remarcação de datas.',
        ],
      },
    ],
    related: ['caucao', 'check-in', 'termos'],
  },

  'check-in': {
    slug: 'check-in',
    title: 'Check-in e check-out',
    eyebrow: 'Hospedagem',
    metaDescription:
      'Horários, documentação e instruções de check-in e check-out nos apartamentos para temporada da Recife Flats em Recife.',
    lead:
      'Chegar e sair com tranquilidade faz parte da experiência. Seguem horários padrão, documentos necessários e o que esperar no dia da sua estadia.',
    updatedAt: '2026-01-15',
    sections: [
      {
        title: 'Horários padrão',
        items: [
          'Check-in: a partir das 15h (3h da tarde)',
          'Check-out: até às 11h (manhã)',
          'Early check-in ou late check-out: sob consulta, conforme disponibilidade da unidade',
        ],
      },
      {
        title: 'No dia do check-in',
        items: [
          'Enviamos instruções de acesso (portaria, chaves, código ou encontro) após a confirmação',
          'Documento de identidade com foto de todos os hóspedes adultos',
          'Cadastro na portaria do condomínio, quando exigido pelo prédio',
          'Orientação sobre Wi-Fi, regras do condomínio e contato de suporte',
        ],
      },
      {
        title: 'No dia do check-out',
        items: [
          'Desocupar o apartamento até o horário combinado',
          'Ligar equipamentos, fechar janelas e desligar ar-condicionado',
          'Deixar louças básicas organizadas (não é necessária limpeza profunda)',
          'Devolver chaves ou informar saída conforme instruções recebidas',
        ],
      },
      {
        title: 'Suporte durante a estadia',
        paragraphs: [
          'Nosso atendimento por WhatsApp cobre dúvidas, orientações e emergências relacionadas à hospedagem. Horário de atendimento comercial: Seg a Sáb, 8h às 20h, com plantão para urgências.',
        ],
      },
    ],
    related: ['caucao', 'cancelamento', 'termos'],
  },

  privacidade: {
    slug: 'privacidade',
    title: 'Política de privacidade',
    eyebrow: 'Legal',
    metaDescription:
      'Como a Recife Flats Temporada coleta, usa e protege seus dados pessoais em reservas e atendimento.',
    lead:
      'Respeitamos sua privacidade. Esta política descreve quais dados coletamos, por que usamos e quais são seus direitos.',
    updatedAt: '2026-01-15',
    sections: [
      {
        title: 'Quem somos',
        paragraphs: [
          'Recife Flats Temporada, hospedagem temporária em Recife/PE, é a responsável pelo tratamento dos dados informados neste site e nos canais de atendimento.',
        ],
      },
      {
        title: 'Dados que coletamos',
        items: [
          'Nome, e-mail, telefone e WhatsApp para reservas e atendimento',
          'Datas de estadia, número de hóspedes e preferências de apartamento',
          'Documentos exigidos para check-in em condomínios (quando aplicável)',
          'Dados de navegação anônimos (cookies analíticos, se habilitados)',
        ],
      },
      {
        title: 'Como usamos seus dados',
        items: [
          'Processar reservas, cotações e comunicação sobre sua estadia',
          'Enviar confirmações, instruções de check-in e suporte',
          'Cumprir obrigações legais e regras de condomínio',
          'Melhorar nosso site e experiência de atendimento',
        ],
      },
      {
        title: 'Compartilhamento',
        paragraphs: [
          'Não vendemos seus dados. Compartilhamos apenas quando necessário: portaria de condomínio (cadastro de hóspedes), processadores de pagamento ou autoridades quando exigido por lei.',
        ],
      },
      {
        title: 'Seus direitos',
        paragraphs: [
          'Você pode solicitar acesso, correção ou exclusão dos seus dados pelo e-mail contato@recifeflats.com.br. Para detalhes sobre bases legais e encarregado, consulte nossa página de LGPD.',
        ],
      },
    ],
    related: ['lgpd', 'cookies', 'termos'],
  },

  termos: {
    slug: 'termos',
    title: 'Termos de uso',
    eyebrow: 'Legal',
    metaDescription:
      'Termos de uso do site e das reservas diretas da Recife Flats Temporada.',
    lead:
      'Ao usar este site e reservar conosco, você concorda com os termos abaixo. Leia com atenção antes de confirmar sua estadia.',
    updatedAt: '2026-01-15',
    sections: [
      {
        title: 'Objeto',
        paragraphs: [
          'Estes termos regem o uso do site recifeflatstemporada.com e a relação de hospedagem temporária entre o hóspede e a Recife Flats Temporada.',
        ],
      },
      {
        title: 'Reservas',
        items: [
          'A reserva é confirmada após acordo de valores, datas e pagamento conforme orientação enviada',
          'Informações do anúncio (fotos, comodidades, capacidade) refletem o imóvel na data da publicação',
          'O hóspede é responsável por informar o número correto de pessoas e respeitar a capacidade máxima',
        ],
      },
      {
        title: 'Obrigações do hóspede',
        items: [
          'Respeitar regras do condomínio, vizinhança e legislação local',
          'Zelar pelo imóvel, mobiliário e equipamentos',
          'Não realizar festas ou eventos sem autorização prévia',
          'Comunicar danos ou problemas assim que identificados',
        ],
      },
      {
        title: 'Limitação de responsabilidade',
        paragraphs: [
          'Não nos responsabilizamos por pertences pessoais deixados no imóvel, interrupções de serviços públicos ou fatores fora do nosso controle razoável. Áreas comuns do condomínio seguem regulamento do próprio prédio.',
        ],
      },
      {
        title: 'Alterações',
        paragraphs: [
          'Podemos atualizar estes termos periodicamente. A data da última revisão aparece no topo desta página.',
        ],
      },
    ],
    related: ['privacidade', 'cancelamento', 'caucao'],
  },

  cookies: {
    slug: 'cookies',
    title: 'Política de cookies',
    eyebrow: 'Legal',
    metaDescription:
      'Como o site Recife Flats Temporada utiliza cookies e tecnologias similares.',
    lead:
      'Cookies são pequenos arquivos armazenados no seu navegador. Usamos apenas o necessário para o funcionamento e melhoria do site.',
    updatedAt: '2026-01-15',
    sections: [
      {
        title: 'Cookies essenciais',
        paragraphs: [
          'Necessários para preferências básicas (ex.: idioma salvo no navegador) e funcionamento do site. Não exigem consentimento prévio.',
        ],
      },
      {
        title: 'Cookies analíticos',
        paragraphs: [
          'Podemos utilizar ferramentas como Google Analytics para entender como visitantes usam o site (páginas visitadas, tempo de sessão). Os dados são agregados e anônimos sempre que possível.',
        ],
      },
      {
        title: 'Como gerenciar',
        paragraphs: [
          'Você pode bloquear ou apagar cookies nas configurações do seu navegador. Isso pode afetar algumas funcionalidades do site.',
        ],
      },
    ],
    related: ['privacidade', 'lgpd'],
  },

  lgpd: {
    slug: 'lgpd',
    title: 'LGPD — Proteção de dados',
    eyebrow: 'Legal',
    metaDescription:
      'Informações sobre tratamento de dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD) — Recife Flats Temporada.',
    lead:
      'Em conformidade com a Lei nº 13.709/2018 (LGPD), informamos como tratamos dados pessoais e como você pode exercer seus direitos.',
    updatedAt: '2026-01-15',
    sections: [
      {
        title: 'Controlador',
        paragraphs: [
          'Recife Flats Temporada — contato@recifeflats.com.br — Av. Eng. Domingos Ferreira, 2041, Boa Viagem, Recife/PE.',
        ],
      },
      {
        title: 'Bases legais',
        items: [
          'Execução de contrato: processar sua reserva e hospedagem',
          'Legítimo interesse: melhorar atendimento e segurança',
          'Consentimento: comunicações de marketing (quando aplicável)',
          'Obrigação legal: registros exigidos por autoridades ou condomínios',
        ],
      },
      {
        title: 'Retenção',
        paragraphs: [
          'Mantemos dados pelo tempo necessário para cumprir a hospedagem, obrigações fiscais e prazos legais. Após isso, dados são eliminados ou anonimizados.',
        ],
      },
      {
        title: 'Encarregado / DPO',
        paragraphs: [
          'Para exercer direitos de titular (acesso, correção, exclusão, portabilidade, revogação de consentimento), envie e-mail para contato@recifeflats.com.br com o assunto "LGPD — Solicitação de titular".',
        ],
      },
    ],
    related: ['privacidade', 'cookies'],
  },
};

/** @param {string} slug */
export function getPolicy(slug) {
  return POLICIES[slug] || null;
}

/** @returns {PolicyPage[]} */
export function getAllPolicies() {
  return Object.values(POLICIES);
}
