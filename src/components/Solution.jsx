import React from 'react';
import { motion } from 'framer-motion';
import { Network, Zap, Shield, Crosshair, FileCheck, Lock, Eye, Database, Bell } from 'lucide-react';

const Solution = () => {
  return (
    <section id="solution" className="py-24 relative overflow-hidden bg-white border-y border-gray-100">
      {/* Background glowing path simulation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-primary-500 to-transparent absolute top-1/2 left-1/2 -translate-x-1/2 rotate-45 opacity-20" />
        <div className="w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-secondary-500 to-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -rotate-45 opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="text-primary-600 font-semibold tracking-wider uppercase text-sm inline-flex items-center gap-2">
              <Crosshair className="w-4 h-4" /> Definition & Benefits
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              What Is a Consent <br />Management System?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              A consent management system is a software platform that enables organizations to
              collect explicit user consent, store consent records securely with tamper-proof audit logs, allow
              users to update or withdraw consent at any time, and generate compliance reports for
              regulatory audits.
            </p>

            <ul className="space-y-4 mt-2">
              {[
                { text: "Collect explicit consent with granular specificity", icon: <Shield className="w-5 h-5 text-secondary-600" /> },
                { text: "Store immutable, timestamped records for audits", icon: <FileCheck className="w-5 h-5 text-secondary-600" /> },
                { text: "Enable real-time user preference updates", icon: <Zap className="w-5 h-5 text-secondary-600" /> },
                { text: "Generate audit-ready reports for DPDP compliance", icon: <Network className="w-5 h-5 text-secondary-600" /> }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm transition-all hover:bg-white hover:border-secondary-600/20">
                  <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-inner">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right side Visual - Premium Security Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] flex items-center justify-center overflow-hidden rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 40%, #f5f0ff 100%)',
              boxShadow: 'inset 0 0 80px rgba(0,136,255,0.06), 0 20px 60px rgba(0,100,255,0.1)'
            }}
          >
            {/* Ambient glow blobs */}
            <div style={{
              position: 'absolute', width: 300, height: 300,
              background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
              top: '50%', left: '50%', transform: 'translate(-50%,-50%)', borderRadius: '50%'
            }} />
            <div style={{
              position: 'absolute', width: 200, height: 200,
              background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
              top: '20%', right: '15%', borderRadius: '50%'
            }} />

            {/* Outer orbit ring – slow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', width: 380, height: 380,
                border: '1.5px dashed rgba(99,102,241,0.25)', borderRadius: '50%'
              }}
            >
              {[
                { deg: 0,   icon: <Lock className="w-4 h-4 text-white" />,     bg: 'linear-gradient(135deg,#6366f1,#4f46e5)', label: 'Encrypted' },
                { deg: 120, icon: <Eye className="w-4 h-4 text-white" />,      bg: 'linear-gradient(135deg,#0ea5e9,#0284c7)', label: 'Monitored' },
                { deg: 240, icon: <Bell className="w-4 h-4 text-white" />,     bg: 'linear-gradient(135deg,#f59e0b,#d97706)', label: 'Alerted' },
              ].map(({ deg, icon, bg, label }, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: `rotate(${deg}deg) translateX(190px) rotate(-${deg}deg)`,
                    marginTop: -22, marginLeft: -22
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    border: '2.5px solid white'
                  }}>
                    {icon}
                  </div>
                  <div style={{
                    position: 'absolute', top: 48, left: '50%', transform: 'translateX(-50%)',
                    background: 'white', borderRadius: 8, padding: '2px 8px',
                    fontSize: 10, fontWeight: 700, color: '#4f46e5',
                    whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>{label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Middle orbit ring – faster, opposite direction */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', width: 260, height: 260,
                border: '1px dashed rgba(14,165,233,0.3)', borderRadius: '50%'
              }}
            >
              {[
                { deg: 60,  icon: <Database className="w-3 h-3 text-white" />, bg: 'linear-gradient(135deg,#10b981,#059669)' },
                { deg: 180, icon: <Network className="w-3 h-3 text-white" />,  bg: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' },
                { deg: 300, icon: <Zap className="w-3 h-3 text-white" />,      bg: 'linear-gradient(135deg,#f43f5e,#e11d48)' },
              ].map(({ deg, icon, bg }, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: `rotate(${deg}deg) translateX(130px) rotate(-${deg}deg)`,
                    marginTop: -16, marginLeft: -16,
                    width: 32, height: 32, borderRadius: '50%',
                    background: bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 3px 12px rgba(0,0,0,0.2)',
                    border: '2px solid white'
                  }}
                >{icon}</div>
              ))}
            </motion.div>

            {/* Pulsing halo rings on core */}
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5 + i * 0.3], opacity: [0.4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
                style={{
                  position: 'absolute', width: 120, height: 120,
                  background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
                  borderRadius: '50%', zIndex: 5
                }}
              />
            ))}

            {/* Central shield core */}
            <div style={{ position: 'relative', zIndex: 20 }}>
              <div style={{
                width: 110, height: 110,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #3730a3 100%)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 0 8px rgba(99,102,241,0.15), 0 0 40px rgba(99,102,241,0.5), 0 8px 32px rgba(79,70,229,0.4)',
                border: '3px solid rgba(255,255,255,0.4)'
              }}>
                <Shield className="w-12 h-12 text-white" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }} />
              </div>
            </div>

            {/* Floating stat badges */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: 28, right: 28,
                background: 'white', borderRadius: 14,
                padding: '8px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(99,102,241,0.15)'
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>99.9% Uptime</span>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                position: 'absolute', bottom: 32, left: 28,
                background: 'white', borderRadius: 14,
                padding: '8px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(99,102,241,0.15)'
              }}
            >
              <FileCheck className="w-4 h-4 text-indigo-500" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>DPDP Compliant</span>
            </motion.div>

            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute', bottom: 40, right: 24,
                background: 'linear-gradient(135deg,#6366f1,#4f46e5)', borderRadius: 14,
                padding: '8px 14px', boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <Zap className="w-4 h-4 text-white" />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>Real-time Sync</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Solution;
