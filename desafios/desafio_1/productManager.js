class ProductManager {
    constructor() {
        this.products = [];
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
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.log("Not found");
            return;
        }
        return product;
    }
}

// Create a new instance of the ProductManager class
const productManager = new ProductManager();

// Get all products => []
const products = productManager.getProducts();
console.log("Products", products);

// add product => {id: 1, title: "producto prueba", ...}
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

// get product by id => {id: 1, title: "producto prueba", ...}
const product = productManager.getProductById(1);
console.log("Product", product);

// add product with same code => "Code already exists"
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

// add product with missing fields => "All fields are required"
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123");

