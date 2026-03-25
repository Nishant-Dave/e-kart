import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      
      {/* Universal Footer */}
      <footer className="border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-[1440px] mx-auto px-8 flex justify-between items-center text-sm text-gray-500">
          <div>&copy; {new Date().getFullYear()} ATELIER. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-black transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-black transition-colors">Privacy</Link>
            <Link to="/contact" className="hover:text-black transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
