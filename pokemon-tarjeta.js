class PokemonTarjeta extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.tarjetaVacia();
    }
    
  tarjetaVacia() {
    this.shadowRoot.innerHTML = `
        <style>
            .details {
                background-color: #f3f983;
                border: 2px solid #0e0e0e;
                border-radius: 12px;
                padding: 1rem;
            }
            .details h2 {
                text-align: center;
                margin-bottom: 1rem;
            }
            .favorito{
                cursor: pointer;
            }
            .imagenes{
                text-align: center
            }

            th,td {
                text-align: left;
                width: 100px;
            }
            .stats {
                background-color: #fe518e;
                border-radius: 10px;
                padding: 1rem;
                font-weight: bold;
            }
        </style>
        <em>
            <h2>Selecciona un pokemon... 🐦‍🔥</h2>
        </em>
    `;
    }

    cargar(pokemonData){
        this.pokemon = pokemonData
        this.renderizar();
    }

    renderizar(){
        this.tarjetaVacia();
        const { 
            name, 
            sprites, 
            base_experience, 
            height, 
            stats, 
            types 
        } = this.pokemon;

        const imagenesHTML = `
            <div class="imagenes">
                <img src="${sprites.front_default}" alt="Front Default">
                <img src="${sprites.back_default}" alt="Back Default">
                <img src="${sprites.front_shiny}" alt="Front Shiny">
            </div>
            `;
        const statsHTML = stats.filter(p => p.stat.name == "attack" || p.stat.name == "defense" || p.stat.name == "speed" || p.stat.name == "hp")
            .map(stat => `
            <tr>
                <td>${stat.stat.name.replace("attack", "Ataque").replace("defense", "Defensa").replace("speed", "Velocidad").replace("hp", "Salud")}</td>
                <td>${stat.base_stat}</td>
            </tr>
            `).join('');

        const tipoHTML = types.map(t => t.type.name).join(', ');
        this.shadowRoot.innerHTML +=  `
            <section class="details">
                <span class="favorito">${this.esFavorito ? '❤️' : '♡'}</span>
                <em>
                    <h2>${name} 🐦‍🔥</h2>
                </em>
                ${imagenesHTML}
                <div class="stats">
                    <em>
                        <strong>
                            <p>Estadísticas del Pokémon 📊📈</p>
                        </strong>
                    </em>
                    <table>
                        <tr>
                            <th>Experiencia</th>
                            <td>${base_experience}</td>
                        </tr>
                        <tr>
                            <th>Altura</th>
                            <td>${height / 10} m</td>
                        </tr>
                        <tr>
                            <th>Tipo</th>
                            <td>${tipoHTML}</td>
                        </tr>
                    </table>
                    <table>
                        ${statsHTML}
                    </table>
                </div>
            </section>   
        `;
        this.shadowRoot.querySelector('.favorito').addEventListener('click', () => {
            this.toggleFavorito();
        });
    }

    get esFavorito() {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        return favoritos.includes(this.pokemon.id);
    }

    toggleFavorito() {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        const index = favoritos.indexOf(this.pokemon.id);
        
        if (index > -1) {
            favoritos.splice(index, 1);
        } else {
            favoritos.push(this.pokemon.id);
        }
        
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        this.renderizar();

        document.dispatchEvent(new CustomEvent('favoritos-actualizados'));
    }
}

customElements.define("pokemon-tarjeta", PokemonTarjeta);