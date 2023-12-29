import ProductManagerMongo from '../dao/ProductManagerMongo.js';
import CartManagerMongo from '../dao/CartManagerMongo.js';

const productManagerMongo = new ProductManagerMongo();
const cartManagerMongo = new CartManagerMongo();

const renderPage = async (req, res, viewName, title, style) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;  // Tomar opciones desde la solicitud
        const { first_name, last_name, email, age, role } = req.session.user;
        const products = await productManagerMongo.getAllProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query
        });

        if (!products) {
            throw new Error('No se pudieron obtener los productos');
        }
        // Adapta la respuesta según la estructura de paginate
        res.render(viewName, {
            products: products.docs.map(product => product.toObject()),
            pagination: {  // Información de paginación
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.prevLink,
                nextLink: products.nextLink
            },
            title,
            style, first_name, last_name, email, age, role
        });

    } catch (error) {
        console.error('Error:', error);  // Imprime el error para depuración
        res.status(500).json({ error: error.message });
    }
};

export const renderHomePage = async (req, res) => {
    await renderPage(req, res, 'products', 'products', 'products.css');
};

export const renderRealTimeProducts = async (req, res) => {
    await renderPage(req, res, 'realTimeProducts', 'Real Time Products', 'realTimeProducts.css');
};

export const renderChat = async (req, res) => {
    await renderPage(req, res, 'chat', 'Chat', 'chat.css');
};

export const renderCartPage = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManagerMongo.getCartById(cid);
        if (!cart) {
            throw new Error('No se pudo obtener el carrito');
        }
        console.log('Cart:', cart);
        res.render('cart', { cart: cart.toObject(), title: 'Cart', style: 'cart.css' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};