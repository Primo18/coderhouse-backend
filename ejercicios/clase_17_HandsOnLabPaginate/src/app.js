import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import studentsModel from './models/students.js';

const students = [
    { first_name: "Juan", last_name: "Pérez", email: "juan.perez@email.com", gender: "male", grade: 85, group: "Group A", courses: ["Math", "Science"] },
    { first_name: "Marta", last_name: "Rodríguez", email: "marta.rodriguez@email.com", gender: "female", grade: 92, group: "Group B", courses: ["Language", "History"] },
    { first_name: "Andrés", last_name: "Gómez", email: "andres.gomez@email.com", gender: "male", grade: 89, group: "Group A", courses: ["Math", "Geography"] },
    { first_name: "Laura", last_name: "Torres", email: "laura.torres@email.com", gender: "female", grade: 78, group: "Group C", courses: ["Science", "PE"] },
    { first_name: "Pedro", last_name: "Vargas", email: "pedro.vargas@email.com", gender: "male", grade: 88, group: "Group B", courses: ["History", "Math"] },
    { first_name: "Isabel", last_name: "Ortiz", email: "isabel.ortiz@email.com", gender: "female", grade: 95, group: "Group A", courses: ["Language", "Art"] },
    { first_name: "José", last_name: "Hernández", email: "jose.hernandez@email.com", gender: "male", grade: 82, group: "Group C", courses: ["Geography", "Science"] },
    { first_name: "Beatriz", last_name: "Morales", email: "beatriz.morales@email.com", gender: "female", grade: 91, group: "Group B", courses: ["Math", "History"] },
    { first_name: "Miguel", last_name: "Ruiz", email: "miguel.ruiz@email.com", gender: "male", grade: 86, group: "Group A", courses: ["PE", "Language"] },
    { first_name: "Carla", last_name: "Jiménez", email: "carla.jimenez@email.com", gender: "female", grade: 94, group: "Group C", courses: ["Art", "Science"] },
    { first_name: "Fernando", last_name: "Lara", email: "fernando.lara@email.com", gender: "male", grade: 80, group: "Group B", courses: ["History", "Geography"] },
    { first_name: "Lucía", last_name: "Delgado", email: "lucia.delgado@email.com", gender: "female", grade: 93, group: "Group A", courses: ["Math", "PE"] },
    { first_name: "Sergio", last_name: "Paredes", email: "sergio.paredes@email.com", gender: "male", grade: 81, group: "Group C", courses: ["Science", "Art"] },
    { first_name: "Carmen", last_name: "Vega", email: "carmen.vega@email.com", gender: "female", grade: 87, group: "Group B", courses: ["Language", "Math"] },
    { first_name: "David", last_name: "Aguilar", email: "david.aguilar@email.com", gender: "male", grade: 85, group: "Group A", courses: ["History", "PE"] },
    { first_name: "Teresa", last_name: "Campos", email: "teresa.campos@email.com", gender: "female", grade: 88, group: "Group C", courses: ["Art", "Geography"] },
    { first_name: "Antonio", last_name: "Mendoza", email: "antonio.mendoza@email.com", gender: "male", grade: 89, group: "Group B", courses: ["Science", "Math"] },
    { first_name: "María", last_name: "Reyes", email: "maria.reyes@email.com", gender: "female", grade: 91, group: "Group A", courses: ["PE", "Language"] },
    { first_name: "Javier", last_name: "Guerra", email: "javier.guerra@email.com", gender: "male", grade: 82, group: "Group C", courses: ["Art", "Science"] },
    { first_name: "Luisa", last_name: "Medina", email: "luisa.medina@email.com", gender: "female", grade: 90, group: "Group B", courses: ["Math", "History"] }
];


const app = express();

const startServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://primo:Rust.1830@devcluster.9xzyesc.mongodb.net/coderDB?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // studentsModel.insertMany(students)
        //     .then(() => {
        //         console.log('Estudiantes insertados con éxito');
        //     })
        //     .catch(error => {
        //         console.error('Error insertando los estudiantes:', error);
        //     });

        app.engine('handlebars', handlebars.engine());
        app.set('views', __dirname + '/views')
        app.set('view engine', 'handlebars');

        app.use('/', viewsRouter);

        app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
    } catch (error) {
        console.error('Error connecting to MongoDB or starting the server:', error);
    }
}

startServer();
