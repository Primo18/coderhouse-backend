import mongoose from 'mongoose';

const estudiantesSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    dni: { type: String, required: true, unique: true },
    curso: { type: String, required: true },
    nota: { type: Number, required: true }
});

const Estudiante = mongoose.model('Estudiante', estudiantesSchema);
export default Estudiante;
