import React from 'react';
import { DivideIcon as LucideIcon, Check, X } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  fullWidth?: boolean;
  showPasswordStrength?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon: Icon,
  fullWidth = true,
  showPasswordStrength = false,
  className = '',
  value,
  ...props
}) => {
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, text: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score < 2) return { score, text: 'Weak', color: 'text-red-500', bgColor: 'bg-red-500' };
    if (score < 4) return { score, text: 'Fair', color: 'text-yellow-500', bgColor: 'bg-yellow-500' };
    if (score < 5) return { score, text: 'Good', color: 'text-blue-500', bgColor: 'bg-blue-500' };
    return { score, text: 'Strong', color: 'text-green-500', bgColor: 'bg-green-500' };
  };

  const passwordStrength = showPasswordStrength && props.type === 'password' && value 
    ? getPasswordStrength(value as string) 
    : null;

  const inputClasses = `
    w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors duration-200
    ${Icon ? 'pl-12' : ''}
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
    ${className}
  `.trim();

  return (
    <div className={`${fullWidth ? 'w-full' : ''} space-y-1`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <input
          className={inputClasses}
          value={value}
          {...props}
        />
      </div>
      
      {/* Password Strength Indicator */}
      {passwordStrength && (
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Password strength:</span>
            <span className={`text-sm font-medium ${passwordStrength.color}`}>
              {passwordStrength.text}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.bgColor}`}
              style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              {(value as string)?.length >= 8 ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <X className="h-3 w-3 text-red-500" />
              )}
              <span>8+ characters</span>
            </div>
            <div className="flex items-center space-x-1">
              {/[A-Z]/.test(value as string || '') ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <X className="h-3 w-3 text-red-500" />
              )}
              <span>Uppercase letter</span>
            </div>
            <div className="flex items-center space-x-1">
              {/[a-z]/.test(value as string || '') ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <X className="h-3 w-3 text-red-500" />
              )}
              <span>Lowercase letter</span>
            </div>
            <div className="flex items-center space-x-1">
              {/\d/.test(value as string || '') ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <X className="h-3 w-3 text-red-500" />
              )}
              <span>Number</span>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};