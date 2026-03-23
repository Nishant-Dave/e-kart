import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/products';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        
        // Handle DRF List View potentially returning inside 'results' key if paginated
        const productList = data.results ? data.results : data;
        setProducts(productList);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch products. Please verify the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>Our Products</h1>
      {products.length === 0 ? (
        <p>No products available right now.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <h3>{product.name}</h3>
              <p><strong>Category:</strong> {product.category_name || product.category || 'Uncategorized'}</p>
              <p><strong>Price:</strong> ${product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
