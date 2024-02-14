import { Command } from "commander";

const program = new Command();

// Establece la versión del programa CLI
program.version('1.0.0');

// Define opciones para el programa CLI
program
    .option('-d', 'Activa el modo debug', false) // Opción corta sin valor esperado (flag)
    .option('-p, --port <port>', 'Puerto para el servidor', '3000') // Opción con valor requerido y valor por defecto
    .option('-h, --host <host>', 'Host para el servidor', 'localhost') // Opción con valor requerido y valor por defecto
    .option('--mode <mode>', 'Modo de ejecución', 'development') // Opción larga con valor requerido y valor por defecto
    .requiredOption('-u <user>', 'Usuario utilizando el aplicativo') // Opción requerida con valor requerido
    .option('-l, --letters [letters...]', 'Letras a utilizar', ['a', 'b', 'c']); // Opción con valores múltiples

// Parsea los argumentos de la línea de comandos
program.parse(process.argv);

const options = program.opts(); // Obtiene las opciones parseadas

// Imprime las opciones seleccionadas y los argumentos restantes
console.log('Options: ', options);
console.log('Remaining arguments:', program.args);
