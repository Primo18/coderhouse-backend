import { Router } from "express";
import CartController from "../controllers/CartController.js";

const cartsRouter = Router();
const cartController = new CartController();

cartsRouter.get("/", cartController.getCarts);
cartsRouter.get("/:cid", cartController.getCartById);
cartsRouter.post("/:cid/products/:pid", cartController.addProductToCart);
cartsRouter.post("/", cartController.addCart);

export default cartsRouter;
