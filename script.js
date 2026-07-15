// ===== Referencias a elementos del DOM (definidos por el Programador 2) =====
const inputTexto = document.getElementById('task-input');
const inputFecha = document.getElementById('task-date');
const botonAgregar = document.getElementById('add-task-btn');
const listaTareas = document.getElementById('task-list');
const contadorTareas = document.querySelector('.task-counter');
const nombresEquipo = document.getElementById('team-names');

// ===== Estado de la aplicación =====
let tareas = [];

// ===== Funciones =====

function actualizarContador() {
  const completadas = tareas.filter((tarea) => tarea.completada).length;
  contadorTareas.textContent = `${completadas} tareas completadas`;
}

function renderizarTareas() {
  listaTareas.innerHTML = '';

  tareas.forEach((tarea, indice) => {
    const li = document.createElement('li');
    if (tarea.completada) li.classList.add('task-completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarea.completada;
    checkbox.dataset.accion = 'completar';
    checkbox.dataset.indice = indice;
    li.appendChild(checkbox);

    const spanTexto = document.createElement('span');
    spanTexto.textContent = tarea.texto;
    li.appendChild(spanTexto);

    if (tarea.fecha) {
      const spanFecha = document.createElement('small');
      spanFecha.textContent = `Vence: ${tarea.fecha}`;
      li.appendChild(spanFecha);
    }

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

function agregarTarea() {
  const texto = inputTexto.value.trim();
  const fecha = inputFecha.value;

  if (texto === '') return;

  tareas.push({ texto: texto, fecha: fecha, completada: false });

  inputTexto.value = '';
  inputFecha.value = '';
  renderizarTareas();
}

function eliminarTarea(indice) {
  tareas.splice(indice, 1);
  renderizarTareas();
}

function actualizarTarea(indice) {
  const nuevoTexto = prompt('Actualiza el texto de la tarea:', tareas[indice].texto);

  if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
    tareas[indice].texto = nuevoTexto.trim();
    renderizarTareas();
  }
}

function alternarCompletada(indice, estado) {
  tareas[indice].completada = estado;
  renderizarTareas();
}

// ===== Eventos =====

botonAgregar.addEventListener('click', agregarTarea);

inputTexto.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    agregarTarea();
  }
});

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

// ===== Créditos del equipo =====
const integrantes = [
  'Programador 1: Zaid',
  'Programador 2: Saul',
  'Programador 3: Deyla',
  'Programador 4: Medina',
  'Programador 5: Alan',
];

nombresEquipo.textContent = integrantes.join(', ');