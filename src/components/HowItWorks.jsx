import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Database, UserCheck, FileBox } from 'lucide-react';

const steps = [
  {
    title: "1. Consent Capture",
    subtitle: "Web & Mobile UI",
    description: "Deploy our lightweight, multi-lingual consent widgets across all your digital touchpoints.",
    icon: <Layout className="w-6 h-6 text-primary-600" />
  },
  {
    title: "2. Secure Storage",
    subtitle: "Encrypted Logs",
    description: "Every consent event is hashed and stored in our redundant, encrypted cloud infrastructure within India.",
    icon: <Database className="w-6 h-6 text-secondary-600" />
  },
  {
    title: "3. Preference Management",
    subtitle: "User Control",
    description: "Users can access their personalized portal to update or withdraw consent at any time, instantly.",
    icon: <UserCheck className="w-6 h-6 text-secondary-600" />
  },
  {
    title: "4. Compliance Reporting",
    subtitle: "Audit Dashboards",
    description: "Generate comprehensive reports for regulators or internal audits with a single click.",
    icon: <FileBox className="w-6 h-6 text-primary-600" />
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-surface/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">How Our Consent Management System Works</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            A seamless 4-step engine designed to automate your compliance lifecycle.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 border border-gray-200 group-hover:border-primary-500 group-hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)] transition-all duration-500 bg-white relative z-10 shadow-sm">
                  {step.icon}
                </div>

                <div className="glass-card p-6 w-full h-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-primary-600 text-sm font-semibold mb-3">{step.subtitle}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
