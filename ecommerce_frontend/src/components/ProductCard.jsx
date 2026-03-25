import React, { useState } from 'react';
import { addToCart } from '../services/cart';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { updateCartState } = useCart();

  const handleAddToCart = async (e) => {
    e.stopPropagation(); 
    setIsAdding(true);
    try {
      await addToCart(product.id, 1);
      updateCartState();
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Add to cart failed:', error);
      alert('Failed to add product to cart.');
    } finally {
      setIsAdding(false);
    }
  };

  const imageUrl = product.image || `https://via.placeholder.com/400x400/eef2ff/312e81?text=${encodeURIComponent(product.name)}`;
  
  return (
    <div className="group relative flex flex-col p-4 sm:p-5 rounded-2xl bg-white shadow-sm border border-indigo-50 hover:shadow-2xl hover:border-indigo-100 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-64 w-full rounded-xl bg-indigo-50/50 overflow-hidden mb-4">
        <img 
          src={imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Hover action overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 bg-gradient-to-t from-indigo-950/70 via-indigo-900/40 to-transparent">
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full bg-green-600 text-white text-xs sm:text-sm py-2.5 sm:py-3 rounded-lg font-bold tracking-wide hover:bg-green-500 shadow-[0_4px_14px_0_rgba(22,163,74,0.39)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.23)] hover:-translate-y-0.5 transition-all ${isAdding ? 'opacity-75 cursor-not-allowed transform-none' : ''}`}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col gap-1.5 px-1 pb-1">
        <span className="text-[10px] sm:text-[11px] font-extrabold text-indigo-400 uppercase tracking-widest">
          {product.category_name || product.category || 'Collection'}
        </span>
        <h3 className="text-sm sm:text-base font-bold text-indigo-950 leading-tight line-clamp-1">
          {product.name}
        </h3>
        <span className="text-base sm:text-lg font-black text-indigo-900 mt-0.5">
          ${Number(product.price).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
