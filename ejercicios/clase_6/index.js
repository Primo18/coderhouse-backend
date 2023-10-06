import express from 'express';

const app = express();
const port = process.env.PORT || 8080;

// Datos de ejemplo para simular una lista de usuarios
const usuarios = [
    { id: 1, nombre: 'Juan', genero: 'masculino' },
    { id: 2, nombre: 'Maria', genero: 'femenino' },
    { id: 3, nombre: 'Pedro', genero: 'masculino' },
    // Agrega más usuarios si es necesario
];

// Ruta raíz para obtener usuarios
app.get('/', (req, res) => {
    // Verificar si se proporciona un parámetro de consulta "genero"
    const generoFiltrado = req.query.genero;
    if (generoFiltrado) {
        // Filtrar usuarios por género
        const usuariosFiltrados = usuarios.filter(usuario => usuario.genero === generoFiltrado.toLowerCase());
        res.json(usuariosFiltrados);
    } else {
        // Si no se proporciona el parámetro de consulta "genero", devolver todos los usuarios
        res.json(usuarios);
    }
});

// url = http://localhost:8080/?genero=femenino

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
