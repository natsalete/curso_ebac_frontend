const form = document.getElementById("form-numero");
const numeroA = document.getElementById("numero-a");
const numeroB = document.getElementById("numero-b");
const buttonOk = document.getElementById("btn-ok");
const buttonOkInvalido = document.getElementById("btn-okInvalido");
const buttonValidar = document.getElementById("btn-validar");
const mensagemSucesso = document.querySelector(".mensagem-sucesso");
const mensagemError = document.querySelector(".mensagem-error");

let formeEValido = false;

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  formeEValido = Number(numeroB.value) > Number(numeroA.value);
  handleValidation(formeEValido);
}

function handleValidation(isValid) {
  if (isValid) {
    showSuccessMessage();
  } else {
    showErrorMessage();
  }
}

function showSuccessMessage() {
  mensagemSucesso.classList.add("mensagem-sucesso");
  mensagemSucesso.style.display = "block";
  resetForm();
  buttonOk.addEventListener("click", hideMessage);
}

function showErrorMessage() {
  mensagemError.classList.add("mensagem-error");
  mensagemError.style.display = "block";
  resetForm();
  buttonOkInvalido.addEventListener("click", hideMessage);
}

function resetForm() {
  numeroA.value = "";
  numeroB.value = "";
  buttonValidar.disabled = true;
  numeroA.disabled = true;
  numeroB.disabled = true;
}

function hideMessage() {
  mensagemSucesso.style.display = "none";
  mensagemError.style.display = "none";
  buttonValidar.disabled = false;
  numeroA.disabled = false;
  numeroB.disabled = false;
}