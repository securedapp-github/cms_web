import React from 'react';
import { Building2 } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 cursor-pointer group ${className}`}>
      <div className="relative p-2.5 bg-linear-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 ">
        <Building2 className={`${sizeClasses[size]} text-white`} strokeWidth={2.5} />
        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-linear-to-br from-amber-400 to-orange-500 rounded-full border-2 border-white shadow-md animate-pulse" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-bold text-primary-900 ${textSizeClasses[size]} leading-none group-hover:text-blue-700 transition-colors duration-300`}>
            Secure <span className="gradient-text">CMS</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
