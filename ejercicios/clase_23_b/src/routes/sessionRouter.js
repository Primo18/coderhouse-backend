import CustomRouter from './customRouter.js';
import SessionController from '../controllers/SessionController.js';

export default class SessionRouter extends CustomRouter {
    init() {
        this.post('/login', ['PUBLIC'], SessionController.login);
    }
}
