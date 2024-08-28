import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../service/api';
import { Link } from 'react-router-dom';
interface Product {
    id: string;
    name: string;
    description: string;
    genero: string;
    classificacao: number;
    nota: number;
}
function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    console.log(products)
    useEffect(() => {
        loadProducts();
    }, []);
    const loadProducts = async () => {
        const response = await getProducts();
        setProducts(response.data);
    };
    const handleDelete = async (id: string) => {
        console.log(id)
        await deleteProduct(id);
        loadProducts();
    };
    return (
        <div>
            <h1> Livros </h1>
            <Link to="/add">Add Livro</Link>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.genero} - {product.classificacao} - {product.nota}  - {product.description} units
                        <Link to={`/edit/${product.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ProductList; 