import express from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Datos de ejemplo para simular una base de datos de usuarios
const users = [
    { id: 1, name: 'Usuario 1' },
    { id: 2, name: 'Usuario 2' },
    { id: 3, name: 'Usuario 3' },
];

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
    res.json(users);
});

// Ruta para obtener un usuario por ID
app.get('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = users.find(user => user.id === userId);
    if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' })
    } else {
        res.json(user);
    }
});

app.get('/ejemploQueries', (req, res) => {
    const query = req.query;
    const { nombre, apellido } = req.query;
    console.log(query);
    console.log(nombre);
    console.log(apellido);
    res.json(query);
});

// url = http://localhost:8080/ejemploQueries?nombre=Juan&apellido=Perez

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
