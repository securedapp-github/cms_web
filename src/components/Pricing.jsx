import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Building2 } from 'lucide-react';

const pricingPlans = [
  {
    name: "Starter",
    price: "₹9,999",
    period: "/mo",
    icon: <Zap className="w-6 h-6 text-primary-600" />,
    features: ["Up to 10k Monthly Sessions", "Basic DPDP Consent Notices", "Immutable Audit Logs (30 days)", "Standard Preference Center", "Email Support"],
    color: "border-gray-100"
  },
  {
    name: "Growth",
    price: "₹24,999",
    period: "/mo",
    featured: true,
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    features: ["Up to 100k Monthly Sessions", "Multi-lingual Notices", "Immutable Audit Logs (1 year)", "Custom UI Branding", "Automated User Rights Management", "Priority Support"],
    color: "border-blue-200 shadow-xl shadow-blue-500/5"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    icon: <Building2 className="w-6 h-6 text-primary-600" />,
    features: ["Unlimited Monthly Sessions", "Custom Legal Frameworks", "Indefinite Audit Retention", "SLA & Uptime Guarantees", "Dedicated Compliance Expert", "Full RBAC & On-prem options"],
    color: "border-gray-100"
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Investment in Compliance</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Plans built to scale with your business while ensuring absolute DPDP compliance at every stage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white p-10 border relative flex flex-col h-full rounded-2xl ${plan.color} ${plan.featured ? 'scale-105 z-20 shadow-2xl' : 'scale-100 z-10 shadow-sm'}`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 py-1 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">
                  Most Popular
                </div>
              )}

              <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-8 shadow-sm">
                {plan.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feat, idy) => (
                  <li key={idy} className="flex items-start gap-3 text-sm text-gray-700 leading-tight">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-bold transition-all ${plan.featured
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-xl shadow-blue-500/20'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 hover:bg-gray-100'
                  }`}
              >
                Get Started Now
              </motion.button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
