import { Foto } from "./foto.js";

fetch("https://picsum.photos/v2/list")
    .then(response => response.json())
    .then(response => {
        console.log(response);
        for(const obj of response) {
            var foto = new Foto(obj.author, obj.download_url);
            var elementoTitulo = document.createElement("h5");
            elementoTitulo.innerText = foto.title;

            var elementoImagen = document.createElement("img");
            elementoImagen.src = foto.url;
            elementoImagen.width = 200;
            
            var contenedorDePosts = document.getElementById("posts-container");
            
            contenedorDePosts.appendChild(elementoTitulo);
            contenedorDePosts.appendChild(elementoImagen);
        }
    });