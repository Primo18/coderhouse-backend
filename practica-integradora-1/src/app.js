import express from 'express';
import __dirname from './utils.js';
import ProductController from './controllers/ProductController.js';
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import path from "path";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8080;
const uri = "mongodb+srv://primo:Rust.1830@devcluster.9xzyesc.mongodb.net/ecommerce?retryWrites=true&w=majority";

const productController = new ProductController();

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
        }
    )
);

// Conexión asíncrona a MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected...");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

connectDB();

// Server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Socket.io
const io = new Server(server);

// Middleware para adjuntar io a req
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/', viewsRouter);

io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    socket.on("deleteProduct", async (productId) => {
        console.log("Delete product with ID:", productId);
        const deleted = await productController.deleteProductSocket(productId);
        if (deleted) {
            io.sockets.emit("productDeleted", productId);
        }
    });

    socket.on("newProduct", (product) => {
        console.log("New product:", product);
        io.sockets.emit("productAdded", product);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
