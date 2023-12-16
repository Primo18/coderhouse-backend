import Cart from './models/CartSchema.js';

class CartManagerMongo {

    // Crear un nuevo carrito
    async createCart() {
        const newCart = new Cart();
        return await newCart.save();
    }

    // Obtener todos los carritos
    async getAllCarts() {
        return await Cart.find();
    }

    // Obtener un carrito por ID
    async getCartById(cid) {
        return await Cart.findById(cid).populate('products.product');
    }

    // Añadir un producto al carrito
    async addProductToCart(cid, pid, quantity) {
        const cart = await this.getCartById(cid);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === pid.toString());

        if (existingProductIndex >= 0) {
            // El producto ya está en el carrito, actualizar la cantidad
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // Añadir nuevo producto al carrito
            cart.products.push({ product: pid, quantity });
        }
        await cart.save();
        return this.getCartById(cid);
    }

    // Eliminar un producto del carrito
    async removeProductFromCart(cid, pid) {
        const cart = await this.getCartById(cid);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        cart.products = cart.products.filter(p => p.product.toString() !== pid.toString());
        await cart.save();
        return this.getCartById(cid);
    }

    // Vaciar un carrito
    async emptyCart(cid) {
        const cart = await this.getCartById(cid);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        cart.products = [];
        await cart.save();
        return this.getCartById(cid);
    }

    // Actualizar un carrito entero
    async updateEntireCart(cid, products) {
        const cart = await this.getCartById(cid);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        cart.products = products;
        await cart.save();
        return this.getCartById(cid);
    }

    // Actualizar la cantidad de un producto específico
    async updateProductQuantity(cid, pid, quantity) {
        const cart = await this.getCartById(cid);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === pid.toString());
        if (existingProductIndex >= 0) {
            cart.products[existingProductIndex].quantity = quantity;
        } else {
            throw new Error('Producto no encontrado');
        }
        await cart.save();
        return this.getCartById(cid);
    }
}

export default CartManagerMongo;
