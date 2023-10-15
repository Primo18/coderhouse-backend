import Product from './models/ProductSchema.js';

class ProductManagerMongo {
    // Añadir un nuevo producto
    async addProduct(productData) {
        const newProduct = new Product(productData);
        return await newProduct.save();
    }

    // Obtener todos los productos
    async getAllProducts() {
        return await Product.find();
    }

    // Obtener un producto por ID
    async getProductById(productId) {
        return await Product.findById(productId);
    }

    // Actualizar un producto por ID
    async updateProductById(productId, updatedData) {
        return await Product.findByIdAndUpdate(productId, updatedData, { new: true });
    }

    // Eliminar un producto por ID
    async deleteProductById(productId) {
        return await Product.findByIdAndDelete(productId);
    }

    // Obtener productos por categoría
    async getProductsByCategory(category) {
        return await Product.find({ category });
    }

}

export default ProductManagerMongo;
