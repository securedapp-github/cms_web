import React, { forwardRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, showPasswordToggle, type, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = showPasswordToggle && showPassword ? 'text' : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={`
              w-full px-4 py-2.5 
              ${icon ? 'pl-10' : ''} 
              ${showPasswordToggle ? 'pr-10' : ''}
              border rounded-lg 
              ${error 
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                : isFocused
                ? 'border-secondary-500 ring-2 ring-secondary-500/20'
                : 'border-gray-300 focus:border-secondary-500'
              }
              focus:outline-none focus:ring-2 focus:ring-secondary-500/20
              disabled:bg-gray-100 disabled:cursor-not-allowed
              transition-all duration-200
              ${className}
            `}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          
          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          )}
        </div>
        
        {error && (
          <p className="mt-1.5 text-sm text-rose-500 animate-slide-down">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
