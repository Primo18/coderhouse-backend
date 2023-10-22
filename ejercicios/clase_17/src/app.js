import mongoose from 'mongoose';
import Order from './models/order.js';
import Student from './models/student.js';
import User from './models/user.js';

// const environment = async () => {
//     await mongoose.connect('mongodb+srv://primo:Rust.1830@devcluster.9xzyesc.mongodb.net/?retryWrites=true&w=majority', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });
//     // const result = await Order.insertMany([
//     //     { name: "Pepperoni", size: "small", price: 10, quantity: 1, date: "2021-01-01" },
//     //     { name: "Margarita", size: "medium", price: 12, quantity: 2, date: "2021-01-02" },
//     //     { name: "BBQ Chicken", size: "large", price: 15, quantity: 1, date: "2021-01-03" },
//     //     { name: "Hawaiian", size: "medium", price: 13, quantity: 1, date: "2021-01-04" },
//     //     { name: "Meat Lovers", size: "large", price: 16, quantity: 2, date: "2021-01-05" },
//     //     { name: "Veggie", size: "small", price: 11, quantity: 1, date: "2021-01-06" },
//     //     { name: "Buffalo Chicken", size: "medium", price: 14, quantity: 1, date: "2021-01-07" },
//     //     { name: "Four Cheese", size: "large", price: 15, quantity: 1, date: "2021-01-08" },
//     //     { name: "Sausage", size: "medium", price: 12, quantity: 1, date: "2021-01-09" },
//     //     { name: "Supreme", size: "large", price: 17, quantity: 2, date: "2021-01-10" },
//     //     { name: "Taco", size: "small", price: 10, quantity: 1, date: "2021-01-11" },
//     //     { name: "Mushroom", size: "medium", price: 13, quantity: 1, date: "2021-01-12" },
//     //     { name: "Garlic", size: "large", price: 14, quantity: 1, date: "2021-01-13" },
//     //     { name: "Anchovies", size: "medium", price: 13, quantity: 1, date: "2021-01-14" },
//     //     { name: "Seafood", size: "large", price: 18, quantity: 2, date: "2021-01-15" },
//     // ]);
//     // console.log(result);

//     const orders = await Order.aggregate([
//         {
//             $match: { size: "medium" }
//         },
//         {
//             $group: {
//                 _id: "$name",
//                 total: { $sum: "$price" }
//             }
//         },
//         {
//             $sort: { total: -1 }
//         },
//         {
//             $group: {
//                 _id: 1,
//                 orders: { $push: "$$ROOT" }
//             }
//         },
//         {
//             $project: {
//                 _id: 0,
//                 orders: '$orders'
//             }
//         },
//         {
//             $merge: {
//                 into: 'reports',
//                 on: '_id',
//                 whenMatched: 'replace',
//                 whenNotMatched: 'insert'
//             }
//         }
//     ]);
//     console.log(orders);
// };


// const environment = async () => {
//     await mongoose.connect('mongodb+srv://primo:Rust.1830@devcluster.9xzyesc.mongodb.net/?retryWrites=true&w=majority', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });

