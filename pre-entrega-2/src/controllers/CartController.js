import CartManagerMongo from '../dao/CartManagerMongo.js';

const cartManagerMongo = new CartManagerMongo();

class CartController {
    // Crear un nuevo carrito
    async createCart(req, res) {
        try {
            const newCart = await cartManagerMongo.createCart();
            res.json(newCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener todos los carritos
    async getAllCarts(req, res) {
        try {
            const carts = await cartManagerMongo.getAllCarts();
            res.json(carts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener un carrito por ID 
    async getCartById(req, res) {
        try {
            const { cid } = req.params;
            const cart = await cartManagerMongo.getCartById(cid);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Añadir un producto al carrito
    async addProductToCart(req, res) {
        try {
            const { cid } = req.params;
            const { pid, quantity } = req.body;
            const updatedCart = await cartManagerMongo.addProductToCart(cid, pid, quantity);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar un producto del carrito
    async removeProductFromCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const updatedCart = await cartManagerMongo.removeProductFromCart(cid, pid);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Vaciar un carrito
    async emptyCart(req, res) {
        try {
            const { cid } = req.params;
            const updatedCart = await cartManagerMongo.emptyCart(cid);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar un carrito entero
    async updateEntireCart(req, res) {
        try {
            const { cid } = req.params;
            const { products } = req.body;
            const updatedCart = await cartManagerMongo.updateEntireCart(cid, products);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Actualizar la cantidad de un producto específico
    async updateProductQuantity(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const updatedCart = await cartManagerMongo.updateProductQuantity(cid, pid, quantity);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default CartController;
