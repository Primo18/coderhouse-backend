import express from "express";
const PORT = 8080;
//Genero una instancia de express en app
const app = express();
import ProductManager from "./productManager.js";

app.get("/", (req, res) => {
    res.send("Bienvenidos a Diarco online");
});

// app.use(express.urlencoded({ extended: true }));

const productos = new ProductManager();
const readProducts = productos.readproducts();

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await readProducts);
    let allProducts = await readProducts;
    let productLimit = allProducts.slice(0, limit);
    res.send(productLimit);
});

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find((product) => product.id === id);
    res.send(productById);
});

const server = app.listen(PORT, () => {
    console.log("Express por Local Host + server.adress().port");
});
server.on("error", (error) => {
    console.log(`Error del servidor %{error}`);
});