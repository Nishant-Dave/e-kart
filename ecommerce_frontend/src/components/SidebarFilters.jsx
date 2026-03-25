import React, { useState, useEffect } from 'react';

const SidebarFilters = ({ categories, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState(1000);

  useEffect(() => {
    // Notify parent whenever filters change
    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (priceRange < 1000) params.max_price = priceRange;
    onFilterChange(params);
  }, [selectedCategory, priceRange, onFilterChange]);

  return (
    <aside className="w-[25%] flex-shrink-0 min-h-screen bg-slate-50 p-8 border-r border-slate-200">
      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 border-b border-slate-200 pb-4">Filters</h2>
      
      <div className="mb-10">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Category</h3>
        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <input 
              type="radio" 
              name="category"
              id="cat-all" 
              checked={selectedCategory === ''}
              onChange={() => setSelectedCategory('')}
              className="w-4 h-4 cursor-pointer accent-slate-900 rounded-sm border-slate-300" 
            />
            <label htmlFor="cat-all" className="text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900 transition-colors">
              All Categories
            </label>
          </li>
          {categories.map((cat, idx) => {
            const catName = cat.name || cat;
            return (
              <li key={idx} className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="category"
                  id={`cat-${idx}`} 
                  checked={selectedCategory === catName}
                  onChange={() => setSelectedCategory(catName)}
                  className="w-4 h-4 cursor-pointer accent-slate-900 rounded-sm border-slate-300" 
                />
                <label htmlFor={`cat-${idx}`} className="text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900 transition-colors">
                  {catName}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Max Price: ${priceRange}</h3>
        <input 
          type="range" 
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-slate-900 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer" 
          min="0" 
          max="1000" 
          step="10"
        />
        <div className="flex justify-between mt-2 text-xs font-medium text-slate-500">
          <span>$0</span>
          <span>$1000+</span>
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilters;
