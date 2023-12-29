import express from 'express';
import __dirname from './utils.js';
import path from "path";
import handlebars from "express-handlebars";
import db from "./config/db.js";
import { initializeSocket } from './socket.js';
import { setUpMiddleware, setUpRoutes } from './startup.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
db.then(() => console.log("Connected to MongoDB")).catch((err) =>
    console.log(err)
);

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
        }
    )
);

// Configurar el servidor y Socket.io
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const io = initializeSocket(server);

// Configuraciones de middleware y rutas
setUpMiddleware(app, io);
setUpRoutes(app);


