import siteConfig from "../config/siteConfig.js";

const friendlyMessages = [
  "A página que você procurava pode ter sido removida, movida ou nunca existiu.",
  "Parece que o caminho acessado não está mais disponível no momento.",
  "Não foi possível localizar esse endereço, mas você ainda pode voltar ao início.",
  "Essa página não está mais disponível no momento, mas temos muitas opções para você explorar."
];

const messageText = friendlyMessages[Math.floor(Math.random() * friendlyMessages.length)];

const messageEl = document.querySelector("[data-not-found-message]");
const titleEl = document.querySelector("[data-not-found-title]");
const supportEmailLink = document.querySelector("[data-support-email]");
const supportButtonLink = document.querySelector("[data-support-link]");
const homeLink = document.querySelector("[data-home-link]");

if (titleEl) {
  titleEl.textContent = "Ops! Página não encontrada";
}

if (messageEl) {
  messageEl.textContent = messageText;
}

const supportEmail = siteConfig?.contact?.supportEmail || "suporte@cliente.com.br";
const supportHref = `mailto:${supportEmail}`;

if (supportEmailLink) {
  supportEmailLink.textContent = supportEmail;
  supportEmailLink.href = supportHref;
}

if (supportButtonLink) {
  supportButtonLink.href = supportHref;
  supportButtonLink.setAttribute("aria-label", `Entrar em contato com o suporte (${supportEmail})`);
}

if (homeLink) {
  homeLink.href = "./index.html";
}

document.title = `404 | ${siteConfig?.legal?.tradeName || "P&D Donuts"}`;
