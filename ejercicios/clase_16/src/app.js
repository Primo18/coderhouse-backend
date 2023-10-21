import mongoose from 'mongoose';
import userModel from './models/users.js';
import studentModel from './models/student.js';
import courseModel from './models/course.js';

const environment = async () => {
    await mongoose.connect('mongodb+srv://primo:Rust.1830@devcluster.9xzyesc.mongodb.net/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // await studentModel.create({
    //     first_name: 'Primo',
    //     last_name: 'Lobo',
    //     email: 'primo@primo.com',
    //     gender: 'M',
    // });

    // await courseModel.create({
    //     name: 'Intro to NodeJS',
    //     code: 'NODE101',
    //     description: 'Introduction to NodeJS',
    //     topics: ['NodeJS', 'Backend'],
    //     students: []
    // });

    // Populate the course array in the student collection
    const student = await studentModel.findOne({ first_name: 'Primo' });
    console.log(JSON.stringify(student, null, 4));
};

environment();