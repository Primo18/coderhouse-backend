import { Router } from "express";
import CartController from "../controllers/CartController.js";

const cartsRouter = Router();
const cartController = new CartController();

cartsRouter.get("/", cartController.getAllCarts);          // obtener todos los carritos
cartsRouter.get("/:cid", cartController.getCartById);      // obtener un carrito por id
cartsRouter.post("/", cartController.createCart);          // crear un carrito
cartsRouter.put("/:cid", cartController.updateEntireCart); // actualizar un carrito entero
cartsRouter.delete("/:cid", cartController.emptyCart);     // vaciar un carrito

cartsRouter.post("/:cid/products", cartController.addProductToCart);             // agregar un producto a un carrito
cartsRouter.put("/:cid/products/:pid", cartController.updateProductQuantity);    // actualizar la cantidad de un producto específico
cartsRouter.delete("/:cid/products/:pid", cartController.removeProductFromCart); // eliminar un producto específico del carrito


export default cartsRouter;

