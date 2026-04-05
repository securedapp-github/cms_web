import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, UserCheck, ShieldAlert, Scale } from 'lucide-react';

const provisions = [
  {
    title: "Explicit Consent",
    desc: "Data must be processed only for a specified purpose after obtaining clear, affirmative consent.",
    icon: <UserCheck className="w-6 h-6 text-primary-600" />
  },
  {
    title: "Purpose Limitation",
    desc: "Personal data should only be used for the specific purpose for which consent was granted.",
    icon: <ShieldAlert className="w-6 h-6 text-secondary-600" />
  },
  {
    title: "Data Principal Rights",
    desc: "Users have the right to access, correct, and erase their personal data at any time.",
    icon: <BookOpen className="w-6 h-6 text-secondary-600" />
  },
  {
    title: "Grievance Redressal",
    desc: "Establishing a mechanism for users to raise concerns and resolve data-related disputes.",
    icon: <Scale className="w-6 h-6 text-primary-600" />
  }
];

const DDPPAct = () => {
  return (
    <section id="dpdp-act" className="py-24 relative bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900"
          >
            Understanding the DPDP Act
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            The Digital Personal Data Protection (DPDP) Act, 2023, is India's framework for digital privacy. Here are the key provisions every business must follow.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {provisions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 border-gray-100 flex gap-6 hover:bg-gray-50 transition-all duration-300"
            >
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-md">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DDPPAct;
