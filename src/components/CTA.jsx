import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle } from 'lucide-react';

const CTA = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-20 mix-blend-screen bg-gradient-to-r from-primary-500 via-accent to-primary-500 blur-[120px] rounded-[100%]" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-4 inline-flex items-center gap-2"
        >
          Final CTA Section
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-gray-900"
        >
          Start Protecting Your Users <br />
          and <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 to-secondary-500">Your Business Today</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium"
        >
          DPDP compliance is no longer optional. Get ahead of the regulations and secure your future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
        >
          <a 
            href="https://calendly.com/nikhil-securedapp/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-full overflow-hidden shadow-[0_10px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.35)] transition-all duration-300"
          >
            <span className="relative z-10 text-lg">Book a Demo</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://cms-app.securedapp.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 glass-card text-gray-900 font-bold rounded-full hover:bg-gray-50 transition-all flex items-center justify-center gap-2 border border-gray-200 group"
          >
            <span className="relative z-10 text-lg">Get Compliance Audit</span>
            <ArrowRight className="w-5 h-5 text-secondary-600 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://calendly.com/nikhil-securedapp/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 glass-card text-gray-900 font-bold rounded-full hover:bg-gray-50 transition-all flex items-center justify-center gap-2 border border-gray-200"
          >
            <HelpCircle className="w-5 h-5 text-secondary-600" />
            <span className="text-lg">Talk to an Expert</span>
          </a>
        </motion.div>

        <p className="mt-8 text-sm text-gray-500 font-mono">
          Compliant with India's DPDP Act, 2023 • Local Data Storage
        </p>
      </div>
    </section>
  );
};

export default CTA;
