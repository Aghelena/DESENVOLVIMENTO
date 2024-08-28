import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProductById, updateProduct } from '../service/api';

interface Product {
    name: string;
    description: string;
    genero: string;
    classificacao: number;
    nota: number;
}

function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    name: '',
    description:'',
    genero: '',
    classificacao: 0,
    nota: 0,
  });

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await getProductById(id as string);
      setProduct(response.data);
    } catch (error) {
      console.error("Error loading product data", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(id, product);
      } else {
        await createProduct(product);
      }
      navigate('/');
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Genero</label>
        <input
          type="text"
          name="genero"
          value={product.genero}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Classificacao</label>
        <input
          type="number"
          name="classificacao"
          value={product.classificacao}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Nota</label>
        <input
          type="number"
          name="nota"
          value={product.nota}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default ProductForm;
