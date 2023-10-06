import express from 'express';
import ProductController from './controllers/ProductController.js';
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import __dirname from "./utils.js";
import path from "path";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.routes.js";
import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 8080;

// Controllers
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
        try {
            const deletedProduct = await productController.deleteProductSocket(productId);
            if (!deletedProduct) {
                throw new Error("No se pudo eliminar el producto");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

});
