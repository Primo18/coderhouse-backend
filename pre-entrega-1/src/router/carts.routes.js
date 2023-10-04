import { Router } from "express";
import CartController from "../controllers/CartController.js";

const cartRouter = Router();
const cartController = new CartController();

cartRouter.get("/", cartController.getCarts);
cartRouter.get("/:cid", cartController.getCartById);
cartRouter.post("/:cid/products/:pid", cartController.addProductToCart);
cartRouter.post("/", cartController.addCart);

export default cartRouter;
