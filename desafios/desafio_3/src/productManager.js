import { readFile, writeFile } from 'fs/promises';

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
    }

    async loadProducts() {
        try {
            const data = await readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            throw new Error('Could not load products');
        }
    }

    async saveProducts() {
        try {
            await writeFile(this.filePath, JSON.stringify(this.products, null, 2));
        } catch (error) {
            throw new Error('Could not save products');
        }
    }


    async addProduct(title, description, price, thumbnail, code, stock) {
        const id = this.products.length + 1;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('All fields are required');
            return;
        }

        if (this.products.find(p => p.code === code)) {
            console.log('Code already exists');
            return;
        }

        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(product);
        await this.saveProducts();
        console.log('Product created');
    }

    async getProducts() {
        if (this.products.length === 0) {
            await this.loadProducts();
        }
        return this.products;
    }

    async getProductById(id) {
        if (this.products.length === 0) {
            await this.loadProducts();
        }
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.log(`Product with id ${id} not found to get`);
            return;
        }
        return product;
    }

    async deleteProduct(id) {
        if (this.products.length === 0) {
            await this.loadProducts();
        }
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            console.log(`Product with ID ${id} not found`);
            return;
        }
        this.products.splice(productIndex, 1);
        await this.saveProducts();
        console.log(`Product with ID ${id} deleted`);
    }

    async updateProduct(id, title, description, price, thumbnail, code, stock) {
        if (this.products.length === 0) {
            await this.loadProducts();
        }
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

        await this.saveProducts();
        console.log(`Product with ID ${id} updated`);
    }
}

export default ProductManager;
