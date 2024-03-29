import userDao from '../dao/userDao.js';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';

const secretOrKey = 'secret'; // Debería estar en variables de entorno

class UserService {
    async addGithubUser(profile) {
        const { displayName, emails } = profile;
        const email = emails[0].value;
        const userExists = await userDao.getUserByEmail(email);
        if (userExists) {
            return userExists;
        }

        const newUser = {
            first_name: displayName,
            last_name: ' ',
            email,
            age: 18,
            password: ' ',
            role: 'user'
        };
        return userDao.createUser(newUser);
    }

    async registerUser(userData) {
        const { email, password, } = userData;
        const userExists = await userDao.getUserByEmail(email);
        if (userExists) {
            throw new Error('El correo ya está registrado.');
        }
        const hashedPassword = await hashPassword(password);
        const newUser = { ...userData, password: hashedPassword };
        return userDao.createUser(newUser);
    }

    async authenticateUser(email, password) {
        const user = await userDao.getUserByEmail(email);
        if (!user) {
            throw new Error('Usuario no encontrado.');
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta.');
        }

        const payload = { id: user.id, email: user.email, role: user.role };
        const token = jwt.sign(payload, secretOrKey, { expiresIn: '1h' });

        return { user, token };
    }

    async getUserById(userId) {
        return userDao.getUserById(userId);
    }

    async updateUser(userId, updateData) {
        return userDao.updateUser(userId, updateData);
    }

    async deleteUser(userId) {
        return userDao.deleteUser(userId);
    }

    async assignCartToUser(userId, cartId) {
        return userDao.assignCartToUser(userId, cartId);
    }

    async getUserByEmail(email) {
        return userDao.getUserByEmail(email);
    }


}

export default new UserService();
