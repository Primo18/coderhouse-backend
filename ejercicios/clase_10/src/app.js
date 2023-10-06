import express from "express";
import __dirname from "./utils.js";
import path from "path";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import MensajeController from "./controllers/mensajeController.js";

const app = express();
const PORT = 8080;

// Instancio el controlador de mensajes
const mensajeController = new MensajeController();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Template engine - Handlebars
app.set("view engine", "hbs");
app.set("views", "./src/views");
app.engine(
    "hbs",
    handlebars.engine(
        {
            extname: ".hbs",
            defaultLayout: "main.hbs",
            layoutsDir: path.join(__dirname, "views/layouts"),
            partialsDir: path.join(__dirname, "views/partials"),
        }
    )
);

// Routes
app.use("/", viewsRouter);

// Server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Socket.io
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    // Escuchar el evento 'mensaje' y devolverlo a todos los clientes
    socket.on("mensaje", (data) => {
        console.log(data);
        io.sockets.emit("mensaje", data);
    });

    // Escuchar el evento 'evento_para_socket_individual' y devolverlo al cliente que lo envió
    socket.on("evento_para_socket_individual", (data) => {
        console.log(data);
        socket.emit("evento_para_socket_individual", data);
    });

    // Escuchar el evento 'evento_para_todos_menos_el_socket_actual' y devolverlo a todos los clientes menos al que lo envió
    socket.on("evento_para_todos_menos_el_socket_actual", (data) => {
        console.log(data);
        socket.broadcast.emit("evento_para_todos_menos_el_socket_actual", data);
    });

    // Escuchar el evento 'evento_para_todos' y devolverlo a todos los clientes
    socket.on("evento_para_todos", (data) => {
        console.log(data);
        // Guardar el mensaje en el archivo mensajes.json
        mensajeController.guardar({ mensaje: data });
        io.sockets.emit("evento_para_todos", data);



    });
});


