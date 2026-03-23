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
      // Split full name into first and last name for backend
      const names = fullName.trim().split(' ');
      const firstName = names[0];
      const lastName = names.slice(1).join(' ');

      // Register the user
      await registerUser({ 
        email, 
        password, 
        first_name: firstName, 
        last_name: lastName 
      });

      // Automatically log them in after successful registration
      await loginUser({ email, password });
      
      // Navigate to products UI
      navigate('/products');
    } catch (err) {
      if (err.response && err.response.data) {
        // Extract specific validation errors from the backend dict
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
    <div className="flex-1 flex items-center justify-center bg-gray-50 py-20 px-4">
      <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 max-w-md w-full">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Create an account</h1>
        <p className="text-sm text-gray-500 mb-6">Join Atelier and start curating your collection.</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleRegister}>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
            <input 
              type="text" 
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm px-4 py-3 rounded-md outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-400"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm px-4 py-3 rounded-md outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Password (Min 8 characters)</label>
            <input 
              type="password" 
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm px-4 py-3 rounded-md outline-none focus:border-black focus:ring-1 focus:ring-black placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full bg-black text-white px-4 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors shadow-md mt-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account? <Link to="/login" className="text-black font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
