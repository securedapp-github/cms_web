import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Database, UserCog } from 'lucide-react';

const pbList = [
  { name: 'DPDP READY', color: 'text-primary-600', bg: 'bg-primary-50' },
  { name: 'ISO 27001', color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'SOC 2 TYPE II', color: 'text-primary-700', bg: 'bg-primary-100/50' },
  { name: 'CCPA COMPLIANT', color: 'text-blue-700', bg: 'bg-blue-100/50' },
];

const securityPoints = [
  { text: "AES-256 Data Encryption", icon: <Lock className="w-5 h-5" /> },
  { text: "TLS 1.3 Secure Transit", icon: <ShieldCheck className="w-5 h-5" /> },
  { text: "Data Stored in India", icon: <Database className="w-5 h-5" /> },
  { text: "Role-Based Access (RBAC)", icon: <UserCog className="w-5 h-5" /> }
];

const Trust = () => {
  return (
    <section className="py-24 border-y border-gray-100 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-4 font-bold">
            Trusted by Enterprise Security Teams
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 overflow-hidden">
            {pbList.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`px-4 py-2 rounded-lg font-mono text-sm font-semibold border border-gray-200 shadow-sm ${badge.color} ${badge.bg}`}
              >
                {badge.name}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-primary-600 group-hover:text-white group-hover:bg-primary-600 transition-all duration-300 shadow-sm">
                {point.icon}
              </div>
              <span className="text-gray-700 font-medium text-sm">{point.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
