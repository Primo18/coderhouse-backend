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
            const { id } = req.params;
            const cart = await cartManagerMongo.getCartById(id);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Añadir un producto al carrito
    async addProductToCart(req, res) {
        try {
            const { cartId, productId, quantity } = req.body;
            const updatedCart = await cartManagerMongo.addProductToCart(cartId, productId, quantity);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Eliminar un producto del carrito
    async removeProductFromCart(req, res) {
        try {
            const { cartId, productId } = req.body;
            const updatedCart = await cartManagerMongo.removeProductFromCart(cartId, productId);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default CartController;
