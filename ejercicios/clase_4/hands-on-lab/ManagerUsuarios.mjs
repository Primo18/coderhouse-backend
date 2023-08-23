import fs from 'node:fs/promises';

class Manager {
    async crearUsuario(nombre, apellido, edad, curso) {
        try {
            const data = await fs.readFile('Usuarios.json', 'utf8');
            const usuarios = JSON.parse(data);
            const usuario = {
                nombre,
                apellido,
                edad,
                curso
            }
            usuarios.push(usuario);
            await fs.writeFile('Usuarios.json', JSON.stringify(usuarios, null, 2));
            console.log('Usuario creado');

        } catch (err) {
            throw new Error('No se pudo crear el usuario');
        }
    }

    async ConsultarUsuarios() {
        try {
            const data = await fs.readFile('Usuarios.json', 'utf8');
            const usuarios = JSON.parse(data);
            console.log(usuarios);
        } catch (err) {
            throw new Error('No se pudo consultar los usuarios');
        }
    }
}

const manager = new Manager();
manager.crearUsuario('Juan', 'Perez', 25, 'Fullstack');
manager.ConsultarUsuarios();