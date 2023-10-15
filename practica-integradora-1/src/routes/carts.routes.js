import { Router } from "express";
import CartController from "../controllers/CartController.js";

const cartsRouter = Router();
const cartController = new CartController();

cartsRouter.get("/", cartController.getAllCarts);
cartsRouter.get("/:id", cartController.getCartById);
cartsRouter.post("/", cartController.createCart);
cartsRouter.post("/add", cartController.addProductToCart);
cartsRouter.post("/remove", cartController.removeProductFromCart);

export default cartsRouter;

