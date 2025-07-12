import { PolymerElement, html } from "@polymer/polymer";

class Tarea extends PolymerElement {
    static get template() {
        return html`
          <style>
            .contenedor-tareas {
              display: flex;
              align-items: center;
              padding: 10px;
              margin: 5px;
              border: 1px solid #ccc;
              border-radius: 4px;
              background-color: [[obtenerBackground(completado)]];
            }
            .tarea-nombre {
              flex-grow: 1;
              text-decoration: [[obtenerDecoracionTexto(completado)]];
            }
            .-checkbox {
              margin-right: 10px;
            }
            .btn-borrar {
              background-color: #ff4444;
              color: white;
              border: none;
              padding: 5px 10px;
              border-radius: 4px;
              cursor: pointer;
            }
            .btn-borrar:hover {
              background-color: #cc0000;
            }
          </style>
          <div class="contenedor-tareas">
            <input type="checkbox" class="tarea-checkbox" checked="{{completado::change}}" disabled="[[completado]]">
            <span class="tarea-nombre">[[tarea.nombre]]</span>
            <button class="btn-borrar" on-click="borrarTarea">Eliminar</button>
          </div>
        `;
      }
      static get properties() {
        return {
          tarea: { type: Object },
          completado: { type: Boolean, value: false }
        };
      }

      borrarTarea() {
        this.dispatchEvent(new CustomEvent('borrar-tarea', { 
          detail: { id: this.tarea.id },
          bubbles: true,
          composed: true
        }));
      }
      obtenerBackground(completado) {
        return completado ? '#e0e0e0' : 'white';
      }

      obtenerDecoracionTexto(completado) {
        return completado ? 'line-through' : 'none';
      }
}
customElements.define("tarea-elemento", Tarea);