import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50 border-b border-indigo-50">
      <div className="max-w-[1440px] w-full mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-indigo-900 hover:text-indigo-700 transition-colors">
          ATELIER<span className="text-green-600">.</span>
        </Link>
        
        {/* Search - Desktop */}
        <div className="flex-1 max-w-xl mx-8 hidden md:block relative group">
          <input 
            type="text" 
            placeholder="Search our collection..." 
            className="w-full bg-indigo-50/50 border border-indigo-100 text-indigo-900 text-sm px-5 py-2.5 rounded-full outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all placeholder-indigo-300"
          />
          <svg className="absolute right-4 top-3 w-4 h-4 text-indigo-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        
        {/* Links - Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-indigo-900">
          <Link to="/products" className="hover:text-indigo-600 transition-colors">Shop</Link>
          <Link to="/cart" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
            Cart <span className="bg-indigo-100 text-indigo-800 text-[10px] px-2 py-0.5 rounded-full">{totalCount}</span>
          </Link>
          {token ? (
            <button onClick={handleLogout} className="text-red-600 hover:text-red-700 transition-colors font-semibold">Logout</button>
          ) : (
            <Link to="/login" className="bg-indigo-900 text-white px-5 py-2.5 rounded-full hover:bg-indigo-800 hover:shadow-lg hover:-translate-y-0.5 transition-all">Sign In</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-indigo-900 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-indigo-50 px-6 py-4 space-y-4 shadow-xl absolute w-full left-0 z-40">
          <input type="text" placeholder="Search..." className="w-full bg-indigo-50/50 border border-indigo-100 text-indigo-900 text-sm px-4 py-3 rounded-lg outline-none focus:border-indigo-300" />
          <Link to="/products" className="block text-indigo-900 font-semibold py-2">Shop</Link>
          <Link to="/cart" className="flex items-center gap-2 text-indigo-900 font-semibold py-2">
            Cart <span className="bg-indigo-100 text-indigo-800 text-[10px] px-2 py-0.5 rounded-full">{totalCount}</span>
          </Link>
          {token ? (
            <button onClick={handleLogout} className="block w-full text-left text-red-600 font-semibold py-2">Logout</button>
          ) : (
            <Link to="/login" className="block text-indigo-900 font-semibold py-2">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
