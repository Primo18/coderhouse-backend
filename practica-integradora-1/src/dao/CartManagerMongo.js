import Cart from './models/CartSchema.js';

class CartManagerMongo {
    // Crear un nuevo carrito
    async createCart() {
        const newCart = new Cart();
        return await newCart.save();
    }

    // Obtener un carrito por ID
    async getCartById(cartId) {
        return await Cart.findById(cartId).populate('products.product');
    }

    // Añadir un producto al carrito
    async addProductToCart(cartId, productId, quantity) {
        const cart = await this.getCartById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId.toString());

        if (existingProductIndex >= 0) {
            // El producto ya está en el carrito, actualizar la cantidad
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // Añadir nuevo producto al carrito
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        return this.getCartById(cartId);
    }

    // Eliminar un producto del carrito
    async removeProductFromCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId.toString());

        await cart.save();
        return this.getCartById(cartId);
    }


}

export default CartManagerMongo;
