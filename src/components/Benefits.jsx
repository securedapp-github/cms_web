import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, TrendingUp, Users, DollarSign } from 'lucide-react';

const benefitList = [
  { title: "Risk Prevention", icon: <ShieldAlert className="w-8 h-8 text-red-600" />, desc: "Prevent legal & financial risks by automatically enforcing compliance policies." },
  { title: "User Trust", icon: <Users className="w-8 h-8 text-primary-600" />, desc: "Build transparency and trust with user-facing preference centers and clear notices." },
  { title: "Centralization", icon: <TrendingUp className="w-8 h-8 text-primary-600" />, desc: "Unify scattered consent data into one single, auditable source of truth." },
  { title: "Cost Reduction", icon: <DollarSign className="w-8 h-8 text-secondary-600" />, desc: "Reduces operational costs by automating manual compliance workflows." }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 lg:items-center gap-16">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Why Your Business Needs a Consent Manager
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Moving beyond just "fixing a law." SecureCMS helps you regain control over your data ecosystem and build meaningful relationships with your users through absolute transparency.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {benefitList.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-primary-500/30 transition-all duration-300 relative group overflow-hidden rounded-2xl"
              >
                <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;
