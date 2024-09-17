const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks'); // Seleciona a lista de tarefas

let minhaListaDeItens = []; // Array para armazenar as tarefas

function adicionarNovaTarefa() {
    const tarefa = input.value.trim(); // Obtém e remove espaços em branco ao redor da entrada

    if (tarefa === '') {
        // Verifica se o input está vazio e exibe um alerta
        alert('Por favor, digite uma tarefa.');
        return;
    }

    // Adiciona a nova tarefa ao array com o estado inicial de não concluída
    minhaListaDeItens.push({ tarefa, concluida: false });

    input.value = ''; // Limpa o campo de entrada

    mostrarTarefas(); // Atualiza a lista de tarefas exibida
}

function mostrarTarefas() {
    let novali = '';

    minhaListaDeItens.forEach((item, index) => {
        novali += `
        <li class="task ${item.concluida ? 'concluida' : ''}">
            <img src="/img/thumb-up.png" alt="Check na tarefa" class="check-icon" onclick="concluirTarefa(${index})">
            <p>${item.tarefa}</p>
            <img src="/img/bin.png" alt="Remover tarefa" class="bin-icon" data-index="${index}">
        </li>
        `;
    });

    listaCompleta.innerHTML = novali;
}

function concluirTarefa(index) {
    // Marca a tarefa como concluída e atualiza a visualização
    minhaListaDeItens[index].concluida = !minhaListaDeItens[index].concluida;
    mostrarTarefas(); // Atualiza a lista de tarefas exibida
}

function removerTarefa(index) {
    // Remove a tarefa do array e atualiza a visualização
    minhaListaDeItens.splice(index, 1);
    mostrarTarefas();
}

button.addEventListener('click', adicionarNovaTarefa);

// Delegação de eventos para lidar com cliques nos ícones de remoção
listaCompleta.addEventListener('click', (event) => {
    if (event.target.classList.contains('bin-icon')) {
        const index = event.target.getAttribute('data-index');
        removerTarefa(Number(index));
    }
});
