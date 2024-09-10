$(document).ready(function () {
  // Inicializa os contadores
  let tarefasFeitas = 0;
  let tarefasAndamento = 0;

  // Evento para adicionar uma nova tarefa
  $("form").on("submit", function (e) {
    e.preventDefault();

    const novaTarefa = $("#novaTarefa").val();
    const novoItemLista = $('<li style="display: none"></li>');

    $(`<label class="checkbox-label">
              <input type="checkbox" id="customCheckbox" />
              <span class="checkbox-custom"></span>
            </label>`).appendTo(novoItemLista);

    // Adiciona o conteúdo da nova tarefa
    $(`<p>${novaTarefa}</p>`).appendTo(novoItemLista);

    // Adiciona os botões com eventos
    $(`<div class="lista-tarefas-elementos">
        <button class="button-excluir">
          <img src="./imagens/trash 1.svg" alt="Imagem de uma cesto de lixo" />
        </button>
        <button class="button-editar">
          <img src="./imagens/pencil-square 1.svg" alt="Imagem de papel e caneta" />
        </button> 
      </div>`).appendTo(novoItemLista);

    // Adiciona o novo item à lista e exibe com fadeIn
    $(novoItemLista).appendTo("ul").fadeIn();

    // Atualiza o contador de tarefas em andamento
    tarefasAndamento++;
    $("#contador-andamento").text(tarefasAndamento);

    // Limpa o campo de entrada
    $("#novaTarefa").val("");
  });

  // Evento para monitorar mudanças no checkbox
  $(document).on("change", 'input[type="checkbox"]', function () {
    const item = $(this).closest("li");
    const botaoEditar = item.find(".button-editar");

    if ($(this).is(":checked")) {
      // Desabilita e desfoca o botão quando o checkbox é marcado
      botaoEditar.prop("disabled", true).css("opacity", "0.5");

      // Marca a tarefa como concluída
      item.find("p").css("text-decoration", "line-through");

      // Muda o fundo para um tom mais escuro
      item.css("background", "#f0f0f0");

      tarefasFeitas++;
      tarefasAndamento--;
    } else {
      // Habilita e remove o desfoque do botão quando o checkbox é desmarcado
      botaoEditar.prop("disabled", false).css("opacity", "1");

      // Remove a marcação de tarefa concluída
      item.find("p").css("text-decoration", "none");

      // Volta o fundo para branco
      item.css("background", "#fff");
      
      tarefasFeitas--;
      tarefasAndamento++;
    }

    // Atualiza os contadores
    $("#contador-feitas").text(tarefasFeitas);
    $("#contador-andamento").text(tarefasAndamento);
  });

  // Evento para excluir uma tarefa
  $(document).on("click", ".button-excluir", function () {
    const item = $(this).closest("li");

    // Verifica se o checkbox está marcado
    const tarefaConcluida = item.find('input[type="checkbox"]').is(":checked");

    if (tarefaConcluida) {
      tarefasFeitas--;
      $("#contador-feitas").text(tarefasFeitas);
    } else {
      tarefasAndamento--;
      $("#contador-andamento").text(tarefasAndamento);
    }

    // Remove o item da lista com um efeito fadeOut
    item.fadeOut(function () {
      $(this).remove();
    });
  });

  // Evento para editar uma tarefa
  $(document).on("click", ".button-editar", function () {
    const item = $(this).closest("li");
    const p = item.find("p");
    const textoAtual = p.text();

    // Armazena o texto original
    item.data("textoOriginal", textoAtual);

    // Cria um campo de texto para edição
    const inputEdicao = $(
      `<input id="input-edicao" type="text" value="${textoAtual}" />`
    );

    // Remove a div lista-tarefas-elementos
    item.find(".lista-tarefas-elementos").remove();

    // Substitui o parágrafo pelo campo de texto
    p.replaceWith(inputEdicao);

    // Adiciona botões de salvar e cancelar
    const botoesEdicao = $(`<div class="botoes-edicao">
        <button class="button-salvar">Salvar</button>
        <button class="button-cancelar">Cancelar</button>
      </div>`);
    item.append(botoesEdicao);
  });

  // Evento para salvar as alterações
  $(document).on("click", ".button-salvar", function () {
    const item = $(this).closest("li");
    const inputEdicao = item.find('input[type="text"]');
    const novoTexto = inputEdicao.val();

    // Atualiza o texto da tarefa
    const p = $(`<p>${novoTexto}</p>`);
    inputEdicao.replaceWith(p);

    // Remove os botões de salvar e cancelar
    item.find(".botoes-edicao").remove();

    // Adiciona novamente a div lista-tarefas-elementos
    $(`<div class="lista-tarefas-elementos">
        <button class="button-excluir">
          <img src="./imagens/trash 1.svg" alt="Imagem de uma cesto de lixo" />
        </button>
        <button class="button-editar">
          <img src="./imagens/pencil-square 1.svg" alt="Imagem de papel e caneta" />
        </button>
      </div>`).appendTo(item);
  });

  // Evento para cancelar as alterações
  $(document).on("click", ".button-cancelar", function () {
    const item = $(this).closest("li");
    const textoOriginal = item.data("textoOriginal");

    // Restaura o texto original
    const p = $(`<p>${textoOriginal}</p>`);
    item.find('input[type="text"]').replaceWith(p);

    // Remove os botões de salvar e cancelar
    item.find(".botoes-edicao").remove();

    // Adiciona novamente a div lista-tarefas-elementos
    $(`<div class="lista-tarefas-elementos">
        <button class="button-excluir">
          <img src="./imagens/trash 1.svg" alt="Imagem de uma cesto de lixo" />
        </button>
        <button class="button-editar">
          <img src="./imagens/pencil-square 1.svg" alt="Imagem de papel e caneta" />
        </button>
      </div>`).appendTo(item);
  });
});
