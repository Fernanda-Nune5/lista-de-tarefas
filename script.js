// pegar os elementos
const inputTarefa = document.getElementById('DigitarTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');

// carregar tarefas salvas ao abrir a página
listaTarefas.innerHTML = localStorage.getItem("tarefas") || "";
adicionarEventos();

// quando clicar no botão
btnAdicionar.addEventListener('click', function () {

    const tarefa = inputTarefa.value;

    // evitar tarefa vazia
    if (tarefa === "") {
        alert("Digite uma tarefa!");
        return;
    }

    // cria item
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = tarefa;
    li.appendChild(span);

    // riscar tarefa
    li.addEventListener("click", function () {
        span.classList.toggle("concluida");
        salvarTarefas();
    });

    // botão excluir
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "🎀";

    btnExcluir.classList.add("btn-excluir");

    btnExcluir.addEventListener("click", function (event) {
        event.stopPropagation(); // evita riscar
        li.remove();
        salvarTarefas();
    });

    li.appendChild(btnExcluir);

    // adicionar na lista
    listaTarefas.appendChild(li);

    // limpar input
    inputTarefa.value = "";

    // salvar
    salvarTarefas();
});


// salvar no localStorage
function salvarTarefas() {
    localStorage.setItem('tarefas', listaTarefas.innerHTML);
}


// reaplicar eventos nas tarefas carregadas
function adicionarEventos() {
    const itens = document.querySelectorAll("li");

    itens.forEach(li => {
        const span = li.querySelector("span");
        const btn = li.querySelector("button");

        // riscar
        li.addEventListener("click", function () {
            span.classList.toggle("concluida");
            salvarTarefas();
        });

        // excluir
        btn.addEventListener("click", function (event) {
            event.stopPropagation();
            li.remove();
            salvarTarefas();
        });
    });
}