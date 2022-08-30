// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];




// Event Listeners
eventListeners();

function eventListeners(){
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esté listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    });
}



// Funciones

function agregarTweet(e) {
    e.preventDefault();
    
    // TextArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación

    if(tweet === '') {
        mostrarError('No mame joven no puede ir vacío');

        return;  // Evita que se ejecuten más líneas de código
    }

    const tweetObj = {
        id: Date.now(),
        tweet                // Esto es igual a tweet: tweet pero como son iguales key y value podemos dejar solo 1
    }
        // Añadir al arreglo de tweets
        tweets = [...tweets, tweetObj] 

        // Una vez agregado creamos el html
        crearHTML();

        // Reiniciar el form
        formulario.reset();
}

// Mostrar mensaje de error cuando el campo está vacío
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertando en el HTML
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Eliminando la alerta de error después de 2 segundos
    setTimeout( () => {
        mensajeError.remove();
    }, 2000);
}


// Muestra un listado de los tweet

function crearHTML() {
    limpiarHTML();
    if( tweets.length > 0) {
        tweets.forEach( tweet => {

            // Crear el HTML
            const li = document.createElement('li');

            // Añadir texto
            li.innerText = tweet.tweet;

            // insertarlo en el htl
            listaTweets.appendChild(li);
        } );
    }

    sincronizarStorage();
}

// Agrega los tweets actuales al local storage

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


// Limpiar el HTML

function limpiarHTML(){
    while( listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
