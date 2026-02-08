import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen relative" style={{
      background: 'linear-gradient(135deg, #EEF2FF 0%, #FFFFFF 50%, #E0E7FF 100%)'
    }}>
      {/* Decorative Circles with inline styles for visibility */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute rounded-full animate-blob"
          style={{
            top: '5rem',
            right: '2rem',
            width: '20rem',
            height: '20rem',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 100%)',
            filter: 'blur(40px)'
          }}
        ></div>
        <div 
          className="absolute rounded-full animate-blob animation-delay-2000"
          style={{
            bottom: '8rem',
            left: '3rem',
            width: '24rem',
            height: '24rem',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.03) 50%, transparent 100%)',
            filter: 'blur(40px)',
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute rounded-full animate-blob animation-delay-4000"
          style={{
            top: '50%',
            right: '30%',
            width: '18rem',
            height: '18rem',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%)',
            filter: 'blur(40px)',
            animationDelay: '4s'
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 border-b shadow-sm" style={{
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderColor: 'rgba(226, 232, 240, 0.8)'
      }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          <Logo size="lg" />
          <div className="flex items-center gap-3">
            <Link to="/login" className="group">
              <Button variant="ghost" size="sm" className="relative overflow-hidden">
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            <Link to="/signup" className="group">
              <Button variant="primary" size="sm" className="relative overflow-hidden">
                <span className="relative z-10">Get Started</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pt-20 pb-16 text-center lg:pt-32">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-900 mb-6 animate-slide-up">
            Consent Management System
            <br />
            <span className="gradient-text">DPDP Act, 2023 Compliant</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A modular, secure, and user-centric platform enabling Data Principals to manage their consent lifecycle and Data Fiduciaries to integrate consent processes seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/signup">
              <Button variant="primary" size="lg" className="gap-2 group">
                Start Your Journey
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
            <div className="glass-effect rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="h-14 w-14 bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold text-primary-900 mb-3">
                DPDP Act Compliant
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ensures verifiability, auditability, and privacy compliance as per the Digital Personal Data Protection Act, 2023.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="h-14 w-14 bg-linear-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold text-primary-900 mb-3">
                Seamless Integration
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Modular architecture enabling Data Fiduciaries to integrate consent processes efficiently and securely.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="h-14 w-14 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Lock className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold text-primary-900 mb-3">
                User-Centric Design
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Empowers Data Principals to manage their entire consent lifecycle with complete control and transparency.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 mt-20 border-t relative z-10" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(8px)',
        borderColor: 'rgba(226, 232, 240, 0.8)'
      }}>
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Consent Management System. DPDP Act, 2023 Compliant.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
