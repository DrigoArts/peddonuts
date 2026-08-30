/**
 * Configuração central da aplicação.
 * Substitua os valores de exemplo ao publicar para um novo cliente.
 */
export const siteConfig = {
  legal: {
    companyName: "Razão Social da Empresa LTDA",
    tradeName: "P&D Donuts",
    cnpj: "00.000.000/0001-00",
    stateRegistration: "Isento",
    address: {
      street: "Rua Exemplo",
      number: "123",
      complement: "Sala 401",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01000-000",
      country: "Brasil",
      fullAddress: "Rua Exemplo, 123, Sala 401, Centro, São Paulo - SP, CEP 01000-000",
    },
    jurisdictionForum: "Comarca de São Paulo, Estado de São Paulo",
    dataRetentionPeriod: "5 (cinco) anos",
    minAgeRequirement: 18,
  },
  contact: {
    supportEmail: "suporte@cliente.com.br",
    dpoEmail: "privacidade@cliente.com.br",
    commercialEmail: "comercial@cliente.com.br",
    phone: "+55 11 99999-9999",
    whatsapp: "+5511949548219",
    supportHours: "Segunda a Sexta, das 09h às 18h (Horário de Brasília)",
  },
  site: {
    url: "https://www.cliente.com.br",
    domain: "cliente.com.br",
    logo: {
      light: "img/donuts.svg",
      dark: "img/donuts.svg",
      symbol: "img/logo.svg",
      alt: "Logotipo P&D Donuts",
    },
    favicon: "icons/icon-192.png",
  },
  seo: {
    defaultTitle: "P&D Donuts",
    titleTemplate: "%s | P&D Donuts",
    description: "Peça seus donuts favoritos de forma rápida e prática.",
    keywords: ["donuts", "doces", "cardápio", "delivery"],
    locale: "pt_BR",
    themeColor: "#ff4081",
    ogImage: "img/logo.svg",
    twitterHandle: "",
  },
  socials: {
    instagram: "",
    linkedin: "",
    facebook: "",
    youtube: "",
    github: "",
  },
  integrations: {
    googleAnalyticsId: "",
    googleTagManagerId: "",
    googleAdSensePublisherId: "",
  },
};

export default siteConfig;
