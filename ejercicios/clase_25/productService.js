let products = [
    { name: "Manzana", price: 1.20, stock: 100 },
    { name: "Banana", price: 0.80, stock: 150 },
    { name: "Naranja", price: 1.00, stock: 80 },
];

export const addProduct = async ({ name, price, stock }) => {
    products.push({ name, price, stock });
};

export const listProducts = async () => {
    return products;
};
