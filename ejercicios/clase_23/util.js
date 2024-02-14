// Función para validar el nombre de la mascota
export function validatePetName(name) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
}

// Función para encontrar la mascota por nombre
export function findPetByName(name, pets) {
    return pets.find(p => p.name.toLowerCase() === name.toLowerCase());
}
