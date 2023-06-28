const ul = document.querySelector('.tarefas');
const btn = document.querySelector('.btn');
const search = document.querySelector('#search');

//converte uma string JSON em um objeto JavaScript
let tarefas = JSON.parse(localStorage.getItem('todoTxt')) ?? [];

function salvarTodoList() {
  localStorage.setItem('todoTxt', JSON.stringify(tarefas));
}

const criarHTML = (item, index) => {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const aTrash = document.createElement('a');
  aTrash.setAttribute('class', 'trash');
  aTrash.setAttribute('onclick', `deletarTarefa(${index})`);

  const aCheck = document.createElement('a');
  aCheck.setAttribute('class', 'checkbox');

  // Verifica se a propriedade nome existe no objeto de tarefa (item). Se existir, define o texto do elemento <li> como o valor da propriedade nome usando li.innerText = item.nome
  if (item.nome) {
    li.innerText = item.nome;
  }

  li.appendChild(div);
  div.appendChild(aCheck);
  div.appendChild(aTrash);
  // Verifica se a propriedade concluida existe no objeto de tarefa (item). Se existir e for true, adiciona a classe CSS 'concluida' ao elemento <li> usando li.classList.add('concluida'). Isso permite estilizar visualmente as tarefas concluídas
  if (item.concluida) {
    li.classList.add('concluida');
  }

  // Adiciona um evento de clique ao elemento <li> usando aCheck.addEventListener('click', ...) para que a função seja executada quando a tarefa for clicada.
  aCheck.addEventListener('click', () => {
    item.concluida = !item.concluida;
   aCheck.classList.toggle('checked');
   console.log(aCheck)
    salvarTodoList();
    renderizarTarefas();
   
  });
 

  ul.appendChild(li);
};



// Deletar
const deletarTarefa = (i) => {
  tarefas.splice(i, 1);
  salvarTodoList();
  renderizarTarefas();
};

const renderizarTarefas = () => {
  ul.innerHTML = '';
  tarefas.map((item, index) => criarHTML(item, index));
};

const handleClick = () => {
  const novaTarefa = {
    nome: search.value.trim(),
    concluida: false,
  };
  search.value=''
  tarefas.push(novaTarefa);
  salvarTodoList();
  renderizarTarefas();
};

btn.addEventListener('click', handleClick);
renderizarTarefas();
