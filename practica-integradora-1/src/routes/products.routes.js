import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productsRouter = Router();
const productController = new ProductController();

productsRouter.get("/", productController.getAllProducts);
productsRouter.get("/:id", productController.getProductById);
productsRouter.post("/", productController.addProduct);
productsRouter.put("/:id", productController.updateProductById);
productsRouter.delete("/:id", productController.deleteProductById);

export default productsRouter;
