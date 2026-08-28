import siteConfig from "../config/siteConfig.js";

const form = document.getElementById("recoveryForm");
const feedback = document.getElementById("recoveryFeedback");
const supportEmail = document.querySelector("[data-support-email]");

if (form && feedback) {
  if (supportEmail) {
    supportEmail.textContent = siteConfig.contact.supportEmail;
    supportEmail.href = `mailto:${siteConfig.contact.supportEmail}`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "Se o e-mail estiver cadastrado, enviaremos um link de recuperação.";
    feedback.className = "recovery-feedback success";
    form.reset();
  });
}
