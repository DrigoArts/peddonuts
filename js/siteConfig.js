import siteConfig from "../config/siteConfig.js";

const setMeta = (name, content, property = false) => {
  if (!content) return;
  const attribute = property ? "property" : "name";
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.content = content;
};

const applySiteConfig = () => {
  const { legal, contact, site, seo } = siteConfig;
  const currentTitle = document.title;
  const pageTitle = currentTitle && currentTitle !== seo.defaultTitle
    ? seo.titleTemplate.replace("%s", currentTitle)
    : seo.defaultTitle;
  document.title = pageTitle;
  document.documentElement.lang = "pt-BR";
  setMeta("description", seo.description);
  setMeta("keywords", seo.keywords.join(", "));
  setMeta("theme-color", seo.themeColor);
  setMeta("og:title", pageTitle, true);
  setMeta("og:description", seo.description, true);
  setMeta("og:image", new URL(seo.ogImage, `${site.url}/`).href, true);
  setMeta("og:locale", seo.locale, true);

  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) favicon.href = site.favicon;

  document.querySelectorAll("[data-site-trade-name]").forEach((el) => {
    el.textContent = legal.tradeName;
  });
  document.querySelectorAll("[data-site-company-name]").forEach((el) => {
    el.textContent = legal.companyName;
  });
  document.querySelectorAll("[data-site-cnpj]").forEach((el) => {
    el.textContent = legal.cnpj;
  });
  document.querySelectorAll("[data-site-address]").forEach((el) => {
    el.textContent = legal.address.fullAddress;
  });
  document.querySelectorAll("[data-site-min-age]").forEach((el) => {
    el.textContent = legal.minAgeRequirement;
  });
  document.querySelectorAll("[data-site-support-email]").forEach((el) => {
    el.textContent = contact.supportEmail;
    el.href = `mailto:${contact.supportEmail}`;
  });
  document.querySelectorAll("[data-site-dpo-email]").forEach((el) => {
    el.textContent = contact.dpoEmail;
    el.href = `mailto:${contact.dpoEmail}`;
  });
  document.querySelectorAll("[data-site-whatsapp]").forEach((el) => {
    el.href = `https://wa.me/${contact.whatsapp}`;
  });
  document.querySelectorAll("[data-site-support-hours]").forEach((el) => {
    el.textContent = contact.supportHours;
  });
  document.querySelectorAll("[data-site-retention-period]").forEach((el) => {
    el.textContent = legal.dataRetentionPeriod;
  });
  document.querySelectorAll("[data-site-jurisdiction-forum]").forEach((el) => {
    el.textContent = legal.jurisdictionForum;
  });
  document.querySelectorAll("[data-site-legal-link]").forEach((el) => {
    el.href = el.dataset.siteLegalLink;
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applySiteConfig);
} else {
  applySiteConfig();
}
