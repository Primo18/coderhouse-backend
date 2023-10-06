const socket = io();

socket.emit("mensaje", "Hola mundo desde el cliente");

// Escuchar el evento 'new-product' para actualizar la lista de productos
socket.on("new-product", (newProduct) => {
    // Aquí puedes actualizar el DOM para incluir el nuevo producto
    // Por ejemplo, podrías tener una función `addProductToList` que haga esto
    addProductToList(newProduct);
});

// Escuchar el evento 'delete-product' para actualizar la lista de productos
socket.on("delete-product", (productId) => {
    // Aquí puedes actualizar el DOM para eliminar el producto
    // Por ejemplo, podrías tener una función `removeProductFromList` que haga esto
    removeProductFromList(productId);
});

// Función de ejemplo para agregar un producto a la lista
function addProductToList(product) {
    const productList = document.getElementById("products-list");
    const productItem = document.createElement("li");

    // Aquí puedes crear el HTML para el nuevo producto
    // Por ejemplo:
    productItem.innerHTML = `
        <img src="${product.thumbnails[0]}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Precio: $${product.price}</p>
        <p>Stock: ${product.stock}</p>
    `;

    productList.appendChild(productItem);
}

document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll(".btn-delete");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            socket.emit("delete-product", productId);
        });
    });
});
