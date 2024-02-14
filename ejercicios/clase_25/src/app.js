// Importar la función dinámica de importación para dotenv
import dotenv from 'dotenv';

// Determinar el entorno y cargar el archivo .env correspondiente
const env = process.env.NODE_ENV || 'development'; // Default a 'development' si NODE_ENV no está definido
const envFile = `.env.${env}`;

// Usar dotenv para cargar el archivo de entorno específico
dotenv.config({ path: envFile });

console.log(`Environment set to ${env}, using ${envFile}`);
console.log(process.env.MESSAGE);