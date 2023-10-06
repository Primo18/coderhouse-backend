import MensajeController from '../controllers/mensajeController.js';

const mensajeController = new MensajeController();

export const renderHomePage = async (req, res) => {
    try {
        const mensajes = await mensajeController.leer();
        if (!mensajes) {
            throw new Error('No se pudieron obtener los mensajes');
        }
        res.render('index', {
            title: 'Home',
            style: 'index.css',
            mensajes: mensajes.map(m => m.mensaje)
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error');
    }
};
