const form = document.getElementById("resetPasswordForm");
const passwordInput = document.getElementById("newPassword");
const confirmationInput = document.getElementById("newPasswordConfirmation");
const confirmationError = document.getElementById("newPasswordConfirmationError");
const feedback = document.getElementById("resetFeedback");
const requirements = {
  length: document.getElementById("requirementLength"),
  uppercase: document.getElementById("requirementUppercase"),
  lowercase: document.getElementById("requirementLowercase"),
  number: document.getElementById("requirementNumber"),
};

const updateRequirements = () => {
  const password = passwordInput.value;
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
  };

  Object.entries(checks).forEach(([name, valid]) => {
    requirements[name].classList.toggle("valid", valid);
  });
  return Object.values(checks).every(Boolean);
};

const validateConfirmation = () => {
  const matches = passwordInput.value === confirmationInput.value;
  confirmationInput.setCustomValidity(matches ? "" : "As senhas precisam ser iguais.");
  confirmationError.textContent = matches || !confirmationInput.value
    ? ""
    : "As senhas não coincidem.";
  return matches;
};

passwordInput.addEventListener("input", () => {
  updateRequirements();
  validateConfirmation();
});
confirmationInput.addEventListener("input", validateConfirmation);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const requirementsMet = updateRequirements();
  const passwordsMatch = validateConfirmation();
  feedback.textContent = "";
  feedback.className = "recovery-feedback";

  if (!requirementsMet || !passwordsMatch || !form.checkValidity()) {
    form.reportValidity();
    feedback.textContent = "Crie uma senha que atenda a todos os requisitos.";
    feedback.classList.add("error");
    return;
  }

  feedback.textContent = "Senha redefinida com sucesso. Você já pode acessar sua conta.";
  feedback.classList.add("success");
  form.reset();
  updateRequirements();
});

updateRequirements();
