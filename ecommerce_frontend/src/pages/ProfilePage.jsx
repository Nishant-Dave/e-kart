import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    city: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: ''
  });
  const [savingPassword, setSavingPassword] = useState(false);
  const [passSuccessMsg, setPassSuccessMsg] = useState('');
  const [passErrorMsg, setPassErrorMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('auth/profile/');
        // Pre-fill the form with existing user data
        const data = response.data;
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone_number: data.phone_number || '',
          city: data.city || ''
        });
      } catch (err) {
        console.error('Failed to load profile details:', err);
        setErrorMsg('Failed to load your profile information. Please reload the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await api.put('auth/profile/', formData);
      setSuccessMsg('Your profile has been updated successfully!');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      console.error('Failed to update profile:', err);
      // Try to parse backend errors natively
      const errResponse = err.response?.data;
      if (errResponse) {
        const firstErrorKey = Object.keys(errResponse)[0];
        setErrorMsg(`${firstErrorKey}: ${errResponse[firstErrorKey]}`);
      } else {
        setErrorMsg('Failed to update your profile. Please check your network and try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSavingPassword(true);
    setPassErrorMsg('');
    setPassSuccessMsg('');

    try {
      await api.post('auth/change-password/', passwordData);
      setPassSuccessMsg('Your password has been changed successfully!');
      setPasswordData({ old_password: '', new_password: '' });
      setTimeout(() => setPassSuccessMsg(''), 5000);
    } catch (err) {
      console.error('Failed to change password:', err);
      const errResponse = err.response?.data;
      if (errResponse) {
        if (errResponse.old_password) setPassErrorMsg(errResponse.old_password[0]);
        else if (errResponse.new_password) setPassErrorMsg(errResponse.new_password[0]);
        else setPassErrorMsg('Failed to update password.');
      } else {
        setPassErrorMsg('Network error occurred.');
      }
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 w-full bg-slate-50 min-h-[70vh] flex items-center justify-center">
        <div className="text-slate-500 font-medium">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-slate-50 py-16 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Your Profile</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your personal information and contact details.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-10">
          {successMsg && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl font-medium text-sm">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl font-medium text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-medium"
                  placeholder="Jane"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-medium"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl px-4 py-3 cursor-not-allowed font-medium"
              />
              <p className="text-xs text-slate-400 mt-2 font-medium">Your email address cannot be changed natively just yet.</p>
            </div>

            <div className="border-t border-slate-100 my-2 pt-2"></div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-medium"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
              <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-medium"
                placeholder="New York"
              />
            </div>

            <button 
              type="submit" 
              disabled={saving}
              className={`w-full mt-4 bg-indigo-950 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-900/20 hover:bg-indigo-900 hover:shadow-indigo-900/30 transition-all tracking-wide ${saving ? 'opacity-75 cursor-wait' : ''}`}
            >
              {saving ? 'Saving Changes...' : 'Save Profile'}
            </button>
          </form>
        </div>

        {/* Password Change Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-10 mt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Change Password</h2>
          
          {passSuccessMsg && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl font-medium text-sm">
              {passSuccessMsg}
            </div>
          )}
          {passErrorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl font-medium text-sm">
              {passErrorMsg}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
              <input 
                type="password" 
                name="old_password"
                value={passwordData.old_password}
                onChange={handlePasswordChange}
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-medium"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">New Password (Min 8 characters)</label>
              <input 
                type="password" 
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                required
                minLength="8"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-medium"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={savingPassword}
              className={`w-full sm:w-auto self-start bg-slate-900 text-white font-bold py-3 px-8 rounded-xl shadow-sm hover:bg-slate-800 transition-all tracking-wide ${savingPassword ? 'opacity-75 cursor-wait' : ''}`}
            >
              {savingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
