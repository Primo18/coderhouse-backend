import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';

class CartController {
    constructor() {
        this.path = "./src/models/carts.json";
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8");
        return JSON.parse(carts);
    }

    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart, null, 2));
    }


    exist = async (id) => {
        let carts = await this.readCarts();
        return carts.find(cart => cart.id === id);
    }

    addCart = async (req, res) => {
        try {
            let oldCarts = await this.readCarts();
            let id = nanoid()
            let cartsConcat = [{ id: id, products: [] }, ...oldCarts]
            await this.writeCarts(cartsConcat)
            res.status(201).json("Carrito agregado");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getCarts = async (req, res) => {
        try {
            const carts = await this.readCarts();
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getCartById = async (req, res) => {
        try {
            let cartById = await this.exist(req.params.cid);
            if (cartById) {
                res.status(200).json(cartById.products);
            } else {
                res.status(404).json({ error: 'Cart not found' });
            }

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    addProductToCart = async (req, res) => {
        try {
            let cartById = await this.exist(req.params.cid);
            if (cartById) {
                let product = cartById.products.find(product => product.product === parseInt(req.params.pid));
                if (product) {
                    product.quantity = product.quantity + 1;
                } else {
                    cartById.products.push({ product: parseInt(req.params.pid), quantity: 1 });
                }
                let carts = await this.readCarts();
                let cartIndex = carts.findIndex(cart => cart.id === req.params.cid);
                carts[cartIndex] = cartById;
                await this.writeCarts(carts);
                res.status(201).json("Producto agregado al carrito");

            } else {
                res.status(404).json({ error: 'Cart not found' });
            }

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default CartController;
