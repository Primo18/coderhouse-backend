import { Router } from 'express';
import { renderHomePage } from './viewHandlers.js';

const viewsRouter = Router();

viewsRouter.get('/', renderHomePage);

export default viewsRouter;
