// pega os elementos do HTML (input, botão e lista)
const inputTarefa = document.getElementById('DigitarTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');


// carrega tarefas salvas no navegador ao abrir a página
listaTarefas.innerHTML = localStorage.getItem("tarefas") || "";
adicionarEventos(); // reaplica eventos nas tarefas carregadas


// quando clicar no botão "Adicionar"
btnAdicionar.addEventListener('click', function () {

    const tarefa = inputTarefa.value; // pega o texto digitado

    // evita adicionar tarefa vazia
    if (tarefa === "") {
        alert("Digite uma tarefa!");
        return;
    }

    // cria um novo item da lista
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = tarefa; // coloca o texto da tarefa
    li.appendChild(span);

    // ao clicar no item -> marca/desmarca como concluído
    li.addEventListener("click", function () {
        span.classList.toggle("concluida");
        salvarTarefas();
    });

    // cria botão de excluir
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "🎀";
    btnExcluir.classList.add("btn-excluir");

    // ao clicar no botão -> remove a tarefa
    btnExcluir.addEventListener("click", function (event) {
        event.stopPropagation(); // evita ativar o clique do li
        li.remove();
        salvarTarefas();
    });

    li.appendChild(btnExcluir);

    // adiciona o item na lista
    listaTarefas.appendChild(li);

    // limpa o campo de texto
    inputTarefa.value = "";

    // salva no navegador
    salvarTarefas();
});


// salva as tarefas no localStorage
function salvarTarefas() {
    localStorage.setItem('tarefas', listaTarefas.innerHTML);
}


// reaplica eventos nas tarefas carregadas do localStorage
function adicionarEventos() {
    const itens = document.querySelectorAll("li");

    itens.forEach(li => {
        const span = li.querySelector("span");
        const btn = li.querySelector("button");

        // clicar no item → riscar
        li.addEventListener("click", function () {
            span.classList.toggle("concluida");
            salvarTarefas();
        });

        // clicar no botão -> excluir
        btn.addEventListener("click", function (event) {
            event.stopPropagation();
            li.remove();
            salvarTarefas();
        });
    });
}