import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Settings, BookOpen, Globe, Cpu } from 'lucide-react';

const featuresData = [
  {
    icon: <Activity className="w-6 h-6 text-primary-600" />,
    title: "Real-Time Consent Tracking",
    description: "Monitor every consent event as it happens. Built-in hooks for instant propagation to your entire tech stack.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-secondary-600" />,
    title: "Automated DPDP Compliance",
    description: "Built-in workflows mapped directly to India's DPDP Act 2023 requirements for notice and consent.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-secondary-600" />,
    title: "Immutable Audit Logs",
    description: "Tamper-proof, cryptographically signed logs for every consent change, ready for regulatory inspection.",
  },
  {
    icon: <Settings className="w-6 h-6 text-orange-600" />,
    title: "User Rights Management",
    description: "Automated portals for users to exercise their rights: Access, Correction, and Erasure (Right to be Forgotten).",
  },
  {
    icon: <Globe className="w-6 h-6 text-primary-600" />,
    title: "Multi-language Support",
    description: "Consent notices in all major Indian regional languages to ensure user understanding and valid consent.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-secondary-600" />,
    title: "API & Webhook Integrations",
    description: "Developer-first architecture with robust APIs and webhooks for seamless platform integration.",
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900"
          >
            Key Features & Benefits of Consent Management System
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            The comprehensive toolkit your legal and engineering teams need for absolute compliance and operational efficiency.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {featuresData.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 group relative overflow-hidden h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10 transition-colors group-hover:text-primary-600">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10 group-hover:text-gray-700">{feature.description}</p>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-secondary-600 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
