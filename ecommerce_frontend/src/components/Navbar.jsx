import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-50">
      <div className="text-xl font-bold tracking-tight text-gray-900">
        ATELIER.
      </div>
      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <input 
          type="text" 
          placeholder="Search products..." 
          className="w-full bg-gray-50 text-gray-900 text-sm px-4 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-black placeholder-gray-400"
        />
      </div>
      <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
        <button className="hover:text-black transition-colors">Profile</button>
        <button className="hover:text-black transition-colors">Cart (0)</button>
      </div>
    </nav>
  );
};

export default Navbar;
