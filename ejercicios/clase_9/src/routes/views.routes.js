import { Router } from 'express';

const router = Router();

const food = [
    {
        name: 'Pizza',
        price: 12.99
    },
    {
        name: 'Hamburger',
        price: 8.99
    },
    {
        name: 'Hot Dog',
        price: 4.99
    },
    {
        name: 'French Fries',
        price: 2.99
    },
    {
        name: 'Onion Rings',
        price: 3.99
    }
];

const users = [];

router.get('/', (req, res) => {
    const testUser = {
        name: 'John',
        lastname: 'Doe',
        role: 'admin'
    }
    res.render('index', {
        user: testUser,
        style: 'index.css',
        isAdmin: testUser.role === 'admin',
        food
    });
});

// Ruta GET para mostrar el formulario de registro en views/register.handlebars y css/register.css
router.get('/register', (req, res) => {
    res.render('register', { style: 'register.css' });
});

// Ruta POST para recibir los datos del formulario de registro
router.post('/user', (req, res) => {
    const { name, email, password } = req.body;
    const newUser = {
        name,
        email,
        password
    };
    users.push(newUser);
    // Confirmar que el usuario se ha guardado exitosamente
    console.log('Usuario registrado:', { name, email, password });

    // Redireccionar o responder con un mensaje de éxito
    //  res.redirect('/success'); // Puedes crear una vista "success.handlebars" si lo deseas

    // Redireccionar al usuario a la página de inicio
    res.redirect('/');
});

export default router;