import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { User, Building, Mail, Lock, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { signUp, signInWithGoogle } from '../lib/supabase';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, loading: appLoading } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    password: '',
    businessSector: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const businessSectors = [
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'logistics', label: 'Logistics' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'other', label: 'Other' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.businessSector) newErrors.businessSector = 'Please select a business sector';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const { data, error } = await signUp(formData.email, formData.password, {
        name: formData.name,
        businessName: formData.businessName,
        businessSector: formData.businessSector
      });

      if (error) {
        setErrors({ email: error.message });
        setLoading(false);
        return;
      }

      if (data.user) {
        setUser(formData);
        navigate('/questionnaire');
      }
    } catch (error) {
      setErrors({ email: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrors({ email: error.message });
      }
    } catch (error) {
      setErrors({ email: 'Failed to sign up with Google' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Join Nivritti AI</h1>
          <p className="text-gray-600">Start your AI-powered business journey today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon={User}
            placeholder="Enter your full name"
            error={errors.name}
          />

          <Input
            label="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            icon={Building}
            placeholder="Enter your business name"
            error={errors.businessName}
          />

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
            placeholder="Create a secure password"
            error={errors.password}
            showPasswordStrength={true}
          />

          <Select
            label="Business Sector"
            name="businessSector"
            value={formData.businessSector}
            onChange={handleChange}
            options={businessSectors}
            error={errors.businessSector}
          />

          <Button
            type="submit"
            onClick={handleGoogleSignUp}
            fullWidth
            loading={loading}
            className="mt-8"
          >
            Create Account
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};