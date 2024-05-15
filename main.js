const form = document.getElementById("form-numero");
const numeroA = document.getElementById("numero-a");
const numeroB = document.getElementById("numero-b");

let formeEValido = false;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  formeEValido = numeroB.value > numeroA.value;

  if (formeEValido) {
    const containerMensagemSucesso =
      document.querySelector(".mensagem-sucesso");
    containerMensagemSucesso.classList.add("mensagem-sucesso");
    containerMensagemSucesso.style.display = "block";
    numeroA.value = "";
    numeroB.value = "";
  }
});
