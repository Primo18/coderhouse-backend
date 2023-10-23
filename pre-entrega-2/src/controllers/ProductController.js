import ProductManagerMongo from '../dao/ProductManagerMongo.js';

const productManagerMongo = new ProductManagerMongo();

class ProductController {
    // Obtener todos los productos
    async getAllProducts(req, res) {
        try {
            const result = await productManagerMongo.getAllProducts(req.query);

            // Formatea la respuesta
            const response = {
                status: "success",
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `http://localhost:8080/?page=${result.prevPage}` : '',
                nextLink: result.hasNextPage ? `http://localhost:8080/?page=${result.nextPage}` : '',
            };

            res.json(response);
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }


    // Obtener un producto por ID
    async getProductById(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            const product = await productManagerMongo.getProductById(id);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Añadir un nuevo producto
    async addProduct(req, res) {
        try {
            const newProduct = await productManagerMongo.addProduct(req.body);
            // Emitir un evento para todos los clientes de WebSockets.
            req.io.emit('newProduct', newProduct);
            res.json(newProduct);
            // res.redirect('/realtimeproducts');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar un producto por ID
    async updateProductById(req, res) {
        try {
            const { id } = req.params;
            const updatedProduct = await productManagerMongo.updateProductById(id, req.body);
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar un producto por ID
    async deleteProductById(req, res) {
        try {
            const { id } = req.params;
            const deletedProduct = await productManagerMongo.deleteProductById(id);
            res.json(deletedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    deleteProductSocket = async (productId) => {
        try {
            const deletedProduct = await productManagerMongo.deleteProductById(productId);
            console.log("Product deleted:", deletedProduct);
        } catch (error) {
            console.error(error);
        }
    }

}

export default ProductController;
