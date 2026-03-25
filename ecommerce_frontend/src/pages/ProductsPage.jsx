import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  }, [filters, searchKeyword]);


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
          <span>Home</span> <span className="opacity-50">/</span>
          <span>Shop</span> <span className="opacity-50">/</span>
          <span className="text-black">All Products</span>
        </p>
      </div>

      {/* Main Horizontal Split Layout: 25% Sidebar / 75% Content */}
      <main className="max-w-[1440px] mx-auto flex mt-4 items-start border-t border-gray-100">
        <SidebarFilters 
          categories={categories} 
          onFilterChange={setFilters}
        />
        <div className="flex-1 w-full">
          {loading && products.length > 0 && (
            <div className="text-center py-4 text-slate-500 text-sm animate-pulse">Updating catalogue...</div>
          )}
          <ProductGrid products={products} />
        </div>
      </main>
    </div>
  );
}
