$(document).ready(function () {
    $("#carousel-imagens").slick({
      autoplay: true,
      arrows: false,
    });
  
    $("#telefone").mask("(00) 00000-0000", {
      placeholder: "(DDD) 12345-6789",
    });
  
    $("#cpf").mask("000.000.000-00", {
      placeholder: "123.456.789-00",
    });
  
    $("#cep").mask("00000-000", {
      placeholder: "012345-678",
    });
  
    $("form").validate({
      rules: {
        nome: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        telefone: {
          required: true,
        },
        endereco: {
          required: true,
        },
        cep: {
          required: true,
        },
        cpf: {
          required: true,
        },
      },
      submitHandler: function (form) {
        console.log(form);
        alert(`Sua requisição foi enviada para análise, parabéns pela aquisição!`);
        form.reset();
      },
  
      invalidHandler: function (evento, validator) {
        let camposIncorretos = validator.numberOfInvalids();
        if (camposIncorretos) {
          alert(`Por favor, preencha os campos para prosseguir com a compra!`);
        }
      },
    });
  });
  