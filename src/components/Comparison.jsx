import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck } from 'lucide-react';

const comparisonData = [
  { feature: "Built-in DPDP compliance (India)", secure: true, manual: false, generic: false },
  { feature: "Real-time, immutable audit logs", secure: true, manual: false, generic: false },
  { feature: "Automated User Rights portal", secure: true, manual: false, generic: false },
  { feature: "Multi-lingual consent forms", secure: true, manual: true, generic: true },
  { feature: "Instant <24h deployment", secure: true, manual: false, generic: true },
  { feature: "API-driven preference sync", secure: true, manual: false, generic: true },
  { feature: "Cryptographically signed records", secure: true, manual: false, generic: false },
  { feature: "Data stored in Indian data centers", secure: true, manual: true, generic: false },
];

const Comparison = () => {
  return (
    <section id="comparison" className="py-24 relative bg-white overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Why SecureCMS?</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Traditional methods fail under the scrutiny of India's DPDP Act. Experience the difference.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-6 text-xl font-bold text-gray-900">Features</th>
                  <th className="p-6 text-xl font-bold text-primary-600 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6" /> SecureCMS
                  </th>
                  <th className="p-6 text-lg font-semibold text-gray-500">Manual Effort</th>
                  <th className="p-6 text-lg font-semibold text-gray-500">Generic Utils</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors duration-300">
                    <td className="p-6 text-gray-700 font-medium">{row.feature}</td>
                    <td className="p-6">
                      {row.secure ? <Check className="w-6 h-6 text-emerald-600" /> : <X className="w-6 h-6 text-red-500/30" />}
                    </td>
                    <td className="p-6">
                      {row.manual ? <Check className="w-6 h-6 text-gray-400" /> : <X className="w-6 h-6 text-red-500/30" />}
                    </td>
                    <td className="p-6">
                      {row.generic ? <Check className="w-6 h-6 text-gray-400" /> : <X className="w-6 h-6 text-red-500/30" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;
