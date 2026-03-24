import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccessPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-indigo-50/20">
      <div className="bg-white p-10 sm:p-16 rounded-[40px] shadow-[0_20px_60px_-15px_rgba(49,46,129,0.08)] text-center max-w-lg w-full relative overflow-hidden">
        {/* Decorative Aura */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        
        <div className="relative z-10">
          {/* Animated Success Checkmark */}
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-green-200">
            <svg 
              className="w-12 h-12" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </div>
          
          <h1 className="text-4xl font-black text-indigo-950 tracking-tight mb-4">Complete!</h1>
          <p className="text-lg text-indigo-400 font-medium mb-12 leading-relaxed">
            Your order has been placed successfully. We are preparing it for shipment!
          </p>
          
          <Link 
            to="/products"
            className="inline-block w-full bg-indigo-900 text-white px-8 py-4 rounded-2xl font-bold tracking-wide hover:bg-indigo-800 shadow-[0_8px_20px_-6px_rgba(49,46,129,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(49,46,129,0.7)] hover:-translate-y-1 transition-all"
          >
            Go to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
