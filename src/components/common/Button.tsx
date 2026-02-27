import React, { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'bg-linear-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 focus:ring-blue-500 shadow-lg hover:shadow-2xl',
      secondary: 'bg-linear-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 focus:ring-amber-400 shadow-lg hover:shadow-2xl',
      outline: 'border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-black focus:ring-primary-500 shadow-sm hover:shadow-lg',
      ghost: 'text-gray-700 hover:text-blue-700 hover:bg-blue-50 focus:ring-blue-500 font-medium',
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
