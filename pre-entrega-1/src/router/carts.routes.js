import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const CartRouter = Router();
const cartManager = new CartManager();

CartRouter.route('/')
    .post(async (req, res) => {
        try {
            const newCart = await cartManager.addCarts();
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    .get(async (req, res) => {
        try {
            const carts = await cartManager.readCarts();
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

CartRouter.route('/:cid')
    .get(async (req, res) => {
        try {
            const cart = await cartManager.getCartsById(req.params.cid);
            if (cart) {
                res.status(200).json(cart);
            } else {
                res.status(404).json({ error: 'Cart not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

CartRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartManager.addProductToCart(cid, pid);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default CartRouter;
