// Acceso a variables de entorno
console.log('Entorno actual:', process.env.NODE_ENV);

// Captura de argumentos de la línea de comandos
const args = process.argv.slice(2);
console.log('Argumentos de la línea de comandos:', args);

// Manejo del evento 'exit'
process.on('exit', (code) => {
    console.log(`El proceso está saliendo con el código: ${code}`);
});

// Ejemplo de salida forzada (comentar para evitar la salida inmediata)
// process.exit(1);

// Directorio de trabajo actual
console.log('Directorio de trabajo actual:', process.cwd());

// Información de la plataforma
console.log('Plataforma:', process.platform);
