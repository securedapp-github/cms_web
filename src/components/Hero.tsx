import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Consent Management System<br />
            <span className="text-orange-500">DPDP Act, 2023 Compliant</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            A modular, secure, and user-centric platform enabling Data Principals to manage
            their consent lifecycle and Data Fiduciaries to integrate consent processes
            seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2 text-lg font-semibold shadow-lg hover:shadow-xl">
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/signin" className="bg-white text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all border-2 border-gray-200 text-lg font-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
