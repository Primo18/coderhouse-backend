import { readFileSync, writeFileSync } from "node:fs";

class ProductManager {
    constructor() {
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = readFileSync("src/products.json", "utf8");
            this.products = JSON.parse(data);
        } catch {
            throw new Error("Could not load products");
        }
    }

    saveProducts() {
        try {
            writeFileSync("src/products.json", JSON.stringify(this.products, null, 2));
        } catch {
            throw new Error("Could not save products");
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const id = this.products.length + 1;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("All fields are required");
            return;
        }

        if (this.products.find(p => p.code === code)) {
            console.log("Code already exists");
            return;
        }

        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        this.saveProducts();
        console.log("Product created");
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.log(`Product with id ${id} not found to get`);
            return;
        }
        return product;
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            console.log(`Product with ID ${id} not found`);
            return;
        }
        this.products.splice(productIndex, 1);
        this.saveProducts();
        console.log(`Product with ID ${id} deleted`);
    }

    updateProduct(id, title, description, price, thumbnail, code, stock) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            console.log(`Product with ID ${id} not found`);
            return;
        }
        const product = this.products[productIndex];
        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.thumbnail = thumbnail || product.thumbnail;
        product.code = code || product.code;
        product.stock = stock || product.stock;

        this.saveProducts();
        console.log(`Product with ID ${id} updated`);
    }
}

export default ProductManager;
