import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts, getCategories } from '../services/products';
import Navbar from '../components/Navbar';
import SidebarFilters from '../components/SidebarFilters';
import ProductGrid from '../components/ProductGrid';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('search');
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const [ordering, setOrdering] = useState('-created_at');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch initial categories
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCategories();
        setCategories(data.results ? data.results : data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = { ...filters };
        if (searchKeyword) {
          queryParams.search = searchKeyword;
        }
        if (ordering) {
          queryParams.ordering = ordering;
        }
        
        const data = await getProducts(queryParams);
        
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
  }, [filters, searchKeyword, ordering]);


  if (loading && products.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-gray-500 font-medium">Loading products...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-red-500 font-medium">{error}</div>
    </div>
  );

  return (
    <div className="w-full selection:bg-gray-200 pb-16">      
      {/* Page Breadcrumb - Constrained to max-width */}
      <div className="max-w-[1440px] mx-auto px-8 pt-6 pb-2">
        <p className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold flex gap-2">
          <Link to="/" className="hover:text-black transition-colors">Home</Link> <span className="opacity-50">/</span>
          <Link to="/products" className="hover:text-black transition-colors">Shop</Link> <span className="opacity-50">/</span>
          <Link to="/products" className="text-black hover:opacity-80 transition-colors">All Products</Link>
        </p>
      </div>

      {/* Main Horizontal Split Layout: 25% Sidebar / 75% Content */}
      <main className="max-w-[1440px] mx-auto flex mt-4 items-start border-t border-gray-100">
        <SidebarFilters 
          categories={categories} 
          onFilterChange={setFilters}
        />
        <div className="flex-1 w-full pl-8 py-8 pr-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-black text-slate-900">
              {searchKeyword ? `Search: "${searchKeyword}"` : 'All Collection'}
            </h1>
          </div>
          
          {loading && products.length > 0 && (
            <div className="text-center pb-4 text-slate-500 text-sm animate-pulse">Updating catalogue...</div>
          )}
          <ProductGrid 
            products={products} 
            ordering={ordering} 
            onOrderChange={setOrdering} 
          />
        </div>
      </main>
    </div>
  );
}
