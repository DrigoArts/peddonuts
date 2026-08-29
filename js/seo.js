import siteConfig from "../config/siteConfig.js";

const getAbsoluteUrl = (path) => {
  if (!path) return "";

  try {
    return new URL(path, `${siteConfig.site.url}/`).href;
  } catch {
    return path;
  }
};

const ensureMeta = (attributes) => {
  const key = attributes.property
    ? `meta[property="${attributes.property}"]`
    : `meta[name="${attributes.name}"]`;

  let element = document.head.querySelector(key);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([attribute, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        element.setAttribute(attribute, String(value));
      }
    });
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([attribute, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      element.setAttribute(attribute, String(value));
    }
  });

  return element;
};

const ensureLink = (attributes) => {
  const selector = `link[rel="${attributes.rel}"]`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([attribute, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      element.setAttribute(attribute, String(value));
    }
  });

  return element;
};

const applySeo = () => {
  const { seo, site } = siteConfig;
  const pageTitle = document.title?.trim() || seo.defaultTitle;
  const canonicalUrl = new URL(location.pathname || "/", site.url).href;
  const imageUrl = getAbsoluteUrl(seo.ogImage || site.logo?.symbol || site.logo?.light || "");

  document.title = pageTitle.includes("%s")
    ? pageTitle.replace("%s", document.title || seo.defaultTitle)
    : pageTitle;

  if (seo.titleTemplate && document.title && document.title !== seo.defaultTitle) {
    document.title = seo.titleTemplate.replace("%s", document.title);
  }

  ensureMeta({ name: "description", content: seo.description || "" });
  ensureMeta({ name: "theme-color", content: seo.themeColor || "#ffffff" });
  ensureMeta({ property: "og:title", content: document.title || seo.defaultTitle });
  ensureMeta({ property: "og:description", content: seo.description || "" });
  ensureMeta({ property: "og:image", content: imageUrl });
  ensureMeta({ property: "og:url", content: canonicalUrl });
  ensureMeta({ property: "og:type", content: "website" });
  ensureMeta({ property: "og:site_name", content: seo.defaultTitle || site.domain || "P&D Donuts" });
  ensureMeta({ name: "twitter:card", content: "summary_large_image" });
  ensureMeta({ name: "twitter:title", content: document.title || seo.defaultTitle });
  ensureMeta({ name: "twitter:description", content: seo.description || "" });
  ensureMeta({ name: "twitter:image", content: imageUrl });

  ensureLink({ rel: "canonical", href: canonicalUrl });

  const faviconLink = document.querySelector('link[rel="icon"]');
  if (faviconLink) {
    faviconLink.href = site.favicon || faviconLink.href;
  } else {
    ensureLink({ rel: "icon", href: site.favicon || "./icons/icon-192.png", type: "image/png" });
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applySeo, { once: true });
} else {
  applySeo();
}
