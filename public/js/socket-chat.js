var socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {

    window.location = 'index.html';
    throw new Error('El nombre y la sala es necesario');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {

    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados: ');
        console.log(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');
});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('admin:', mensaje);
});

// Escuchar información
socket.on('listaPersonas', function(mensaje) {

    console.log('Personas:', mensaje);
});

// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

socket.on('mensajePrivado', (mensaje) => {

    console.log(mensaje);
});