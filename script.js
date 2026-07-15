// Referencias a los elementos del DOM definidos por el Programador 2
const inputTexto = document.getElementById('task-input');
const inputFecha = document.getElementById('task-date');
const botonAgregar = document.getElementById('add-task-btn');
const listaTareas = document.getElementById('task-list');
const contadorTareas = document.querySelector('.task-counter');

// Arreglo que almacena las tareas en memoria
let tareas = [];

// Actualiza el texto del contador de tareas completadas
function actualizarContador() {
  const completadas = tareas.filter((tarea) => tarea.completada).length;
  contadorTareas.textContent = `${completadas} tareas completadas`;
}

// Dibuja las tareas actuales dentro del <ul id="task-list">
function renderizarTareas() {
  listaTareas.innerHTML = '';

  tareas.forEach((tarea, indice) => {
    const li = document.createElement('li');
    if (tarea.completada) li.classList.add('task-completed');

    // Checkbox para marcar la tarea como completada
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarea.completada;
    checkbox.dataset.accion = 'completar';
    checkbox.dataset.indice = indice;
    li.appendChild(checkbox);

    const spanTexto = document.createElement('span');
    spanTexto.textContent = tarea.texto;
    li.appendChild(spanTexto);

    // Solo muestra la fecha si el usuario capturó una
    if (tarea.fecha) {
      const spanFecha = document.createElement('small');
      spanFecha.textContent = `Vence: ${tarea.fecha}`;
      li.appendChild(spanFecha);
    }

    // Contenedor de botones de acción
    const divAcciones = document.createElement('div');
    divAcciones.classList.add('task-actions');

    const botonEditar = document.createElement('button');
    botonEditar.textContent = '✏️';
    botonEditar.dataset.accion = 'editar';
    botonEditar.dataset.indice = indice;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = '🗑️';
    botonEliminar.dataset.accion = 'eliminar';
    botonEliminar.dataset.indice = indice;

    divAcciones.appendChild(botonEditar);
    divAcciones.appendChild(botonEliminar);
    li.appendChild(divAcciones);

    listaTareas.appendChild(li);
  });

  actualizarContador();
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

// Elimina una tarea del arreglo según su índice
function eliminarTarea(indice) {
  tareas.splice(indice, 1);
  renderizarTareas();
}

// Actualiza el texto de una tarea existente
function actualizarTarea(indice) {
  const nuevoTexto = prompt('Actualiza el texto de la tarea:', tareas[indice].texto);

  if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
    tareas[indice].texto = nuevoTexto.trim();
    renderizarTareas();
  }
}

// Marca o desmarca una tarea como completada
function alternarCompletada(indice, estado) {
  tareas[indice].completada = estado;
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

// Delegación de eventos para checkbox, editar y eliminar
listaTareas.addEventListener('click', (evento) => {
  const elemento = evento.target;
  const indice = Number(elemento.dataset.indice);
  const accion = elemento.dataset.accion;

  if (accion === 'eliminar') {
    eliminarTarea(indice);
  }

  if (accion === 'editar') {
    actualizarTarea(indice);
  }

  if (accion === 'completar') {
    alternarCompletada(indice, elemento.checked);
  }
});

// Referencia al contenedor de nombres del equipo, definido en el footer
const nombresEquipo = document.getElementById('team-names');

// Lista de integrantes del equipo
const integrantes = [
  'Programador 1',
  'Programador 2',
  'Programador 3',
  'Programador 4'
];

// Muestra los nombres del equipo separados por coma
nombresEquipo.textContent = integrantes.join(', ');