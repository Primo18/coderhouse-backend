import { Router } from 'express';
import { validatePetName, findPetByName } from './util.js';

const router = Router();

const pets = [
    { name: 'Rex', specie: 'Dog' },
];

// Middleware para acceder directamente a la mascota por nombre
router.param('pet', (req, res, next, name) => {
    const decodedName = decodeURIComponent(name);

    // Estructura de control temprano (early return) para manejar los casos de error primero
    if (!validatePetName(decodedName)) {
        return res.status(400).json({ message: 'Invalid pet name' });
    }

    const pet = findPetByName(decodedName, pets);
    if (pet) {
        req.pet = pet;
        next();
    } else {
        res.status(404).json({ message: 'Pet not found' });
    }

    // Estructura condicional más tradicional, encapsulando la lógica de éxito dentro del bloque if y manejando el error en el else. 
    //Esto puede parecer más estructurado y directo para algunos, especialmente si prefieren ver la lógica de "camino feliz" primero.
    // if (validatePetName(decodedName)) {
    //     const pet = findPetByName(decodedName, pets);
    //     if (pet) {
    //         req.pet = pet;
    //         next();
    //     } else {
    //         res.status(404).json({ message: 'Pet not found' });
    //     }
    // } else {
    //     res.status(400).json({ message: 'Invalid pet name' });
    // }
});

// POST endpoint para añadir una nueva mascota
router.post('/', (req, res) => {
    const { name, specie } = req.body;
    if (name && specie) {
        pets.push({ name, specie });
        res.status(201).json({ message: 'Pet added succesfully' });
    } else {
        res.status(400).json({ message: 'Invalid pet' });
    }
});

// GET endpoint para obtener una mascota por nombre
router.get('/:pet', (req, res) => {
    res.json(req.pet);
});

// PUT endpoint para marcar una mascota como adoptada
router.put('/:pet', (req, res) => {
    req.pet.adopted = true;
    res.json({ message: 'Pet marked as adopted', pet: req.pet });
});

export default router;
