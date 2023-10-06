import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import __dirname from './utils.js';
import viewRoutes from './routes/views.routes.js';

const app = express();
const port = 3000;

// Agregar middleware para analizar el cuerpo de las peticiones
app.use(express.json());  // para peticiones tipo application/json
app.use(express.urlencoded({ extended: true }));  // para peticiones tipo application/x-www-form-urlencoded

// Handlebars configuration
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

const users = [
    {
        "name": "Alice",
        "lastname": "Johnson",
        "age": 28,
        "email": "alice.johnson@example.com",
        "phone_number": "123-456-7890"
    },
    {
        "name": "Bob",
        "lastname": "Smith",
        "age": 35,
        "email": "bob.smith@example.com",
        "phone_number": "098-765-4321"
    },
    {
        "name": "Charlie",
        "lastname": "Brown",
        "age": 22,
        "email": "charlie.brown@example.com",
        "phone_number": "111-222-3333"
    },
    {
        "name": "David",
        "lastname": "Williams",
        "age": 40,
        "email": "david.williams@example.com",
        "phone_number": "444-555-6666"
    },
    {
        "name": "Emily",
        "lastname": "Davis",
        "age": 30,
        "email": "emily.davis@example.com",
        "phone_number": "777-888-9999"
    }
];

// Routes
// app.get('/', (req, res) => {
//     const data = {
//         title: 'Home',
//         name: 'John',
//         lastName: 'Doe',
//         age: 25,
//         isMale: true,
//         hobbies: ['Reading', 'Coding', 'Playing'],
//         address: {
//             street: 'Main St',
//             city: 'Boston',
//             state: 'MA'
//         }
//     };
//     res.render('index', data);
// });

app.use('/', viewRoutes);

// Start server
app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});
