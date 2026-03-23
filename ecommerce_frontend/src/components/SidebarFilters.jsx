import React from 'react';

const SidebarFilters = ({ categories }) => {
  return (
    <aside className="w-[25%] flex-shrink-0 min-h-screen bg-gray-50 p-8 border-r border-gray-100">
      <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-8">Filters</h2>
      
      <div className="mb-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Category</h3>
        <ul className="flex flex-col gap-4">
          {categories.map((cat, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <input type="checkbox" id={`cat-${idx}`} className="w-4 h-4 cursor-pointer accent-black rounded-sm border-gray-300" />
              <label htmlFor={`cat-${idx}`} className="text-sm font-medium text-gray-700 cursor-pointer hover:text-black transition-colors">
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Price Range</h3>
        <input type="range" className="w-full accent-black h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" min="0" max="1000" />
        <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
          <span>$0</span>
          <span>$1000+</span>
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilters;
