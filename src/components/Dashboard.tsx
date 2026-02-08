import { useState } from 'react';
import RequestDemoModal from './RequestDemoModal';

export default function Dashboard() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Consent & Preference Management Is Essential for DPDPA Compliance
          </h2>
          <p className="text-xl text-blue-100 leading-relaxed">
            A robust Consent Management System like <span className="font-semibold">SecureCMS</span> enables
            organizations to collect, manage, and honor user consent transparently while meeting the
            requirements of India's Digital Personal Data Protection Act (DPDPA) and global privacy laws.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-default group">
              <div className="text-5xl font-bold mb-2 group-hover:text-blue-200 transition-colors">10K+</div>
              <div className="text-blue-100 group-hover:text-white transition-colors">Consents Managed</div>
            </div>
            <div className="p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-default group">
              <div className="text-5xl font-bold mb-2 group-hover:text-blue-200 transition-colors">99.9%</div>
              <div className="text-blue-100 group-hover:text-white transition-colors">Uptime Guarantee</div>
            </div>
            <div className="p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-default group">
              <div className="text-5xl font-bold mb-2 group-hover:text-blue-200 transition-colors">100%</div>
              <div className="text-blue-100 group-hover:text-white transition-colors">DPDP Compliant</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Request a Demo
          </button>
        </div>
      </div>

      <RequestDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </section>
  );
}
