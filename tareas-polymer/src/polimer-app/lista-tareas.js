import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class ListaTareas extends PolymerElement {

  constructor(){
    super();
    this.cargarTareas();
  }

  static get template() {
        return html`
          <style>
            .list-container {
              max-width: 600px;
              margin: 0 auto;
              font-family: Arial, sans-serif;
            }
            h1 {
              text-align: center;
              color: #333;
            }
          </style>
          <div class="list-container">
            <h1>Gestor de Tareas</h1>
            <nueva-tarea on-agregar-tarea="agregarTarea"></nueva-tarea>
          </div>
        `;
      }

      static get properties() {
        return {
          tareas: { type: Array, value: () => [] }
        };
      }

      cargarTareas() {
        const tareas = localStorage.getItem('tareas');
        this.tareas = tareas ? JSON.parse(tareas) : [];
        const listaTareas = document.getElementById("lista-tareas");
        listaTareas.innerHTML = "";
        for(let tarea of this.tareas){
          const tareaElemento = document.createElement("tarea-elemento");
          tareaElemento.tarea = tarea;
          tareaElemento.addEventListener("borrar-tarea", this.borrarTarea.bind(this));
          listaTareas.appendChild(tareaElemento);
        }
      }

      guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
        this.cargarTareas();
      }

      agregarTarea(e) {
        const nuevaTarea = {
          id: Date.now(),
          nombre: e.detail.nombre,
          completado: false
        };
        this.push('tareas', nuevaTarea);
        this.guardarTareas();
      }

      borrarTarea(e) {
        const id = e.detail.id;
        this.set('tareas', this.tareas.filter(tarea => tarea.id !== id));
        this.guardarTareas();
      }
    } 
customElements.define('lista-tareas', ListaTareas);
