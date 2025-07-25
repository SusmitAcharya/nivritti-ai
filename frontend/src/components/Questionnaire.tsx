import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import { ArrowLeft, ArrowRight, CheckCircle, BarChart3, Star, Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { saveQuestionnaireResponse } from '../lib/supabase';

export const Questionnaire: React.FC = () => {
  const navigate = useNavigate();
  const { user, setQuestionnaire, supabaseUser } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    digitalReadiness: {
      usesExcel: false,
      usesInventorySoftware: false,
      hasWebsite: false,
      usesDigitalPayments: false,
    },
    challenges: [] as string[],
    goals: [] as string[],
    currentTools: [] as string[],
  });

  const steps = [
    {
      title: 'Digital Readiness',
      subtitle: 'Tell us about your current digital tools',
    },
    {
      title: 'Business Challenges',
      subtitle: 'What challenges are you facing?',
    },
    {
      title: 'Your Goals',
      subtitle: 'What do you want to achieve?',
    },
    {
      title: 'Current Tools',
      subtitle: 'What tools do you currently use?',
    },
  ];

  const challengeOptions = [
    'Low sales performance',
    'Irregular inventory management',
    'Customer drop-off',
    'Cash flow issues',
    'Market competition',
    'Operational inefficiencies',
    'Staff productivity',
    'Customer retention',
  ];

  const goalOptions = [
    'Improve sales forecasting',
    'Reduce operational costs',
    'Better customer targeting',
    'Inventory optimization',
    'Increase profit margins',
    'Expand market reach',
    'Automate processes',
    'Data-driven decisions',
  ];

  const toolOptions = [
    'Microsoft Excel',
    'Google Sheets',
    'Tally ERP',
    'QuickBooks',
    'WhatsApp Business',
    'Social Media',
    'Basic Accounting Software',
    'Point of Sale System',
  ];

  const handleDigitalReadiness = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      digitalReadiness: {
        ...prev.digitalReadiness,
        [field]: value,
      },
    }));
  };

  const handleMultiSelect = (field: 'challenges' | 'goals' | 'currentTools', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!supabaseUser) {
      navigate('/login');
      return;
    }

    setSaving(true);
    try {
      const { error } = await saveQuestionnaireResponse(supabaseUser.id, formData);
      
      if (error) {
        console.error('Error saving questionnaire:', error);
        alert('Failed to save questionnaire. Please try again.');
        setSaving(false);
        return;
      }

      setQuestionnaire(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              {[
                { key: 'usesExcel', label: 'Do you use Excel for business operations?' },
                { key: 'usesInventorySoftware', label: 'Do you use any inventory management software?' },
                { key: 'hasWebsite', label: 'Does your business have a website?' },
                { key: 'usesDigitalPayments', label: 'Do you accept digital payments?' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{item.label}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDigitalReadiness(item.key, true)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        formData.digitalReadiness[item.key as keyof typeof formData.digitalReadiness]
                          ? 'bg-primary-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleDigitalReadiness(item.key, false)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        !formData.digitalReadiness[item.key as keyof typeof formData.digitalReadiness]
                          ? 'bg-gray-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {challengeOptions.map((challenge) => (
                <button
                  key={challenge}
                  onClick={() => handleMultiSelect('challenges', challenge)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    formData.challenges.includes(challenge)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{challenge}</span>
                    {formData.challenges.includes(challenge) && (
                      <CheckCircle className="h-5 w-5 text-primary-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goalOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleMultiSelect('goals', goal)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    formData.goals.includes(goal)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{goal}</span>
                    {formData.goals.includes(goal) && (
                      <CheckCircle className="h-5 w-5 text-primary-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {toolOptions.map((tool) => (
                <button
                  key={tool}
                  onClick={() => handleMultiSelect('currentTools', tool)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    formData.currentTools.includes(tool)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{tool}</span>
                    {formData.currentTools.includes(tool) && (
                      <CheckCircle className="h-5 w-5 text-primary-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex justify-center mb-4">
            <svg 
              width="64" 
              height="64" 
              viewBox="0 0 64 64" 
              className="text-terracotta-600"
            >
              {/* Soil/Ground */}
              <ellipse 
                cx="32" 
                cy="56" 
                rx="28" 
                ry="6" 
                fill="currentColor" 
                opacity="0.2"
              />
              
              {/* Main Stem */}
              <line 
                x1="32" 
                y1="56" 
                x2="32" 
                y2="28" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
              
              {/* Left Lower Leaf */}
              <path 
                d="M32 40 Q24 36 20 32 Q24 28 32 32" 
                fill="currentColor" 
                opacity="0.7"
              />
              
              {/* Right Lower Leaf */}
              <path 
                d="M32 40 Q40 36 44 32 Q40 28 32 32" 
                fill="currentColor" 
                opacity="0.7"
              />
              
              {/* Left Top Leaf */}
              <path 
                d="M32 28 Q26 20 22 16 Q26 12 32 20" 
                fill="currentColor"
              />
              
              {/* Right Top Leaf */}
              <path 
                d="M32 28 Q38 20 42 16 Q38 12 32 20" 
                fill="currentColor"
              />
              
              {/* Growth buds */}
              <circle cx="26" cy="18" r="1" fill="currentColor" opacity="0.5" />
              <circle cx="38" cy="18" r="1" fill="currentColor" opacity="0.5" />
              <circle cx="32" cy="14" r="1.5" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome, {user?.name}!
          </h2>
          <p className="text-gray-600">
            Let's customize Nivritti AI for your business needs
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <ProgressBar currentStep={currentStep + 1} totalSteps={steps.length} />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep].subtitle}
            </p>
          </div>

          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              icon={ArrowLeft}
            >
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              icon={ArrowRight}
              iconPosition="right"
              loading={saving}
              disabled={saving}
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};