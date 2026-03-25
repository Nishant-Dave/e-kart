import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (searchTerm.trim()) {
        navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      } else {
        navigate('/products');
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="w-full bg-slate-50 shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-[1440px] w-full mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-slate-900 hover:text-slate-700 transition-colors">
          e-Kart<span className="text-slate-500">.</span>
        </Link>
        
        {/* Search - Desktop */}
        <div className="flex-1 max-w-xl mx-8 hidden md:block relative group">
          <input 
            type="text" 
            placeholder="Search our collection..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyPress}
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm px-5 py-2.5 rounded-full outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100 transition-all placeholder-slate-400"
          />
          <svg className="absolute right-4 top-3 w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        
        {/* Links - Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <Link to="/products" className="hover:text-slate-900 transition-colors">Shop</Link>
          <Link to="/cart" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
            Cart <span className="bg-slate-200 text-slate-800 text-[10px] px-2 py-0.5 rounded-full">{totalCount}</span>
          </Link>
          {token ? (
            <>
              <Link to="/orders" className="hover:text-slate-900 transition-colors">Orders</Link>
              <Link to="/profile" className="hover:text-slate-900 transition-colors">Profile</Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700 transition-colors font-semibold">Logout</button>
            </>
          ) : (
            <Link to="/login" className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 hover:shadow-md hover:-translate-y-0.5 transition-all">Sign In</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-800 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-50 border-t border-slate-200 px-6 py-4 space-y-4 shadow-xl absolute w-full left-0 z-40">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyPress}
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-lg outline-none focus:border-slate-300 placeholder-slate-400" 
          />
          <Link to="/products" className="block text-slate-800 font-semibold py-2 hover:text-slate-900 transition-colors">Shop</Link>
          <Link to="/cart" className="flex items-center gap-2 text-slate-800 font-semibold py-2 hover:text-slate-900 transition-colors">
            Cart <span className="bg-slate-200 text-slate-800 text-[10px] px-2 py-0.5 rounded-full">{totalCount}</span>
          </Link>
          {token ? (
            <>
              <Link to="/orders" className="block text-slate-800 font-semibold py-2 hover:text-slate-900 transition-colors">Orders</Link>
              <Link to="/profile" className="block text-slate-800 font-semibold py-2 hover:text-slate-900 transition-colors">Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left text-red-500 hover:text-red-700 font-semibold py-2 border-t border-slate-200 mt-2 transition-colors">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block text-slate-800 font-semibold py-2 hover:text-slate-900 transition-colors">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
