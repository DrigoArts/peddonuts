const form = document.getElementById("registerForm");
const passwordInput = document.getElementById("password");
const confirmationInput = document.getElementById("passwordConfirmation");
const strengthBar = document.getElementById("passwordStrengthBar");
const strengthLabel = document.getElementById("passwordStrengthLabel");
const confirmationError = document.getElementById("confirmationError");
const feedback = document.getElementById("formFeedback");

const getPasswordStrength = (password) => {
  if (!password) return { level: "", label: "Digite uma senha." };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { level: "weak", label: "Senha fraca" };
  if (score <= 3) return { level: "medium", label: "Senha média" };
  return { level: "strong", label: "Senha forte" };
};

const updateStrength = () => {
  const strength = getPasswordStrength(passwordInput.value);
  strengthBar.dataset.level = strength.level;
  strengthLabel.textContent = strength.label;
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
  updateStrength();
  validateConfirmation();
});
confirmationInput.addEventListener("input", validateConfirmation);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateConfirmation();
  feedback.textContent = "";
  feedback.className = "form-feedback";

  if (!form.checkValidity()) {
    form.reportValidity();
    feedback.textContent = "Revise os campos destacados antes de continuar.";
    feedback.classList.add("error");
    return;
  }

  feedback.textContent = "Cadastro validado com sucesso! A integração com o servidor ainda precisa ser configurada.";
  feedback.classList.add("success");
  form.reset();
  updateStrength();
});

updateStrength();
