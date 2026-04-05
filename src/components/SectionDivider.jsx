import React from 'react';

const SectionDivider = ({ label = "THREATS" }) => {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-6 flex items-center justify-center">
      {/* Line Left */}
      <div className="flex-1 h-[1px] bg-primary-500 opacity-20"></div>
      
      {/* Badge container with side lines to connect */}
      <div className="flex items-center">
        <div className="w-6 h-[1px] bg-primary-500 opacity-20"></div>
        <div 
          className="mx-0 px-10 py-3 rounded-full border border-primary-500/30 bg-white shadow-sm flex items-center justify-center relative group"
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-primary-500/5 rounded-full"></div>
          
          <span className="text-primary-600 text-xs font-black tracking-[0.5em] uppercase relative z-10">
            {label}
          </span>
        </div>
        <div className="w-6 h-[1px] bg-primary-500 opacity-20"></div>
      </div>
      
      {/* Line Right */}
      <div className="flex-1 h-[1px] bg-primary-500 opacity-20"></div>
    </div>
  );
};

export default SectionDivider;
