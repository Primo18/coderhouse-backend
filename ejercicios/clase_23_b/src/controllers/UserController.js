import UserService from '../services/UserService.js';

class UserController {
    async createUser(req, res) {
        try {
            const newUser = await UserService.createUser(req.body);
            res.success(newUser);
        } catch (error) {
            res.error(error.message, 500);
        }
    }

    // Otros métodos que utilizan UserService para realizar operaciones con usuarios
}

export default new UserController();
