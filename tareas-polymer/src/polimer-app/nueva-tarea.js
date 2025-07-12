import { html, PolymerElement } from "@polymer/polymer";

class NuevaTarea extends PolymerElement{
    static get template(){
        return html`
            <style>
            .nueva-tarea-formulario {
                text-align: center;
                padding: 15px;
                margin: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            .tarea-input {
                padding: 8px;
                width: 200px;
                margin-right: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            .btn-agregar {
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
            }
            .btn-agregar:hover {
                background-color: #45a049;
            }
          </style>
            <div class="nueva-tarea-formulario">
                <input type="text" class="tarea-input" value="{{nuevaTarea::input}}" placeholder="ingresa aqui la tarea">
                <button class="btn-agregar" on-click="agregarTarea">Agregar</button>
            </div>

        `;

    }
    static get properties() {
        return {
          nuevaTarea: { type: String, value: '' }
        };
      }

      agregarTarea() {
        console.log(this.nuevaTarea);
        if (this.nuevaTarea.trim()) {
          this.dispatchEvent(new CustomEvent('agregar-tarea', { 
            detail: { nombre: this.nuevaTarea },
            bubbles: true,
            composed: true
          }));
          this.nuevaTarea = '';
        }
      }
}   
customElements.define("nueva-tarea", NuevaTarea);