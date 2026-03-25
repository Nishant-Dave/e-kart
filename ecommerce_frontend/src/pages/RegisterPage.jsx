import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../services/auth';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const names = fullName.trim().split(' ');
      const firstName = names[0];
      const lastName = names.slice(1).join(' ');

      await registerUser({ 
        email, 
        password, 
        first_name: firstName, 
        last_name: lastName 
      });

      await loginUser({ email, password });
      navigate('/products');
    } catch (err) {
      if (err.response && err.response.data) {
        const errors = err.response.data;
        const msg = errors.email?.[0] || errors.password?.[0] || errors.non_field_errors?.[0] || 'Registration failed.';
        setError(msg);
      } else {
        setError('Network error. Please try running the backend server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-indigo-50/50 py-20 px-4">
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-indigo-50 max-w-md w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <h1 className="text-3xl font-black tracking-tight text-indigo-950 mb-2 relative z-10">Create account</h1>
        <p className="text-sm font-medium text-indigo-400 mb-8 relative z-10">Join e-Kart and start curating your collection.</p>
        
        {error && (
          <div className="bg-red-50/80 text-red-600 text-sm p-4 rounded-xl mb-6 border border-red-100 font-medium relative z-10">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4 relative z-10" onSubmit={handleRegister}>
          <div>
            <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Full Name</label>
            <input 
              type="text" 
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-indigo-50/30 border border-indigo-100 text-indigo-900 text-sm px-5 py-3.5 rounded-xl outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all font-medium placeholder-indigo-300"
              placeholder="Jane Doe"
            />
          </div>
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
            <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Password <span className="text-indigo-300 font-normal lowercase">(Min 8 chars)</span></label>
            <input 
              type="password" 
              required
              minLength={8}
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
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-sm font-medium text-indigo-400 mt-8 text-center relative z-10">
          Already have an account? <Link to="/login" className="text-indigo-900 font-bold hover:text-indigo-700 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
