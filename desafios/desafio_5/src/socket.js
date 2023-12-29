import { Server } from "socket.io";
import ProductController from './controllers/ProductController.js';

const productController = new ProductController();
let io = null;

export function initializeSocket(server) {
    io = new Server(server);
    // Configuración de eventos de Socket.io
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

    return io;
}

export const getIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}
