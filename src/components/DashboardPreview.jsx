import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Database, CheckCircle, BarChart3, Fingerprint } from 'lucide-react';

const DashboardPreview = () => {
  return (
    <section className="py-24 relative border-t border-gray-100 bg-white overflow-hidden">

      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl pointer-events-none mix-blend-screen bg-hero-glow rounded-full blur-[150px] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Command Your Data</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Experience the power of a fully integrated central dashboard.
          </p>
        </div>

        {/* Dashboard Mockup Container */}
          <div className="perspective-1000 transform-3d max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-200/50">
          {/* Mock Header */}
            <div className="h-14 bg-gray-50 border-b border-gray-100 flex items-center px-6 gap-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="h-6 w-full max-w-md bg-gray-200/50 rounded mx-auto flex items-center px-3">
                <span className="text-xs text-gray-500 font-mono">securecms.app / control-panel / overview</span>
              </div>
            </div>

          {/* Dashboard Body */}
          <div className="p-6 md:p-10 grid md:grid-cols-3 gap-6 bg-gray-50/30">

            {/* Main Center Panel (occupies 2 cols) */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary-600" /> Live Data Exfiltration Scans
                  </h3>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">Monitoring Active</span>
                </div>
                {/* Fake Graph */}
                <div className="h-40 flex items-end justify-between gap-1 w-full">
                  {[30, 45, 20, 60, 80, 50, 40, 90, 100, 70, 50, 85, 40, 20, 50].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.05 }}
                      className="w-full bg-gradient-to-t from-primary-600/50 to-primary-400/80 rounded-t-sm"
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 border border-gray-100 rounded-xl shadow-sm flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">Total Consents Logged</span>
                    <span className="text-2xl font-bold font-mono text-gray-900">1.4B</span>
                  </div>
                  <Database className="w-8 h-8 text-blue-500/30" />
                </div>
                <div className="bg-white p-4 border border-gray-100 rounded-xl shadow-sm flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">Audit Trail Sync Delay</span>
                    <span className="text-2xl font-bold font-mono text-emerald-600">14ms</span>
                  </div>
                  <BarChart3 className="w-8 h-8 text-emerald-500/30" />
                </div>
              </div>
            </div>

            {/* Sidebar Feed */}
            <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm flex flex-col h-full">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-6">
                <Fingerprint className="w-5 h-5 text-blue-600" /> Recent Opt-Outs Check
              </h3>

              <div className="space-y-4 flex-1 overflow-hidden relative">
                {/* Activity log items */}
                {[
                  { region: "EU/FR", id: "usr_9kx2", time: "2s ago", status: "Verified" },
                  { region: "US/CA", id: "req_mc8f", time: "14s ago", status: "Verified" },
                  { region: "EU/DE", id: "tok_pz4l", time: "32s ago", status: "Rejected" },
                  { region: "APAC/SG", id: "usr_4nt1", time: "45s ago", status: "Verified" }
                ].map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      {log.status === "Verified" ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-red-500 flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-xs font-mono text-gray-900">{log.id}</span>
                        <span className="text-[10px] text-gray-500">{log.region}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{log.time}</span>
                  </motion.div>
                ))}

                {/* Fade overlay for bottom items */}
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-surface/80 to-transparent" />
              </div>
            </div>

          </div>
          </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
