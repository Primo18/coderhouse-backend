import fs from 'node:fs';

// crear un archivo el cual contenga la fecha y hora actual usando callbacks
const date = new Date().toLocaleString();

fs.writeFile('date.txt', date, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

// leer el archivo creado en el punto anterior usando callbacks
fs.readFile('date.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// leer el archivo usando promesas
fs.promises.readFile('date.txt', 'utf8')
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.error(err);
    });
