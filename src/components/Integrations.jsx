import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Zap, BarChart4, Target } from 'lucide-react';

const integrationCategories = [
  { name: "CRMs", items: ["Salesforce", "HubSpot", "Zendesk"], color: "text-blue-600", icon: <Share2 className="w-6 h-6" /> },
  { name: "Analytics", items: ["GA4", "Mixpanel", "Segment"], color: "text-emerald-600", icon: <BarChart4 className="w-6 h-6" /> },
  { name: "Advertising", items: ["Google Ads", "Meta", "LinkedIn"], color: "text-red-600", icon: <Target className="w-6 h-6" /> }
];

const Integrations = () => {
  return (
    <section id="integrations" className="py-24 relative bg-gray-50/50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Ecosystem Integrations</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            SecureCMS works where your data lives. Sync user preferences across your entire marketing and data stack automatically.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {integrationCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center group overflow-hidden rounded-2xl"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-wide uppercase">{cat.name}</h3>

              <div className="flex flex-wrap justify-center gap-2">
                {cat.items.map((item, idy) => (
                  <span key={idy} className="px-3 py-1 rounded bg-gray-50 border border-gray-200 text-xs text-gray-600 font-mono">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary-50 border border-primary-100 p-10 rounded-3xl text-center flex flex-col items-center max-w-4xl mx-auto shadow-sm"
        >
          <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mb-6 border border-primary-500/20">
            <Zap className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Built-in Webhooks & Robust APIs</h3>
          <p className="text-gray-600 max-w-2xl text-sm leading-relaxed">
            Need a custom integration? Our developer-first API and webhook engine allow you to build deep, custom syncs with any backend or third-party platform in minutes.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Integrations;
