import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productsRouter = Router();
const productController = new ProductController();

productsRouter.get("/", productController.getAllProducts);
productsRouter.get("/:id", productController.getProductById);
productsRouter.post("/", productController.createProduct);
productsRouter.put("/:id", productController.updateProduct);
productsRouter.delete("/:id", productController.deleteProduct);

export default productsRouter;
