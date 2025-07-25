import React from 'react';
import { Navbar } from './Navbar';
import { Button } from './ui/Button';
import { 
  BarChart3, 
  Upload, 
  Eye, 
  Target, 
  HelpCircle, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart,
  LogOut,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, logout, questionnaire } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!questionnaire ? (
          /* Getting Started Section - Before Questionnaire */
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white mb-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold mb-2">Let's Set Up Your Dashboard</h2>
            <p className="text-primary-100 mb-6">
              Answer a few quick questions to personalize your AI dashboard and get insights tailored to your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                onClick={() => navigate('/upload')}
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-50 hover:scale-105 hover:shadow-lg transition-all duration-200"
              >
                Start Setup (2 minutes)
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/help')}
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-600 hover:scale-105 transition-all duration-200"
              >
                Help / FAQ
              </Button>
            </div>
          </div>
        ) : (
          /* Welcome Section - After Questionnaire */
          <>
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white mb-8 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <h2 className="text-2xl font-bold mb-2">Welcome to Your AI Dashboard</h2>
              <p className="text-primary-100 mb-6">
                Based on your responses, here's your personalized business intelligence dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="secondary"
                  icon={Upload}
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-50 hover:scale-105 hover:shadow-lg transition-all duration-200"
                >
                  Upload Business Data (CSV)
                </Button>
                <Button
                  variant="outline"
                  icon={HelpCircle}
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-600 hover:scale-105 transition-all duration-200"
                >
                  Help / FAQ
                </Button>
              </div>
            </div>

            {/* Stats Grid - Only show after questionnaire */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Projected Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">₹2,45,000</p>
                    <p className="text-sm text-green-600 mt-1 group-hover:text-green-700 transition-colors duration-200">Based on your sector</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Target Customers</p>
                    <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">1,847</p>
                    <p className="text-sm text-blue-600 mt-1 group-hover:text-blue-700 transition-colors duration-200">Market potential</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Monthly Orders</p>
                    <p className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">3,247</p>
                    <p className="text-sm text-purple-600 mt-1 group-hover:text-purple-700 transition-colors duration-200">Estimated volume</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                    <ShoppingCart className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-200">Growth Potential</p>
                    <p className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">15.2%</p>
                    <p className="text-sm text-orange-600 mt-1 group-hover:text-orange-700 transition-colors duration-200">AI prediction</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {questionnaire ? 'Revenue Trend' : 'Business Analytics'}
            </h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-200">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4 group-hover:text-primary-500 group-hover:scale-110 transition-all duration-300" />
                <p className="text-gray-500">
                  {questionnaire ? 'Sample Chart Area' : 'Analytics Dashboard'}
                </p>
                <p className="text-sm text-gray-400">
                  {questionnaire ? 'Upload data to see real insights' : 'Complete setup to see insights'}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {questionnaire ? 'Customer Distribution' : 'Data Visualization'}
            </h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 group-hover:scale-110 transition-all duration-300">
                  <Users className="h-8 w-8 text-primary-500 group-hover:text-primary-600" />
                </div>
                <p className="text-gray-500">
                  {questionnaire ? 'Sample Pie Chart' : 'Visual Reports'}
                </p>
                <p className="text-sm text-gray-400">
                  {questionnaire ? 'Upload data to see real insights' : 'Complete setup to see insights'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 group-hover:scale-110 transition-all duration-300">
                <Eye className="h-8 w-8 text-primary-500 group-hover:text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">View Insights</h3>
              <p className="text-gray-600 mb-4">
                Get AI-powered insights from your business data
              </p>
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/insights')}
                className="group-hover:border-primary-500 group-hover:text-primary-600 transition-all duration-200"
              >
                {questionnaire ? 'View Insights' : 'Complete Setup First'}
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-200 group-hover:scale-110 transition-all duration-300">
                <Target className="h-8 w-8 text-accent-600 group-hover:text-accent-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Prediction</h3>
              <p className="text-gray-600 mb-4">
                Get forecasts and predictions for your business
              </p>
              <Button
                variant="outline"
                fullWidth
                className="group-hover:border-accent-600 group-hover:text-accent-600 transition-all duration-200"
              >
                {questionnaire ? 'Coming Soon' : 'Complete Setup First'}
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                <HelpCircle className="h-8 w-8 text-green-600 group-hover:text-green-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Support</h3>
              <p className="text-gray-600 mb-4">
                Need help? Contact our support team
              </p>
              <Button
                variant="outline"
                fullWidth
                className="group-hover:border-green-600 group-hover:text-green-600 transition-all duration-200"
                onClick={() => navigate('/help')}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};