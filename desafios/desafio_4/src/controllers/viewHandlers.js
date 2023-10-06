import ProductController from "./ProductController.js";

const productController = new ProductController();

const renderPage = async (req, res, viewName, title, style) => {
    try {
        const products = await productController.readProducts();
        if (!products) {
            throw new Error('No se pudieron obtener los productos');
        }
        res.render(viewName, {
            title: title,
            style: style,
            products: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error');
    }
};

export const renderHomePage = async (req, res) => {
    await renderPage(req, res, 'home', 'Home', 'home.css');
};

export const renderRealTimeProducts = async (req, res) => {
    await renderPage(req, res, 'realTimeProducts', 'Real Time Products', 'realTimeProducts.css');
};
