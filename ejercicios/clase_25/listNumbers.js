// Definir la función listNumbers
function listNumbers(...numbers) {
    // Verificar si todos los argumentos son números
    const invalidArgs = numbers.filter(arg => typeof arg !== 'number');
    if (invalidArgs.length > 0) {
        // Mostrar error y los tipos de los argumentos
        console.error('Invalid parameters');
        console.error(numbers.map(arg => typeof arg));
        // Terminar el proceso con código -4
        process.exit(-4);
    } else {
        // Procesar los números como se requiera
        console.log('Números válidos:', numbers);
    }
}

// Agregar listener para el evento 'exit'
process.on('exit', (code) => {
    if (code === -4) {
        console.log('Proceso finalizado por argumentación inválida en una función');
    }
});

// Ejemplos de uso
listNumbers(1, 2, 3); // Caso válido
// listNumbers(1, 2, 'a', true); // Caso inválido que desencadena el error
