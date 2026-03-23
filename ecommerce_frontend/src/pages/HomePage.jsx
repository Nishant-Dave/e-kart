import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 min-h-[70vh]">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
        Welcome to Atelier.
      </h1>
      <p className="text-lg text-gray-500 max-w-2xl mb-10">
        Discover our curated collection of premium products, designed for the minimalist aesthetic and crafted with uncompromising quality.
      </p>
      <Link 
        to="/products"
        className="bg-black text-white px-8 py-4 rounded-md font-semibold hover:bg-gray-800 transition-colors shadow-lg"
      >
        Shop Collection
      </Link>
    </div>
  );
}
