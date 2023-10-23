import Product from './models/ProductSchema.js';

class ProductManagerMongo {
    // Añadir un nuevo producto
    async addProduct(productData) {
        const newProduct = new Product(productData);
        return await newProduct.save();
    }

    // Obtener todos los productos con paginación, filtrado y ordenamiento
    async getAllProducts(queryParams) {
        let { limit, page, query, sort } = queryParams;

        limit = parseInt(limit) || 10;
        page = parseInt(page) || 1;

        // Configuración de la consulta y opciones de paginación
        let filter = {};
        let options = {
            limit: limit,
            page: page,
            sort: { price: sort === "desc" ? -1 : 1 }
        };

        if (query) {
            // Suponiendo que el query puede ser 'category' o 'status'
            if (query === "available") {
                filter.status = true;
            } else {
                filter.category = query;
            }
        }

        return await Product.paginate(filter, options);
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
