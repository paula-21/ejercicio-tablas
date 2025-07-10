class Paginacion extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: "open" });
        this.paginaActual = 1;
        this.totalPaginas = 1;
    }

    set paginacion({ paginaActual, totalPaginas }) {
        this.paginaActual = paginaActual;
        this.totalPaginas = totalPaginas;
        this.renderizar();
    }
    
    renderizar() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
            }
            .bonotes-paginacion{
                margin-top: 1em;
                display: flex;
            }
            button {
                padding: 8px 16px;
                background: #4dabf7;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            button:disabled {
                background: #ccc;
                cursor: not-allowed;
            }
            .page-info {
                display: flex;
                align-items: center;
                padding: 0 10px;
            }
        </style>
        <div class="bonotes-paginacion">
            <button id="prev-btn" ?disabled="${this.paginaActual === 1}">Anterior</button>
            <div class="page-info">Página ${this.paginaActual} de ${this.totalPaginas}</div>
            <button id="next-btn" ?disabled="${this.paginaActual === this.totalPaginas}">Siguiente</button>
        </div>
        `;

        this.shadowRoot.getElementById('prev-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('page-change', {
                detail: { page: this.paginaActual - 1 }
            }));
        });
        this.shadowRoot.getElementById('next-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('page-change', {
                detail: { page: this.paginaActual + 1 }
            }));
        });
    }
}
customElements.define("paginacion-control", Paginacion);