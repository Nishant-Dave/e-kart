import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/products');
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMsg = err.response.data.detail || err.response.data.non_field_errors?.[0] || 'Invalid email or password.';
        setError(errorMsg);
      } else {
        setError('Network error. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-indigo-50/50 py-20 px-4">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-indigo-50 max-w-md w-full relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <h1 className="text-3xl font-black tracking-tight text-indigo-950 mb-2 relative z-10">Sign in</h1>
        <p className="text-sm font-medium text-indigo-400 mb-8 relative z-10">Welcome back to your e-Kart account.</p>
        
        {error && (
          <div className="bg-red-50/80 text-red-600 text-sm p-4 rounded-xl mb-6 border border-red-100 font-medium relative z-10">
            {error}
          </div>
        )}
        
        <form className="flex flex-col gap-5 relative z-10" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-indigo-50/30 border border-indigo-100 text-indigo-900 text-sm px-5 py-3.5 rounded-xl outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all font-medium placeholder-indigo-300"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-indigo-50/30 border border-indigo-100 text-indigo-900 text-sm px-5 py-3.5 rounded-xl outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all font-medium placeholder-indigo-300"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full bg-indigo-900 text-white px-5 py-4 rounded-xl font-bold tracking-wide hover:bg-indigo-800 shadow-[0_8px_20px_-6px_rgba(49,46,129,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(49,46,129,0.6)] hover:-translate-y-0.5 transition-all mt-4 ${isLoading ? 'opacity-70 cursor-not-allowed transform-none' : ''}`}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <p className="text-sm font-medium text-indigo-400 mt-8 text-center relative z-10">
          Don't have an account? <Link to="/register" className="text-indigo-900 font-bold hover:text-indigo-700 hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
