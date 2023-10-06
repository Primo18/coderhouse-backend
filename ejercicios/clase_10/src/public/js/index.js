const socket = io();

socket.emit("mensaje", "Hola mundo desde el cliente");

socket.on("evento_para_socket_individual", (data) => {
    console.log(data);
});

socket.on("evento_para_todos_menos_el_socket_actual", (data) => {
    console.log(data);
});

socket.on("evento_para_todos", (data) => {
    console.log(data);
});

// Enviar mensaje del formulario al servidor
function enviarMensaje() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // Aquí puedes enviar el mensaje usando Socket.io o cualquier otra lógica que necesites
    console.log("Mensaje enviado:", message);
    // Enviamos el mensaje al servidor
    socket.emit("evento_para_todos", message);

    // Limpiar el campo de entrada
    messageInput.value = "";

    // Prevenir el comportamiento predeterminado del formulario
    return false;
}

