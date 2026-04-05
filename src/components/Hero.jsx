import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, ToggleRight, Database, ArrowRight, Gavel } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center bg-grid">
      {/* Background Ornaments */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none mix-blend-screen bg-hero-glow rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              <span className="text-sm text-primary-600 font-medium">Get compliant in less than 24 hours</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-gray-900">
              Consent Management System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 to-secondary-500">DPDP Compliance in India</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Collect, manage, and audit user consent with real-time dashboards, audit trails, and user rights tools — fully compliant with India’s Digital Personal Data Protection Act (DPDP), 2023.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://calendly.com/nikhil-securedapp/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-600 text-white font-bold rounded-xl shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all flex items-center justify-center gap-2"
              >
                Book a Free Demo <ArrowRight className="w-5 h-5 text-white/70" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://cms-app.securedapp.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 glass-card text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                Get DPDP Compliance Audit
              </motion.a>
            </div>
          </motion.div>

          {/* Right 3D Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, rotateY: 15, rotateX: 5, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: -10, rotateX: 10, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="perspective-1000 transform-3d relative hidden lg:block h-[600px] w-full"
          >
            {/* Main Center Panel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] glass p-6 shadow-2xl shadow-gray-200/50 flex flex-col gap-4 animate-float">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <Gavel className="text-secondary-600 w-5 h-5 animate-pulse-slow" />
                  <span className="font-medium text-gray-800">DPDP Enforcement Panel</span>
                </div>
                <span className="text-xs font-mono text-secondary-600 bg-secondary-500/10 px-2 py-1 rounded">INDIA REGION</span>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { name: 'Explicit Consent', stat: 'Verified', icon: <ShieldCheck className="text-emerald-500 w-4 h-4" /> },
                  { name: 'Audit Logging', stat: 'Encrypted', icon: <Database className="text-primary-500 w-4 h-4" /> },
                  { name: 'Preference Center', stat: 'Live', icon: <ToggleRight className="text-blue-500 w-4 h-4" /> }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      {item.icon} {item.name}
                    </div>
                    <span className="text-xs text-gray-500">{item.stat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Side Element 1 */}
            <div className="absolute top-[10%] -left-[10%] w-[200px] glass p-4 animate-float-delayed shadow-xl shadow-gray-200/50 z-20">
              <div className="text-xs text-gray-500 mb-2">Compliance Alert</div>
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-3 h-3 text-red-500" />
                <span className="text-[10px] text-red-600 uppercase font-bold">DPDP RISK LEVEL</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "20%" }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className="h-full bg-gradient-to-r from-secondary-500 to-primary-500"
                />
              </div>
            </div>

            {/* Floating Side Element 2 */}
            <div className="absolute bottom-[20%] -right-[5%] w-[220px] glass p-5 animate-float z-20 backdrop-blur-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-secondary-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-secondary-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Total Audit Logs</span>
                  <span className="text-sm font-bold text-gray-900">4.2M Records</span>
                </div>
              </div>
              {/* Fake chart bars */}
              <div className="flex items-end gap-1 h-12 mt-2">
                {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-primary-500/50 rounded-t-sm"
                  />
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
