const fs = require("node:fs");

class ProductManager {
    constructor() {
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync("products.json", "utf8");
            this.products = JSON.parse(data);
        } catch {
            throw new Error("Could not load products");
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync("products.json", JSON.stringify(this.products, null, 2));
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

    // Update product by id, id is not updatable. null values are not updated
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

// Create a new instance of the ProductManager class
const productManager = new ProductManager();

// Get all products
const products = productManager.getProducts();
console.log(products);

// Add a new product
productManager.addProduct("Product 1", "Description 1", 100, "Thumbnail 1", "Code 1", 10);
productManager.addProduct("Product 2", "Description 2", 200, "Thumbnail 2", "Code 2", 20);
productManager.addProduct("Product 3", "Description 3", 300, "Thumbnail 3", "Code 3", 30);

// Get product by id
const product = productManager.getProductById(1);
console.log(product);

// Update product by id
productManager.updateProduct(2, "Product 2 updated", null, null, null, null, null);

// Delete product by id
productManager.deleteProduct(3);