//     // Insert 20 sample students
//     // const students = await Student.insertMany([
//     //     { first_name: 'John', last_name: 'Doe', email: 'john@example.com', gender: 'Male', grade: 'A', group: 'Math' },
//     //     { first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', gender: 'Female', grade: 'B', group: 'Science' },
//     //     { first_name: 'Mike', last_name: 'Smith', email: 'mike@example.com', gender: 'Male', grade: 'C', group: 'History' },
//     //     { first_name: 'Sara', last_name: 'Lee', email: 'sara@example.com', gender: 'Female', grade: 'A', group: 'Math' },
//     //     { first_name: 'Tom', last_name: 'Brown', email: 'tom@example.com', gender: 'Male', grade: 'B', group: 'Science' },
//     //     { first_name: 'Emily', last_name: 'Clark', email: 'emily@example.com', gender: 'Female', grade: 'A', group: 'Math' },
//     //     { first_name: 'Robert', last_name: 'Johnson', email: 'robert@example.com', gender: 'Male', grade: 'C', group: 'History' },
//     //     { first_name: 'Nina', last_name: 'Williams', email: 'nina@example.com', gender: 'Female', grade: 'B', group: 'Science' },
//     //     { first_name: 'Steve', last_name: 'Davis', email: 'steve@example.com', gender: 'Male', grade: 'A', group: 'Math' },
//     //     { first_name: 'Laura', last_name: 'Martinez', email: 'laura@example.com', gender: 'Female', grade: 'C', group: 'History' },
//     //     { first_name: 'Jack', last_name: 'Taylor', email: 'jack@example.com', gender: 'Male', grade: 'B', group: 'Science' },
//     //     { first_name: 'Sophia', last_name: 'Anderson', email: 'sophia@example.com', gender: 'Female', grade: 'A', group: 'Math' },
//     //     { first_name: 'Alex', last_name: 'Thomas', email: 'alex@example.com', gender: 'Male', grade: 'C', group: 'History' },
//     //     { first_name: 'Isabella', last_name: 'Jackson', email: 'isabella@example.com', gender: 'Female', grade: 'B', group: 'Science' },
//     //     { first_name: 'William', last_name: 'Harris', email: 'william@example.com', gender: 'Male', grade: 'A', group: 'Math' },
//     //     { first_name: 'Grace', last_name: 'Nelson', email: 'grace@example.com', gender: 'Female', grade: 'C', group: 'History' },
//     //     { first_name: 'Henry', last_name: 'Thompson', email: 'henry@example.com', gender: 'Male', grade: 'B', group: 'Science' },
//     //     { first_name: 'Olivia', last_name: 'Hall', email: 'olivia@example.com', gender: 'Female', grade: 'A', group: 'Math' },
//     //     { first_name: 'Liam', last_name: 'Allen', email: 'liam@example.com', gender: 'Male', grade: 'C', group: 'History' },
//     //     { first_name: 'Emma', last_name: 'Adams', email: 'emma@example.com', gender: 'Female', grade: 'B', group: 'Science' }
//     // ]);
//     // console.log("Students inserted:", students);

//     // Obtener a los estudiantes agrupados por calificación del mejor al peor:
//     // const studentsByGrade = await Student.aggregate([
//     //     {
//     //         $group: {
//     //             _id: '$grade',
//     //             students: {
//     //                 $push: {
//     //                     first_name: '$first_name',
//     //                     last_name: '$last_name'
//     //                 }
//     //             }
//     //         }
//     //     },
//     //     {
//     //         $sort: { _id: 1 }
//     //     },
//     //     {
//     //         $project: {
//     //             _id: 1,
//     //             students: '$students.first_name'
//     //         }
//     //     }
//     // ]);

//     // console.log("Students grouped by grade:", studentsByGrade);

//     // Obtener a los estudiantes agrupados por grupo:
//     // const studentsByGroup = await Student.aggregate([
//     //     {
//     //         $group: {
//     //             _id: '$group',
//     //             students: {
//     //                 $push: {
//     //                     first_name: '$first_name',
//     //                     last_name: '$last_name'
//     //                 }
//     //             }
//     //         }
//     //     },
//     //     {
//     //         $project: {
//     //             _id: 1,
//     //             students: '$students.first_name'
//     //         }
//     //     }
//     // ]);
//     // console.log("Students grouped by group:", studentsByGroup);

//     // Obtener el promedio de los estudiantes del grupo de matemáticas:
//     const averageGrade = await Student.aggregate([
//         {
//             $match: { group: 'Math' }
//         },
//         {
//             $group: {
//                 _id: '$group',
//                 average: { $avg: { $sum: ['$grade'] } }
//             }
//         }
//     ]);
//     console.log("Average grade for Math group:", averageGrade);

// };

const environment = async () => {
    await mongoose.connect('mongodb+srv://primo:Rust.1830@devcluster.9xzyesc.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const users = await User.paginate({}, { page: 1, limit: 5 });
    console.log(users);


};

environment();
