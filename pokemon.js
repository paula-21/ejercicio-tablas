class Pokemon extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"})
    }

    cargar(pokemonData){
        this.pokemon = pokemonData
        this.renderizar();
    }

    renderizar(){
        this.shadowRoot.innerHTML = `
            <style>
                .pokemon-item {
                    background-color: #e1f5fe;
                    border: 2px solid #81d4fa;
                    border-radius: 12px;
                    padding: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .pokemon-item:hover {
                    background-color:rgb(162, 226, 255);
                    transform: scale(1.03);
                    cursor: pointer;
                }
                .circle {
                background-color: #fe518e;
                border-radius: 50%;
                }
    
                .circle img {
                    width: 80px;
                }
                .pokemon-info {
                flex: 1;
                }
            </style>
            <div class="pokemon-item">
                <div class="circle">
                    <img src="${this.pokemon.foto}" alt="">
                </div>
                <div class="pokemon-info">
                    <p>
                        <em>
                            <strong>Nombre:</strong>
                            ${this.pokemon.nombre}
                        </em>
                    </p>
                </div>
            </div>
        `;

        this.addEventListener("click", (e) => {
          this.dispatchEvent(new CustomEvent('pokemon-seleccionado', {
                bubbles: true,
                composed: true,
                detail: { pokemonId: this.pokemon.id }
            }));
        });
    }

    get esFavorito() {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        return favoritos.includes(this.pokemon.id);
    }
}   

customElements.define("pokemon-elemento", Pokemon);

