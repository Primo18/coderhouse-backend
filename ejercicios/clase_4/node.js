import fs from 'node:fs/promises';

const info = {
    contenidoStr: '',
    contenidoObj: {},
    size: 0
}

// leer un archivo usando async/await
async function readFile() {
    try {
        const data = await fs.readFile('package.json', 'utf8');
        info.contenidoStr = data;
        info.contenidoObj = JSON.parse(data);
        info.size = data.length;
        console.log(info);
    } catch (err) {
        throw new Error('No se pudo leer el archivo');
    }
}

readFile();