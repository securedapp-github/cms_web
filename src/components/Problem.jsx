import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, FileWarning, SearchX, Ban, TrendingUp } from 'lucide-react';

const Problem = () => {
  return (
    <section id="problem" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red-500 font-semibold tracking-wider uppercase text-sm mb-4 inline-flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" /> Penalties & Risks
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            The Growing Need for <br />Consent Management
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            With the arrival of India's DPDP Act, manual consent management is no longer an option. Businesses that fail to adapt face unprecedented financial and legal risks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 inline-flex items-center gap-4 px-6 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="font-bold text-xl">73% of Indian businesses are not fully DPDP compliant</span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Proof of Consent", desc: "Most businesses lack auditable, time-stamped proof of explicit user consent.", icon: <SearchX className="w-8 h-8 text-red-500" /> },
            { title: "Rights Requests", desc: "Inefficient handling of user data access, correction, and erasure requests.", icon: <FileWarning className="w-8 h-8 text-orange-500" /> },
            { title: "Massive Penalties", desc: "Non-compliance can trigger penalties up to ₹250 crore under DPDP 2023.", icon: <Ban className="w-8 h-8 text-red-600" /> },
            { title: "Loss of Trust", desc: "Fragmented systems lead to data leaks and a complete collapse of user trust.", icon: <AlertCircle className="w-8 h-8 text-red-500" /> }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white border border-gray-100 p-8 rounded-2xl relative overflow-hidden group flex flex-col items-center text-center transition-all duration-500 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="bg-gray-50 border border-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm relative z-10 group-hover:scale-110 group-hover:bg-red-50 transition-all duration-500">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10 transition-colors duration-300">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10 transition-colors duration-300">{item.desc}</p>
              
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-red-500 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
