import { Router } from 'express';
import Estudiante from '../models/Estudiante.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const estudiante = req.body;
    const newEstudiante = new Estudiante(estudiante);
    try {
        await newEstudiante.save();
        res.status(201).json(newEstudiante);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// PUT 
router.put('/:uid', async (req, res) => {
    const { uid } = req.params;
    const estudiante = req.body;
    if (!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(404).send(`No user with id: ${uid}`);
    }
    const updatedEstudiante = await Estudiante.findByIdAndUpdate(uid, estudiante, { new: true });
    res.json(updatedEstudiante);
});

// DELETE 
router.delete('/:uid', async (req, res) => {
    const { uid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(404).send(`No user with id: ${uid}`);
    }
    await Estudiante.findByIdAndRemove(uid);
    res.json({ message: "Estudiante deleted successfully." });
});

export const estudiantesRouter = router;
