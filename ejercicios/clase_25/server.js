// Importa las dependencias necesarias
import express from 'express';
import { program } from 'commander';
import dotenv from 'dotenv';

// Configura commander para procesar los argumentos de la línea de comandos
program.option('--mode <mode>', 'Establece el modo de ejecución (development o production)');
program.parse(process.argv);

const options = program.opts();

// Decide el archivo .env a cargar basado en el argumento --mode
let envPath = '.env'; // Default a un archivo .env general si es necesario
switch (options.mode) {
    case 'development':
        envPath = '.env.development';
        break;
    case 'production':
        envPath = '.env.production';
        break;
    default:
        console.log(`Modo no reconocido: ${options.mode}. Usando configuración por defecto.`);
}

// Carga las variables de entorno desde el archivo correspondiente
dotenv.config({ path: envPath });

// Crea una nueva aplicación Express
const app = express();

// Determina el puerto en base a la variable de entorno
const PORT = process.env.PORT || 3000;

// Define una ruta de prueba
app.get('/', (req, res) => {
    res.send(`Servidor ejecutándose en modo: ${options.mode || 'default'}`);
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT} en modo ${options.mode}`);
});


// node server.js --mode development
// node server.js --mode production
