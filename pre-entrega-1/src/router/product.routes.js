import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const ProductRouter = Router();
const productManager = new ProductManager();

const validateProductFields = (req, res, next) => {
    const { name, description, code, price, stock, category } = req.body;

    if (!name || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Debe proporcionar todos los campos: name, description, code, price, stock, category, thumbnail (opcional).' });
    }

    next();
};

ProductRouter.get("/", async (req, res) => {
    res.send(await productManager.getProducts());
});

ProductRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    res.send(await productManager.getProductsById(id));
});

ProductRouter.post("/", validateProductFields, async (req, res) => {
    const newProduct = req.body;
    res.send(await productManager.addProducts(newProduct));
});

ProductRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateProducts = req.body;
    res.send(await productManager.updateProducts(id, updateProducts));
});

ProductRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.send(await productManager.deleteProducts(id));
});

export default ProductRouter;
