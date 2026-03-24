import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('orders/');
        // Safely extract the array if the backend utilizes pagination wrapping
        const dataArray = Array.isArray(response.data) ? response.data : response.data.results || [];
        setOrders(dataArray);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Could not load your order history. Please try connecting to the server.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-20 bg-indigo-50/20">
        <div className="text-xl font-bold text-indigo-900 animate-pulse">Loading Order History...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-[1000px] mx-auto px-4 sm:px-6 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-black tracking-tight text-indigo-950 mb-8 sm:mb-12">Order History</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 font-medium border border-red-100 shadow-sm">
          {error}
        </div>
      )}

      {(!orders || orders.length === 0) && !error ? (
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-indigo-50 p-12 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <h2 className="text-2xl font-black text-indigo-950 tracking-tight mb-2">No orders yet</h2>
          <p className="text-indigo-400 font-medium mb-8 max-w-sm">You haven't placed any orders. Start browsing our collection to find your next favorite item!</p>
          <Link to="/products" className="bg-indigo-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-800 shadow-[0_8px_20px_-6px_rgba(49,46,129,0.5)] hover:-translate-y-0.5 transition-all">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-indigo-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-indigo-950 tracking-wider">ORDER #{order.id}</span>
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                    order.status === 'completed' ? 'bg-green-100 text-green-700' :
                    order.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-indigo-100 text-indigo-700'
                  }`}>
                    {order.status || 'pending'}
                  </span>
                </div>
                
                <div className="text-indigo-400 font-medium text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Placed on {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
              
              <div className="flex flex-col md:items-end gap-1 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t border-indigo-50 md:border-t-0">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Total Amount</span>
                <span className="text-2xl font-black text-indigo-900">${Number(order.total_price || 0).toFixed(2)}</span>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
