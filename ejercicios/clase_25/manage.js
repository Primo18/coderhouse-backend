import { program } from 'commander';
import { addProduct, listProducts } from './productService.js';

program.version('1.0.0');

program
    .command('add-product')
    .description('Agrega un nuevo producto')
    .option('--name <name>', 'Nombre del producto')
    .option('--price <price>', 'Precio del producto')
    .option('--stock <stock>', 'Stock del producto')
    .action(async (options) => {
        const { name, price, stock } = options;
        try {
            await addProduct({ name, price, stock });
            console.log('Producto agregado exitosamente');
        } catch (error) {
            console.error('Error agregando el producto:', error);
        }
    });

program
    .command('list-products')
    .description('Lista todos los productos')
    .action(async () => {
        try {
            const products = await listProducts();
            console.log(products);
        } catch (error) {
            console.error('Error listando los productos:', error);
        }
    });

program.parse(process.argv);
