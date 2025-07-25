import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Mail, Lock, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { signIn, signInWithGoogle } from '../lib/supabase';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, loading: appLoading } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const { data, error } = await signIn(formData.email, formData.password);

      if (error) {
        setErrors({ email: error.message });
        setLoading(false);
        return;
      }

      if (data.user) {
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors({ email: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrors({ email: error.message });
      }
    } catch (error) {
      setErrors({ email: 'Failed to sign in with Google' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (appLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 48 48" 
              className="text-terracotta-600"
            >
              {/* Soil/Ground */}
              <ellipse 
                cx="24" 
                cy="42" 
                rx="20" 
                ry="4" 
                fill="currentColor" 
                opacity="0.2"
              />
              
              {/* Main Stem */}
              <line 
                x1="24" 
                y1="42" 
                x2="24" 
                y2="21" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              
              {/* Left Lower Leaf */}
              <path 
                d="M24 30 Q18 27 15 24 Q18 21 24 24" 
                fill="currentColor" 
                opacity="0.7"
              />
              
              {/* Right Lower Leaf */}
              <path 
                d="M24 30 Q30 27 33 24 Q30 21 24 24" 
                fill="currentColor" 
                opacity="0.7"
              />
              
              {/* Left Top Leaf */}
              <path 
                d="M24 21 Q19 15 16 12 Q19 9 24 15" 
                fill="currentColor"
              />
              
              {/* Right Top Leaf */}
              <path 
                d="M24 21 Q29 15 32 12 Q29 9 24 15" 
                fill="currentColor"
              />
              
              {/* Growth buds */}
              <circle cx="20" cy="13" r="0.8" fill="currentColor" opacity="0.5" />
              <circle cx="28" cy="13" r="0.8" fill="currentColor" opacity="0.5" />
              <circle cx="24" cy="10" r="1" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your Nivritti AI account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            placeholder="Enter your email"
            error={errors.email}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            icon={Lock}
            placeholder="Enter your password"
            error={errors.password}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            fullWidth
            loading={loading}
            className="mt-8"
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
        </div>

        {/* Social Login */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            fullWidth
            className="text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            fullWidth
            className="text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};