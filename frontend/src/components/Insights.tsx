import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Button } from './ui/Button';
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  Download,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// Sample data - will be replaced with real data from uploads
const salesForecastData = [
  { date: '2024-01-01', actual: 45000, predicted: null },
  { date: '2024-01-02', actual: 52000, predicted: null },
  { date: '2024-01-03', actual: 48000, predicted: null },
  { date: '2024-01-04', actual: 61000, predicted: null },
  { date: '2024-01-05', actual: 55000, predicted: null },
  { date: '2024-01-06', actual: 67000, predicted: null },
  { date: '2024-01-07', actual: 59000, predicted: null },
  { date: '2024-01-08', actual: null, predicted: 62000 },
  { date: '2024-01-09', actual: null, predicted: 58000 },
  { date: '2024-01-10', actual: null, predicted: 65000 },
  { date: '2024-01-11', actual: null, predicted: 71000 },
  { date: '2024-01-12', actual: null, predicted: 68000 },
  { date: '2024-01-13', actual: null, predicted: 74000 },
  { date: '2024-01-14', actual: null, predicted: 69000 },
];

const customerSegmentData = [
  { name: 'High Value', value: 25, count: 450, color: '#10B981' },
  { name: 'Regular', value: 45, count: 810, color: '#3B82F6' },
  { name: 'At Risk', value: 20, count: 360, color: '#F59E0B' },
  { name: 'Lost', value: 10, count: 180, color: '#EF4444' },
];

const churnPredictionData = [
  { id: 'CUST001', name: 'Rajesh Electronics', churnRisk: 85, lastPurchase: '2023-11-15', value: '₹45,000' },
  { id: 'CUST002', name: 'Sharma Textiles', churnRisk: 72, lastPurchase: '2023-12-02', value: '₹32,000' },
  { id: 'CUST003', name: 'Kumar Trading', churnRisk: 68, lastPurchase: '2023-11-28', value: '₹28,500' },
  { id: 'CUST004', name: 'Das Enterprises', churnRisk: 61, lastPurchase: '2023-12-10', value: '₹19,200' },
  { id: 'CUST005', name: 'Patel Industries', churnRisk: 58, lastPurchase: '2023-12-05', value: '₹41,800' },
  { id: 'CUST006', name: 'Singh Motors', churnRisk: 54, lastPurchase: '2023-12-12', value: '₹67,300' },
  { id: 'CUST007', name: 'Gupta Retail', churnRisk: 49, lastPurchase: '2023-12-08', value: '₹15,600' },
  { id: 'CUST008', name: 'Agarwal Stores', churnRisk: 43, lastPurchase: '2023-12-14', value: '₹23,400' },
];

export const Insights: React.FC = () => {
  const navigate = useNavigate();
  const [hasData, setHasData] = useState(true); // Set to false initially for blank state
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleExport = (type: string) => {
    // Simulate export functionality
    alert(`Exporting ${type} data...`);
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return 'text-red-600 bg-red-50';
    if (risk >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getRiskLabel = (risk: number) => {
    if (risk >= 70) return 'High Risk';
    if (risk >= 50) return 'Medium Risk';
    return 'Low Risk';
  };

  if (!hasData) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard')}
                  icon={ArrowLeft}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Back to Dashboard
                </Button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-lg font-semibold text-gray-900">AI Insights</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Empty State */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <TrendingUp className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Data Available</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Upload your business data to see AI-powered insights including sales forecasts, 
              customer segmentation, and churn predictions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/upload')}
                icon={TrendingUp}
                size="lg"
              >
                Upload Business Data
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/help')}
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Page Header with Controls */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">AI Insights</h1>
            <div className="flex items-center space-x-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                loading={refreshing}
                icon={RefreshCw}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Forecast Accuracy</p>
                <p className="text-2xl font-bold text-green-600">94.2%</p>
                <p className="text-sm text-green-600 mt-1">↑ 2.1% from last period</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High-Risk Customers</p>
                <p className="text-2xl font-bold text-red-600">23</p>
                <p className="text-sm text-red-600 mt-1">Require immediate attention</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Customer Segments</p>
                <p className="text-2xl font-bold text-blue-600">4</p>
                <p className="text-sm text-blue-600 mt-1">Active segments identified</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Forecast Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sales Forecast</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('forecast')}
                icon={Download}
              >
                Export
              </Button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesForecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`₹${value?.toLocaleString()}`, name === 'actual' ? 'Actual Sales' : 'Predicted Sales']}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Actual Sales"
                    connectNulls={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    name="Predicted Sales"
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Segmentation Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Customer Segmentation</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('segments')}
                icon={Download}
              >
                Export
              </Button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {customerSegmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {customerSegmentData.map((segment) => (
                <div key={segment.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="text-sm text-gray-600">
                    {segment.name}: {segment.count} customers
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Churn Predictions Table */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Customer Churn Predictions</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('churn')}
                icon={Download}
              >
                Export
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Churn Risk
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Purchase
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {churnPredictionData.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(customer.churnRisk)}`}>
                          {customer.churnRisk}%
                        </span>
                        <span className="text-sm text-gray-600">
                          {getRiskLabel(customer.churnRisk)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(customer.lastPurchase).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {customer.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-primary-600 border-primary-600 hover:bg-primary-50"
                      >
                        Contact
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Recommendations */}
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">📈 Sales Optimization</h4>
              <p className="text-sm text-gray-600">
                Focus marketing efforts on Tuesdays and Fridays when sales typically peak. 
                Consider promotional campaigns during predicted low-sales periods.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">🎯 Customer Retention</h4>
              <p className="text-sm text-gray-600">
                Reach out to high-risk customers with personalized offers. 
                23 customers need immediate attention to prevent churn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};