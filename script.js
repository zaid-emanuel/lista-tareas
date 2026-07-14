// Referencias a los elementos del DOM definidos por el Programador 2
const inputTexto = document.getElementById('task-input');
const inputFecha = document.getElementById('task-date');
const botonAgregar = document.getElementById('add-task-btn');
const listaTareas = document.getElementById('task-list');

// Arreglo que almacena las tareas en memoria
let tareas = [];

// Dibuja las tareas actuales dentro del <ul id="task-list">
function renderizarTareas() {
  listaTareas.innerHTML = '';

  tareas.forEach((tarea) => {
    const li = document.createElement('li');

    const spanTexto = document.createElement('span');
    spanTexto.textContent = tarea.texto;
    li.appendChild(spanTexto);

    // Solo muestra la fecha si el usuario capturó una
    if (tarea.fecha) {
      const spanFecha = document.createElement('small');
      spanFecha.textContent = `Vence: ${tarea.fecha}`;
      li.appendChild(spanFecha);
    }

    listaTareas.appendChild(li);
  });
}

// Agrega una nueva tarea al arreglo y actualiza la lista visual
function agregarTarea() {
  const texto = inputTexto.value.trim();
  const fecha = inputFecha.value;

  if (texto === '') return;

  tareas.push({ texto: texto, fecha: fecha, completada: false });

  inputTexto.value = '';
  inputFecha.value = '';
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