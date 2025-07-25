import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { BarChart3, TrendingUp, Users, ArrowRight } from 'lucide-react';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-terracotta-600 tracking-wide">Nivritti AI</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/login')}
            className=""
          >
            Login
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/signup')}
            className="hidden sm:inline-flex"
          >
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Empowering SMEs with
            <span className="text-primary-500 block mt-2">Affordable AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your business decisions with AI-powered insights tailored for 
            small and medium enterprises in Kolkata and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              icon={ArrowRight}
              iconPosition="right"
              className="animate-bounce-subtle hover:scale-105 transition-all duration-200"
            >
              Get Started for Free
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 animate-slide-up">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 group-hover:scale-110 transition-all duration-300">
              <TrendingUp className="h-6 w-6 text-primary-500 group-hover:text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">Smart Analytics</h3>
            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
              Get actionable insights from your business data with our AI-powered analytics platform.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-200 group-hover:scale-110 transition-all duration-300">
              <BarChart3 className="h-6 w-6 text-accent-600 group-hover:text-accent-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors duration-200">Easy Integration</h3>
            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
              Upload your existing data and get insights in minutes, not months.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 group-hover:scale-110 transition-all duration-300">
              <Users className="h-6 w-6 text-primary-500 group-hover:text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">Local Support</h3>
            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
              Dedicated support team understanding the unique challenges of Kolkata SMEs.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We believe every small business deserves access to powerful AI insights. 
              Nivritti AI democratizes business intelligence for SMEs in Kolkata and beyond, 
              making data-driven decisions affordable and accessible for everyone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                <p className="text-gray-600">SMEs Served</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">₹2.5Cr+</div>
                <p className="text-gray-600">Revenue Optimized</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">95%</div>
                <p className="text-gray-600">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Trusted by SMEs Across Kolkata</h3>
            <p className="text-xl text-gray-600">See what our customers say about Nivritti AI</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-600 mb-6 italic text-lg leading-relaxed">
                "Nivritti AI helped us predict our inventory needs perfectly. We reduced wastage by 30% 
                and increased profits significantly. The insights are so easy to understand!"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  R
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 text-lg">Rajesh Kumar</p>
                  <p className="text-gray-500">Owner, Kumar Electronics</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-600 mb-6 italic text-lg leading-relaxed">
                "As a small textile business, understanding customer patterns was impossible before. 
                Now we know exactly when to stock which products. Game changer!"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  P
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 text-lg">Priya Sharma</p>
                  <p className="text-gray-500">Founder, Sharma Textiles</p>
                </div>
              </div>
            </div>
            {/* Review 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-600 mb-6 italic text-lg leading-relaxed">
                "The customer churn predictions saved our restaurant business. We identified at-risk 
                customers and retained 80% of them with targeted offers. Incredible ROI!"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 text-lg">Amit Das</p>
                  <p className="text-gray-500">Owner, Das Family Restaurant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};