import { Router } from 'express';
import { renderHomePage, renderRealTimeProducts, renderChat } from '../controllers/viewHandlers.js';

const viewsRouter = Router();

viewsRouter.get('/', renderHomePage);
viewsRouter.get('/realtimeproducts', renderRealTimeProducts);
viewsRouter.get('/chat', renderChat);


export default viewsRouter;

