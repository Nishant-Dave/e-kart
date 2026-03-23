import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <div className="w-[75%] p-8">
      {/* Grid Utility Header */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-sm text-gray-500 font-medium">
          Showing <strong className="text-gray-900 font-bold">{products.length}</strong> products
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-900">
          <span className="font-medium">Sort by:</span>
          <select className="border-none bg-transparent font-semibold cursor-pointer outline-none focus:ring-0">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid Layout (3-4 columns with gaps) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
