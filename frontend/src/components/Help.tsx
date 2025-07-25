import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { 
  ArrowLeft, 
  Search, 
  HelpCircle, 
  BookOpen, 
  MessageCircle, 
  Mail,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Help: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const faqs = [
    {
      question: "What does SmartBizAI do?",
      answer: "SmartBizAI is an AI-powered business intelligence platform designed specifically for small and medium enterprises (SMEs). It helps you analyze your business data, predict sales trends, identify customer segments, and make data-driven decisions to grow your business."
    },
    {
      question: "How is my data used and protected?",
      answer: "Your data security is our top priority. All data is encrypted in transit and at rest. We use industry-standard security measures and never share your business data with third parties. Your data is used solely to generate insights for your business."
    },
    {
      question: "What is demand forecasting?",
      answer: "Demand forecasting uses AI algorithms to predict future sales based on your historical data, seasonal trends, and market patterns. This helps you plan inventory, staffing, and marketing campaigns more effectively."
    },
    {
      question: "What file formats can I upload?",
      answer: "You can upload data in CSV, Excel (.xls, .xlsx) formats. We recommend including columns like Date, Revenue, Customer ID, Product, Quantity, etc. Maximum file size is 10MB."
    },
    {
      question: "How accurate are the AI predictions?",
      answer: "Our AI models typically achieve 85-95% accuracy for sales forecasting and 80-90% for customer churn prediction. Accuracy improves with more historical data and regular updates."
    },
    {
      question: "Can I export my insights and reports?",
      answer: "Yes, you can export all insights, charts, and reports in PDF or CSV format. This makes it easy to share findings with your team or use in presentations."
    },
    {
      question: "What if I need help with data preparation?",
      answer: "We provide sample CSV templates and detailed guides on data preparation. Our support team is also available to help you format your data correctly for optimal results."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, SmartBizAI is available as a web application that works on all devices. A dedicated mobile app is planned for future release."
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <HelpCircle className="h-16 w-16 text-primary-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions, learn about our features, or get in touch with our support team.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
            <BookOpen className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Getting Started Guide</h3>
            <p className="text-gray-600 text-sm">Learn how to set up your account and upload your first dataset.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
            <HelpCircle className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Feature Overview</h3>
            <p className="text-gray-600 text-sm">Discover all the AI-powered features available in SmartBizAI.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
            <MessageCircle className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
            <p className="text-gray-600 text-sm">Watch step-by-step video guides for common tasks.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Mail className="h-6 w-6 text-primary-500 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Contact Support</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
          </p>
          
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Your Name"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder="Enter your name"
                required
              />
              
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <Input
              label="Subject"
              name="subject"
              value={contactForm.subject}
              onChange={handleContactChange}
              placeholder="What's this about?"
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe your issue or question in detail..."
                required
              />
            </div>
            
            <Button type="submit" icon={Mail}>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};