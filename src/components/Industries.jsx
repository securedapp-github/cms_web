import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, ShoppingCart, Activity, Cloud, BookOpen } from 'lucide-react';

const industryList = [
  { name: "Fintech & Banking", icon: <Landmark className="w-8 h-8 text-blue-600" /> },
  { name: "E-commerce", icon: <ShoppingCart className="w-8 h-8 text-orange-600" /> },
  { name: "Healthcare", icon: <Activity className="w-8 h-8 text-red-600" /> },
  { name: "SaaS", icon: <Cloud className="w-8 h-8 text-cyan-600" /> },
  { name: "EdTech", icon: <BookOpen className="w-8 h-8 text-emerald-600" /> }
];

const Industries = () => {
  return (
    <section id="industries" className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Industries We Serve</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            DPDP compliance is critical across all sectors. We provide specialized playbooks for your industry.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {industryList.map((industry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white border border-gray-100 p-6 w-48 flex flex-col items-center text-center gap-4 group cursor-default shadow-sm hover:shadow-md transition-all rounded-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner transition-all">
                {industry.icon}
              </div>
              <span className="text-sm font-bold text-gray-700 tracking-wide uppercase">{industry.name}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Industries;
