// Importar dependencias necesarias
import express from 'express';
import { fork } from 'child_process';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Inicializar la aplicación Express
const app = express();

// Contador de visitas
let visitCount = 0;

// Ruta raíz para incrementar y mostrar el contador de visitas
app.get('/', (req, res) => {
    visitCount++;
    res.send(`Visitas totales: ${visitCount}`);
});

// Ruta de cálculo bloqueante
app.get('/calculo-bloq', (req, res) => {
    let sum = 0;
    for (let i = 0; i <= 999999999999999; i++) {
        sum += i;
    }
    res.send(`Resultado del cálculo bloqueante: ${sum}`);
});

// Ruta de cálculo no bloqueante
app.get('/calculo-nobloq', (req, res) => {
    const child = fork(path.join(__dirname, 'calculo.js')); // Iniciar un proceso hijo
    let responded = false; // Variable para asegurar que solo respondemos una vez

    child.on('message', (sum) => {
        if (!responded) {
            res.send(`Resultado del cálculo no bloqueante: ${sum}`);
            responded = true; // Marcamos que ya hemos respondido
        }
    });

    child.on('error', (error) => {
        if (!responded) {
            res.status(500).send('Error en el proceso hijo');
            responded = true; // Marcamos que ya hemos respondido
        }
    });

    child.send('start');
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
