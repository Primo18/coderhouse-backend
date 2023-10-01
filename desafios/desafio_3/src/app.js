import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = process.env.PORT || 8080;

// Crear una instancia de ProductManager
const productManager = new ProductManager();

// Ruta para obtener productos
app.get('/products', async (req, res) => {
    const { limit } = req.query;

    try {
        // Obtener todos los productos o limitar el número de resultados
        const products = await productManager.getProducts();
        const limitedProducts = limit ? products.slice(0, limit) : products;

        res.json({ products: limitedProducts });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});


// Ruta para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        // Obtener todos los productos
        const products = await productManager.getProducts();
        // Encontrar el producto por su ID
        const product = products.find(p => p.id === parseInt(pid));

        if (!product) {
            res.status(404).json({ message: 'Producto no encontrado' });
        } else {
            res.json({ product });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al obtener producto por ID' });
    }
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
