import React from 'react';

const ProductCard = ({ product }) => {
  // Use a default image if none provided by API
  const imageUrl = product.image || `https://via.placeholder.com/400x400/f3f4f6/6b7280?text=${encodeURIComponent(product.name)}`;
  
  return (
    <div className="group relative flex flex-col gap-3 p-4 rounded-xl bg-white shadow-sm border border-gray-50 hover:shadow-lg hover:border-gray-100 transition-all duration-300 cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square w-full rounded-lg bg-gray-50 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover action overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button className="w-full bg-black text-white text-xs py-2.5 rounded-md font-semibold hover:bg-gray-800 shadow-md">
            Quick Add
          </button>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col gap-1 mt-1 px-1">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.05em]">
          {product.category_name || product.category || 'Uncategorized'}
        </span>
        <h3 className="text-[14px] font-semibold text-gray-900 leading-snug">
          {product.name}
        </h3>
        <span className="text-base font-bold text-black mt-0.5">
          ${Number(product.price).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
