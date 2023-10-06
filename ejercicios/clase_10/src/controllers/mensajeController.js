import fs from 'fs/promises';

class MensajeController {
    constructor() {
        this.path = './src/models/mensajes.json';
    }

    async leer() {
        try {
            const contenido = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(contenido);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async guardar(mensaje) {
        try {
            const mensajes = await this.leer();
            mensajes.push(mensaje);
            await fs.writeFile(this.path, JSON.stringify(mensajes, null, '\t'));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default MensajeController;
