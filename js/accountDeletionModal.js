import siteConfig from "../config/siteConfig.js";

const modal = document.getElementById("accountDeletionModal");
const form = document.getElementById("accountDeletionForm");
const confirmationInput = document.getElementById("accountDeletionConfirmation");
const submitButton = document.getElementById("accountDeletionSubmit");
const status = document.getElementById("accountDeletionStatus");

if (modal && form && confirmationInput && submitButton && status) {
  const { contact, legal } = siteConfig;

  document.querySelectorAll("[data-deletion-dpo-email]").forEach((element) => {
    element.textContent = contact.dpoEmail;
    element.href = `mailto:${contact.dpoEmail}`;
  });
  document.querySelectorAll("[data-deletion-retention-period]").forEach((element) => {
    element.textContent = legal.dataRetentionPeriod;
  });

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    status.textContent = "";
    form.reset();
    submitButton.disabled = true;
  };

  document.querySelectorAll("[data-open-account-deletion]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      modal.hidden = false;
      document.body.classList.add("modal-open");
      confirmationInput.focus();
    });
  });
  document.querySelectorAll("[data-close-account-deletion]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
  confirmationInput.addEventListener("input", () => {
    submitButton.disabled = confirmationInput.value !== "EXCLUIR";
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (confirmationInput.value !== "EXCLUIR") return;

    const subject = encodeURIComponent("Solicitação de exclusão de conta e dados");
    const body = encodeURIComponent(
      "Solicito a exclusão da minha conta e dos meus dados pessoais, conforme a LGPD."
    );
    status.textContent = "Sua solicitação será aberta no aplicativo de e-mail para envio ao DPO.";
    window.location.href = `mailto:${contact.dpoEmail}?subject=${subject}&body=${body}`;
  });
}
