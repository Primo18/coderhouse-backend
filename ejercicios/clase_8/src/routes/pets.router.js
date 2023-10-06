import express from "express";

const router = express.Router();

const pets = [
    {
        name: "Pipo",
        age: 3,
        color: "Brown",
    },
    {
        name: "Luna",
        age: 2,
        color: "White",
    },
    {
        name: "Kira",
        age: 1,
        color: "Black",
    },

];

router.get("/", (req, res) => {
    res.send(pets);
});

// Ruta para manejar el formulario POST
router.post('/', (req, res) => {
    // Accede a los datos del formulario a través de req.body
    const pet = req.body;
    pets.push(pet);

    // Envía una respuesta de confirmación o redirige a otra página
    res.send('Formulario enviado con éxito');
});


export default router;