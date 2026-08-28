import siteConfig from "../config/siteConfig.js";

const supportLink = document.querySelector("[data-support-email]");
const tradeName = document.querySelector("[data-trade-name]");

if (supportLink) {
  const email = siteConfig.contact.supportEmail;
  supportLink.textContent = email;
  supportLink.href = `mailto:${email}`;
}

if (tradeName) {
  tradeName.textContent = siteConfig.legal.tradeName;
}
