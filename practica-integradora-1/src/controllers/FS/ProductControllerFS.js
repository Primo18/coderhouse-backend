import fs from 'fs/promises';
import { nanoid } from 'nanoid';

class ProductController {
    constructor() {
        this.path = "./src/dao/models/products.json";
    }

    readProducts = async () => {
        try {
            const products = await fs.readFile(this.path, "utf-8");
            return JSON.parse(products);
        } catch (error) {
            console.error(error);
            throw new Error('Error al leer los productos');
        }
    }

    writeProducts = async (products) => {
        try {
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.error(error);
            throw new Error('Error al escribir los productos');
        }
    }

    validateProductFields = (req, res, next) => {
        const { name, description, code, price, stock, category } = req.body;
        if (!name || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        next();
    }

    getAllProducts = async (req, res) => {
        const limit = req.query.limit;
        const products = await this.readProducts();
        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    }

    getProductById = async (req, res) => {
        const id = req.params.id;
        const products = await this.readProducts();
        const product = products.find(product => product.id === id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    }

    createProduct = async (req, res) => {
        const { name, description, code, price, stock, category, thumbnails } = req.body;
        const products = await this.readProducts();
        const newProduct = {
            id: nanoid(),
            name,
            description,
            code,
            price,
            stock,
            category,
            status: true,
            thumbnails: ["/img/ajo.jpg"]
        };
        products.push(newProduct);
        await this.writeProducts(products);
        // Emitir un evento para todos los clientes de WebSockets.
        req.io.emit('newProduct', newProduct);
        res.redirect('/realtimeproducts');
    }

    updateProduct = async (req, res) => {
        const id = req.params.id;
        const { name, description, code, price, stock, category } = req.body;
        const products = await this.readProducts();
        const index = products.findIndex(product => product.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Copia todas las propiedades existentes del producto
        const existingProduct = products[index];

        // Actualiza solo las propiedades que vienen en el cuerpo de la solicitud
        products[index] = {
            ...existingProduct,
            ...(name && { name }),
            ...(description && { description }),
            ...(code && { code }),
            ...(price && { price }),
            ...(stock && { stock }),
            ...(category && { category })
        };

        await this.writeProducts(products);
        res.json(products[index]);
    };


    deleteProduct = async (req, res) => {
        const id = req.params.id;
        const products = await this.readProducts();
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }
        products.splice(index, 1);
        await this.writeProducts(products);
        res.status(204).end();
    }

    deleteProductSocket = async (productId) => {
        const products = await this.readProducts();
        const index = products.findIndex(product => product.id === productId);
        if (index === -1) {
            return false;
        }
        products.splice(index, 1);
        await this.writeProducts(products);
        return true;
    }
}

export default ProductController;
