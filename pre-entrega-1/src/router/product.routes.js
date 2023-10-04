import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productRouter = Router();
const productController = new ProductController();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/", productController.validateProductFields, productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
