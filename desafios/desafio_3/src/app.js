import express from "express";
import ProductManager from "./productManager.js";

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola mundo! 🌍");
});

const productManager = new ProductManager();

app.get("/products", async (req, res) => {
    try {
        const { limit } = req.query;
        const allProducts = await productManager.getProducts();

        if (!limit) {
            return res.send({ success: true, data: allProducts });
        }

        const limitNumber = parseInt(limit, 10);
        if (isNaN(limitNumber) || limitNumber < 1) {
            return res.status(400).send({ success: false, error: "Invalid limit parameter" });
        }

        const productLimit = allProducts.slice(0, limitNumber);
        res.send({ success: true, data: productLimit });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const idNumber = parseInt(id, 10);

        if (isNaN(idNumber) || idNumber < 1) {
            return res.status(400).send({ success: false, error: "Invalid ID parameter" });
        }

        const product = await productManager.getProductById(idNumber);
        if (!product) {
            return res.status(404).send({ success: false, error: "Product not found" });
        }

        res.send({ success: true, data: product });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
