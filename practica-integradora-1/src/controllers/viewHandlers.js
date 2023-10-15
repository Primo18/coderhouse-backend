import ProductManagerMongo from '../dao/ProductManagerMongo.js';

const productManagerMongo = new ProductManagerMongo();

const renderPage = async (req, res, viewName, title, style) => {
    try {
        const products = await productManagerMongo.getAllProducts();
        const plainProducts = products.map(product => product.toObject());

        if (!products) {
            throw new Error('No se pudieron obtener los productos');
        }
        res.render(viewName, { products: plainProducts, title, style });

    } catch (error) {
        console.error('Error:', error);  // Imprime el error para depuración
        res.status(500).json({ error: error.message });
    }
};

export const renderHomePage = async (req, res) => {
    await renderPage(req, res, 'home', 'Home', 'home.css');
};

export const renderRealTimeProducts = async (req, res) => {
    await renderPage(req, res, 'realTimeProducts', 'Real Time Products', 'realTimeProducts.css');
};
