import { Router } from 'express';
import { renderHomePage, renderRealTimeProducts } from '../controllers/viewHandlers.js';

const viewsRouter = Router();

viewsRouter.get('/', renderHomePage);
viewsRouter.get('/realtimeproducts', renderRealTimeProducts);

export default viewsRouter;
