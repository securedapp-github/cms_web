import React from 'react';
import type { ReactNode } from 'react';
import Logo from '../common/Logo';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col relative" style={{
      background: 'linear-gradient(135deg, #F0F4FF 0%, #FFFFFF 50%, #E0E7FF 100%)'
    }}>
      {/* Decorative Circle with inline style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute rounded-full animate-blob"
          style={{
            top: '3rem',
            right: '3rem',
            width: '28rem',
            height: '28rem',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 100%)',
            filter: 'blur(50px)'
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Logo size="md" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Title Section */}
          {(title || subtitle) && (
            <div className="text-center mb-8 animate-slide-up">
              {title && (
                <h1 className="text-3xl font-display font-bold text-primary-900 mb-2">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-gray-600">{subtitle}</p>
              )}
            </div>
          )}

          {/* Card */}
          <div className="glass-effect rounded-2xl p-8 animate-fade-in">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Consent Management System. DPDP Act, 2023 Compliant.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
