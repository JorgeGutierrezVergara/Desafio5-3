const text_input = document.querySelector("#text_input");
const text_button = document.querySelector("#add_button");
const tabla = document.querySelector("table");
const total = document.querySelector(".total");
const realizadas = document.querySelector(".realizadas");

const tareas = [
  { id: Date.now(), nombre: "Pasear al perro", completado: false },
  { id: Date.now() + 1, nombre: "Tomar medicamentos", completado: false },
  { id: Date.now() + 2, nombre: "Hacer ejercicio", completado: false },
];

text_button.addEventListener("click", () => {
  const nueva_tarea = text_input.value;
  tareas.push({ id: Date.now(), nombre: nueva_tarea, completado: false });
  text_input.value = "";
  html = "";
  render_rows(tareas);
});

function borrar(id) {
  const index = tareas.findIndex((ele) => ele.id == id);
  tareas.splice(index, 1);
  let html = "";
  render_rows(tareas);
}

function check(id) {
  const index = tareas.findIndex((ele) => ele.id == id);
  tareas[index].completado = !tareas[index].completado;

  const checkbox = document.querySelector(`input[data-task-id="${id}"]`);
  checkbox.checked = tareas[index].completado;

  render_rows(tareas);
}

function render_rows(tareas) {
  html = "";
  for (let tarea of tareas) {
    html += `
      <tr> 
          <td> ${String(tarea.id).slice(-3)} </td>
  
          ${
            tarea.completado
              ? `<td> <s>${tarea.nombre} </s> </td>`
              : `<td> ${tarea.nombre} </td>`
          }
  
          <td> <input type="checkbox" data-task-id="${
            tarea.id
          }" onchange="check(${tarea.id})"
          ${tarea.completado ? "checked" : ""}>  </td>
          <td> <button class="borrar" onclick="borrar(${
            tarea.id
          })"> x </button> </td>
      </tr>`;
  }
  const ntareas = tareas.length;
  total.innerHTML = "Total: " + String(ntareas);
  let listas = 0;
  for (let tarea of tareas) {
    if (tarea.completado) {
      listas += 1;
    } else {
      listas += 0;
    }
  }
  realizadas.innerHTML = "Realizadas: " + String(listas);
  tabla.innerHTML =
    `<tr>
          <th>ID</th>
          <th>Tarea</th>
          <th></th>
          <th></th>
      </tr>` + html;
}

render_rows(tareas);
