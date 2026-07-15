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

  tareas.forEach((tarea, indice) => {
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

// Evento al hacer clic en el botón "Agregar"
botonAgregar.addEventListener('click', agregarTarea);

// Evento para permitir agregar la tarea presionando "Enter"
inputTexto.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    agregarTarea();
  }
});

// Delegación de eventos para los botones de editar y eliminar
listaTareas.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button');
  if (!boton) return;

  const indice = Number(boton.dataset.indice);
  const accion = boton.dataset.accion;

  if (accion === 'eliminar') {
    eliminarTarea(indice);
  }

  if (accion === 'editar') {
    actualizarTarea(indice);
  }
});