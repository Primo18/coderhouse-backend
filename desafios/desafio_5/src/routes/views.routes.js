import { Router } from 'express';
import { renderHomePage, renderRealTimeProducts, renderChat, renderCartPage } from '../controllers/viewHandlers.js';

const viewsRouter = Router();

viewsRouter.get('/', renderHomePage);
viewsRouter.get('/realtimeproducts', renderRealTimeProducts);
viewsRouter.get('/chat', renderChat);
viewsRouter.get('/products', renderHomePage);
viewsRouter.get('/carts/:cid', renderCartPage);

export default viewsRouter;

