import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateCartItem, removeCartItem } from '../services/cart';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, updateCartState } = useCart();
  const navigate = useNavigate();

  const handleUpdate = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(productId, newQuantity);
      updateCartState();
    } catch (err) {
      alert('Failed to update quantity.');
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeCartItem(productId);
      updateCartState();
    } catch (err) {
      alert('Failed to remove item.');
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 py-12 md:py-24">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-indigo-50 p-12 text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </div>
          <h2 className="text-3xl font-black text-indigo-950 tracking-tight mb-2">Your cart is empty</h2>
          <p className="text-indigo-400 font-medium mb-8">
            It looks like you haven't added anything to your cart yet.
          </p>
          {!localStorage.getItem('access_token') ? (
            <button onClick={() => navigate('/login')} className="bg-indigo-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-800 shadow-[0_8px_20px_-6px_rgba(49,46,129,0.5)] transition-all">Sign In to Continue</button>
          ) : (
            <Link to="/products" className="bg-indigo-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-800 shadow-[0_8px_20px_-6px_rgba(49,46,129,0.5)] transition-all">Start Shopping</Link>
          )}
        </div>
      </div>
    );
  }

  // Calculate cart total from the context items array
  const cartTotal = cartItems.reduce((total, item) => total + (item.quantity * Number(item.product.price)), 0);

  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight text-indigo-950 mb-8 sm:mb-12">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Cart Items List */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-indigo-50 relative group">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-indigo-50/50 rounded-2xl overflow-hidden shrink-0">
                <img 
                  src={item.product.image || `https://via.placeholder.com/200x200/eef2ff/312e81?text=${encodeURIComponent(item.product.name)}`} 
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1 w-full">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{item.product.category_name || item.product.category || 'Collection'}</span>
                <Link to={`/products/${item.product.slug}`} className="text-lg font-bold text-indigo-950 hover:text-indigo-700 transition-colors line-clamp-2">
                  {item.product.name}
                </Link>
                <div className="text-xl font-black text-indigo-900 mt-2">${Number(item.product.price).toFixed(2)}</div>
                
                <div className="flex items-center justify-between w-full mt-4">
                  {/* Quantity Toggles */}
                  <div className="flex items-center bg-indigo-50/50 border border-indigo-100 rounded-xl p-1">
                    <button 
                      onClick={() => handleUpdate(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-indigo-900 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                    >-</button>
                    <span className="w-10 text-center text-sm font-bold text-indigo-950">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdate(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-indigo-900 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                    >+</button>
                  </div>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => handleRemove(item.product.id)}
                    className="text-red-500 font-bold text-sm hover:text-red-700 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Checkout Panel */}
        <div className="w-full lg:w-1/3 bg-indigo-950 rounded-3xl p-8 sticky top-32 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 opacity-50"></div>
          
          <h2 className="text-2xl font-black text-white mb-8 relative z-10">Order Summary</h2>
          
          <div className="flex flex-col gap-4 text-indigo-200 font-medium relative z-10">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span className="text-white font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping Estimate</span>
              <span className="text-white font-bold">Calculated at checkout</span>
            </div>
          </div>
          
          <div className="border-t border-indigo-800/50 my-6 relative z-10"></div>
          
          <div className="flex justify-between items-end mb-8 relative z-10">
            <span className="text-indigo-200 font-medium">Total (USD)</span>
            <span className="text-3xl font-black text-white">${cartTotal.toFixed(2)}</span>
          </div>
          
          <button className="relative z-10 w-full bg-green-500 text-white py-4 rounded-xl font-bold tracking-wide hover:bg-green-400 shadow-[0_8px_20px_-6px_rgba(22,163,74,0.6)] hover:shadow-[0_12px_24px_-8px_rgba(22,163,74,0.8)] hover:-translate-y-0.5 transition-all">
            Proceed to Checkout
          </button>
          
          <div className="mt-6 flex justify-center gap-4 text-indigo-300 relative z-10 opacity-70">
            <svg className="w-8 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5v-1l-3-3 1.41-1.41L11 13.67v-3.17h2v5.67l3.59-3.59L18 14.1l-5 5v1h-2z"/></svg>
            <span className="text-xs font-semibold tracking-wider">Secured via SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
