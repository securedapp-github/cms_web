import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2 cursor-pointer group ${className}`}>
      <span className={`font-bold text-black ${textSizeClasses[size]}`}>
        Secure
      </span>
      <div className="bg-black rounded-full px-4 py-2 flex items-center">
        <span className={`font-bold text-white ${textSizeClasses[size]}`}>
          CMS
        </span>
      </div>
    </div>
  );
};

export default Logo;
