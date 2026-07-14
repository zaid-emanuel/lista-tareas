// Referencias a los elementos del DOM definidos por el Programador 2
const inputTexto = document.getElementById('task-input');
const botonAgregar = document.getElementById('add-task-btn');
const listaTareas = document.getElementById('task-list');

// Arreglo que almacena las tareas en memoria
let tareas = [];

// Dibuja las tareas actuales dentro del <ul id="task-list">
function renderizarTareas() {
  listaTareas.innerHTML = '';

  tareas.forEach((tarea) => {
    const li = document.createElement('li');
    li.textContent = tarea.texto;
    listaTareas.appendChild(li);
  });
}

// Agrega una nueva tarea al arreglo y actualiza la lista visual
function agregarTarea() {
  const texto = inputTexto.value.trim();

  if (texto === '') return;

  tareas.push({ texto: texto, completada: false });

  inputTexto.value = '';
  renderizarTareas();
}

// Evento al hacer clic en el botón "Agregar"
botonAgregar.addEventListener('click', agregarTarea);

// Evento para permitir agregar la tarea presionando "Enter"
inputTexto.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    agregarTarea();
  }
});