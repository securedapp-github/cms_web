import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard, ArrowRight, ShieldCheck, Zap, Lock,
  Building2, Shield, Database, Map, FolderKanban, Users,
  UserCheck, History, UserCog, Baby, FileText,
  AlertTriangle, HardDrive, Network, Lightbulb,
  ChevronDown, X, Loader2, CheckCircle, AlertCircle, Award, Globe
} from 'lucide-react';

/* ==========================================
   MODAL COMPONENT
   ========================================== */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white text-left text-gray-900 rounded-2xl shadow-2xl scale-100 opacity-100 transition-all duration-200" style={{ zIndex: 100 }}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   REQUEST DEMO MODAL COMPONENT
   ========================================== */
interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function RequestDemoModal({ isOpen, onClose }: RequestDemoModalProps) {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    }, 2000);
  };

  if (submitted) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Request a Demo">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Request Received!</h4>
          <p className="text-gray-600">
            Thank you for your interest. Our team will contact you shortly to schedule your demo.
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request a Demo">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text" required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email" required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@company.com"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text" required
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
              placeholder="Acme Inc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            How can we help?
          </label>
          <textarea
            rows={3}
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about your requirements..."
          />
        </div>
        <button
          type="submit" disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 text-white" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit Request</span>
          )}
        </button>
      </form>
    </Modal>
  );
}

/* ==========================================
   PROJECT INQUIRY MODAL COMPONENT
   ========================================== */
interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICE_OFFERINGS = [
  "Smart Contract Audit", "Web3 Security", "Regulatory Solutions", "Training & Education", "Other"
];

function ProjectInquiryModal({ isOpen, onClose }: ProjectInquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', email: '', serviceOffering: SERVICE_OFFERINGS[0], message: '', agreePrivacy: false, subscribeUpdates: false
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      const payload = { ...formData, source: "CMS", platform: "Website", campaign: "Default Campaign", submittedFrom: "Project Inquiry Page" };
      const response = await fetch('https://crm-be.securedapp.io/api/public/project-inquiry', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      setStatus('success');
      setTimeout(() => {
        onClose(); setStatus('idle'); setFormData({ fullName: '', mobile: '', email: '', serviceOffering: SERVICE_OFFERINGS[0], message: '', agreePrivacy: false, subscribeUpdates: false });
      }, 3000);
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus('error');
      setErrorMessage('Failed to submit inquiry. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Project Inquiry">
        <div className="text-center py-8 animate-fadeIn">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Inquiry Sent!</h4>
          <p className="text-gray-600">
            Thank you for reaching out. Our team will review your project requirements and get back to you shortly.
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Start a Project">
      {status === 'error' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text" required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} placeholder="John Doe"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel" required
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} placeholder="+1 (555) 000-0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email" required
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="john@company.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Offering <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              required
              className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
              value={formData.serviceOffering} onChange={e => setFormData({ ...formData, serviceOffering: e.target.value })}
            >
              {SERVICE_OFFERINGS.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3} required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
            value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your project requirements..."
          />
        </div>
        <div className="space-y-3 pt-2">
          <label className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox" required
              className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              checked={formData.agreePrivacy} onChange={e => setFormData({ ...formData, agreePrivacy: e.target.checked })}
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              I agree to the <Link to="/privacy-policy" className="text-blue-600 hover:underline" onClick={e => e.stopPropagation()}>Privacy Policy</Link> and consent to the processing of my data.
            </span>
          </label>
          <label className="flex items-start space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              checked={formData.subscribeUpdates} onChange={e => setFormData({ ...formData, subscribeUpdates: e.target.checked })}
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              Keep me updated on the latest Web3 security news and offers.
            </span>
          </label>
        </div>
        <button
          type="submit" disabled={status === 'submitting'}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-4 shadow-lg shadow-blue-500/20"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <span>Submit Project Inquiry</span>
          )}
        </button>
      </form>
    </Modal>
  );
}

/* ==========================================
   HEADER COMPONENT
   ========================================== */
function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <img
            src="/STRIGHT.png"
            alt="Secure CMS"
            className="h-16 w-auto transition-transform duration-300 transform scale-150 origin-left hover:scale-[1.6]"
          />

          <div className="flex items-center space-x-6">
            {user ? (
              <Link
                to={user.role === 'Admin' ? '/admin' : '/dashboard'}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to Dashboard</span>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ==========================================
   HERO COMPONENT
   ========================================== */
function Hero() {
  return (
    <section className="pt-24 pb-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Consent Management System<br />
            <span className="text-orange-500">DPDP Act, 2023 Compliant</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            A modular, secure, and user-centric platform enabling Data Principals to manage
            their consent lifecycle and Data Fiduciaries to integrate consent processes
            seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2 text-lg font-semibold shadow-lg hover:shadow-xl">
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="bg-white text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all border-2 border-gray-200 text-lg font-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   FEATURES COMPONENT
   ========================================== */
const features = [
  { icon: ShieldCheck, title: 'DPDP Act Compliant', description: 'Ensures verifiability, auditability, and privacy compliance as per the Digital Personal Data Protection Act, 2023.', color: 'bg-blue-500' },
  { icon: Zap, title: 'Seamless Integration', description: 'Modular architecture enabling Data Fiduciaries to integrate consent processes efficiently and securely.', color: 'bg-orange-500' },
  { icon: Lock, title: 'User-Centric Design', description: 'Empowers Data Principals to manage their entire consent lifecycle with complete control and transparency.', color: 'bg-teal-500' }
];

function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   DASHBOARD / REQUEST DEMO SECTION
   ========================================== */
function Dashboard() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Consent & Preference Management Is Essential for DPDPA Compliance</h2>
          <p className="text-xl text-blue-100 leading-relaxed">
            A robust Consent Management System like <span className="font-semibold">SecureCMS</span> enables organizations to collect, manage, and honor user consent transparently while meeting the requirements of India's Digital Personal Data Protection Act (DPDPA) and global privacy laws.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-default group">
              <div className="text-5xl font-bold mb-2 group-hover:text-blue-200 transition-colors">10K+</div><div className="text-blue-100 group-hover:text-white transition-colors">Consents Managed</div>
            </div>
            <div className="p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-default group">
              <div className="text-5xl font-bold mb-2 group-hover:text-blue-200 transition-colors">99.9%</div><div className="text-blue-100 group-hover:text-white transition-colors">Uptime Guarantee</div>
            </div>
            <div className="p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-default group">
              <div className="text-5xl font-bold mb-2 group-hover:text-blue-200 transition-colors">100%</div><div className="text-blue-100 group-hover:text-white transition-colors">DPDP Compliant</div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Request a Demo
          </button>
        </div>
      </div>
      <RequestDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </section>
  );
}

/* ==========================================
   PRODUCT EXPLANATION COMPONENT
   ========================================== */
function ProductExplanation() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12"><h2 className="text-4xl md:text-5xl font-bold mb-6">What is SecureCMS?</h2></div>
          <div className="bg-white rounded-2xl p-10 shadow-lg">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              SecureCMS is a centralised consent management system that allows organisations to collect, store, update, and synchronise user consent and privacy preferences across their digital ecosystem. It provides a single, auditable source of truth for consent data, ensuring that user choices are respected consistently across all platforms and processing activities.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The platform supports compliance readiness for regulations such as GDPR, CCPA, CPRA, and India's Digital Personal Data Protection (DPDP) Act by enabling lawful consent capture, purpose-based controls, and traceable consent records.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              SecureCMS is designed to be equally effective for legal, compliance, marketing, and engineering teams, removing operational silos and simplifying privacy governance at scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   WHY NECESSARY COMPONENT
   ========================================== */
const reasons = [
  { icon: ShieldCheck, title: 'Regulatory Compliance', subtitle: 'Meet DPDPA and Global Privacy Requirements with Confidence', description: 'SecureCMS enables organizations to collect, manage, and document user consent in accordance with data protection laws such as India\'s Digital Personal Data Protection Act (DPDPA), GDPR, CCPA, and other global regulations. By ensuring lawful consent collection and auditable records, businesses can reduce compliance risks and avoid regulatory penalties.', color: 'bg-blue-500' },
  { icon: Users, title: 'Build User Trust', subtitle: 'Give Users Transparency and Control Over Their Data', description: 'With SecureCMS, users clearly understand how their personal data is collected, processed, and used. Granular consent and preference controls empower individuals to manage their choices easily—strengthening trust, improving engagement, and fostering long-term customer relationships.', color: 'bg-teal-500' },
  { icon: Award, title: 'Reputation', subtitle: 'Strengthen Your Brand Through Responsible Data Practices', description: 'Adopting a structured consent and preference management approach demonstrates your organization\'s commitment to privacy and ethical data handling. SecureCMS helps establish a strong internal privacy culture that enhances brand reputation, increases stakeholder confidence, and positions your business as a trusted data custodian.', color: 'bg-orange-500' },
  { icon: Zap, title: 'Operational Efficiency', subtitle: 'Automate Consent Workflows and Reduce Manual Effort', description: 'SecureCMS centralizes consent and preference management across channels, eliminating fragmented processes and manual tracking. Automated workflows and dashboards help teams operate more efficiently, respond faster to user requests, and focus on business-critical priorities.', color: 'bg-purple-500' },
  { icon: Globe, title: 'Global Reach', subtitle: 'Manage Consent Across Regions Without Complexity', description: 'Whether operating in India or expanding globally, SecureCMS supports jurisdiction-specific consent requirements. Our platform adapts to regional privacy laws, enabling seamless compliance across borders while maintaining consistent user experiences.', color: 'bg-emerald-500' }
];

function WhyNecessary() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Consent & Preference Management Is Necessary</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            An effective Consent & Preference Management system is essential for organizations to meet <span className="font-semibold">DPDPA obligations</span>, build user trust, and manage personal data responsibly in today's privacy-first digital ecosystem.
          </p>
        </div>
        <div className="space-y-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all border border-gray-100">
              <div className="flex items-start space-x-6">
                <div className={`${reason.color} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}><reason.icon className="w-7 h-7 text-white" /></div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{reason.title}</h3>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">{reason.subtitle}</h4>
                  <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   CAPABILITIES COMPONENT
   ========================================== */
const capabilities = [
  { icon: Building2, title: 'Organization Management', description: 'Centralize user roles, departments, and access controls to ensure secure and accountable consent operations across your organization.' },
  { icon: Shield, title: 'DPIA', description: 'Identify and mitigate privacy risks with structured DPIA workflows aligned to DPDPA and global data protection standards.' },
  { icon: Database, title: 'Data Discovery', description: 'Automatically identify and classify personal data across systems to enable accurate consent mapping and lawful data processing.' },
  { icon: Map, title: 'Data Mapping', description: 'Visualize how personal data flows across applications, vendors, and jurisdictions to support transparency and regulatory audits.' },
  { icon: FolderKanban, title: 'Cataloguing', description: 'Maintain a centralized inventory of data assets, processing purposes, and consent requirements to strengthen compliance oversight.' },
  { icon: Users, title: 'Preference Centre', description: 'Empower data principals to view, manage, and update their consent preferences through an intuitive web and mobile-friendly interface.' },
  { icon: UserCheck, title: 'Principal Management', description: 'Manage data principal identities and consent histories securely while ensuring easy fulfillment of consent and privacy requests.' },
  { icon: History, title: 'Legacy Consent', description: 'Migrate, validate, and govern previously collected consents to ensure continued compliance under DPDPA requirements.' },
  { icon: Lock, title: 'Consent Governance', description: 'Define consent policies, approval workflows, and audit trails to ensure consistent and defensible consent practices.' },
  { icon: UserCog, title: 'DPO Operations', description: 'Support Data Protection Officers with dashboards, alerts, and reporting tools to manage compliance responsibilities efficiently.' },
  { icon: Baby, title: 'Parental Consent', description: 'Enable age-gating and verifiable parental consent mechanisms in line with DPDPA obligations for children\'s data.' },
  { icon: FileText, title: 'DPAR', description: 'Automate the intake, tracking, and resolution of data principal access and consent-related requests within statutory timelines.' },
  { icon: AlertTriangle, title: 'PII Incident', description: 'Detect, document, and manage personal data incidents with structured workflows and audit-ready records.' },
  { icon: HardDrive, title: 'Data Processors', description: 'Maintain visibility and control over third-party processors handling personal data and associated consent obligations.' },
  { icon: Network, title: 'Downstreams', description: 'Track how consent choices propagate across downstream systems, integrations, and partners.' },
  { icon: Lightbulb, title: 'Awareness', description: 'Promote internal privacy awareness through documentation, policies, and role-based guidance to strengthen compliance culture.' }
];

function Capabilities() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Structured Consent Management. Seamless DPDPA Compliance.</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            SecureCMS provides a comprehensive, modular Consent Management System designed to help organizations operationalize <span className="font-semibold">DPDPA compliance</span>, strengthen privacy governance, and scale data protection programs with ease.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {capabilities.map((capability, index) => (
            <div key={index} className="bg-white p-6 rounded-xl hover:shadow-lg transition-all border border-gray-100 group cursor-pointer">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <capability.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{capability.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{capability.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   FAQ COMPONENT
   ========================================== */
const faqs = [
  { question: 'Is SecureCMS only a cookie consent tool?', answer: 'No. SecureCMS is a comprehensive consent and preference management platform that manages consent across systems, purposes, and user journeys, not just cookies.' },
  { question: 'Does SecureCMS support Indian privacy regulations?', answer: 'Yes. SecureCMS supports compliance readiness for India\'s Digital Personal Data Protection (DPDP) Act, along with global privacy frameworks.' },
  { question: 'Can SecureCMS integrate with existing tools?', answer: 'SecureCMS is built with an API-first architecture and can integrate with common enterprise, marketing, and analytics platforms.' },
  { question: 'How long does implementation take?', answer: 'Implementation timelines vary based on integration complexity, but most organisations can begin consent capture within weeks.' },
  { question: 'How much does SecureCMS cost?', answer: 'Pricing is based on your organization\'s size and requirements. Contact our sales team for a customized quote.' },
  { question: 'Is SecureCMS registered with India\'s Data Protection Board?', answer: 'SecureCMS follows all DPDP Act requirements and stays updated with regulatory developments from the Data Protection Board of India.' },
  { question: 'What happens to our data if we switch providers?', answer: 'You retain full ownership of your consent data. We provide complete data export capabilities and migration support to ensure smooth transitions.' }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2></div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-slate-50 rounded-xl overflow-hidden border border-gray-200">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-100 transition-colors">
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (<div className="px-6 pb-5"><p className="text-gray-600 leading-relaxed">{faq.answer}</p></div>)}
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have a question?</p>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Abhishek@securedapp.in" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">Write to us</a>
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   FOOTER COMPONENT
   ========================================== */
function Footer() {
  const currentYear = 2024;
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const products = [
    { name: 'Solidity Shield Scan', href: 'https://securedapp.io/solidity-shield' },
    { name: 'Secure Watch', href: 'https://securedapp.io/secure-watch' },
    { name: 'Secure CMS (Consent)', href: 'https://securedapp.io/secure-cms' },
    { name: 'Audit Express', href: 'https://securedapp.io/auditexpress/home' },
    { name: 'Secure Trace', href: 'https://securedapp.io/secure-trace' },
    { name: 'Secure Pad', href: 'https://securedapp.io/secure-pad' },
    { name: 'PQC Suite', href: 'https://securedapp.io/pqc' },
  ];

  const services = [
    { name: 'Audit', href: 'https://securedapp.io/smart-contract-audit' },
    { name: 'Security', href: 'https://securedapp.io/web3-security' },
    { name: 'Regulatory Solutions', href: 'https://securedapp.io/crypto-compliance-aml' },
    { name: 'Training & Education', href: 'https://securedapp.io/levelup-academy' },
  ];

  const company = [
    { name: 'About Us', href: 'https://securedapp.io/about' },
    { name: 'Authors', href: 'https://securedapp.io/authors' },
    { name: 'Media', href: 'https://securedapp.io/media' },
    { name: 'Career', href: 'https://securedapp.gitbook.io/securedapp-launchpad/careers' },
  ];

  const SocialIcon = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="bg-transparent hover:opacity-80 transition-opacity">
      {children}
    </a>
  );

  return (
    <footer className="bg-[#1d4ed8] text-white pt-10 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between mb-8 items-start gap-12">
          <div className="flex flex-col lg:w-1/3 space-y-8">
            <div className="flex items-center">
              <img src="/STRIGHT.png" alt="Secure CMS" className="h-16 w-auto object-contain transform scale-[2] origin-left" />
            </div>
            <div className="flex space-x-4">
              <SocialIcon href="https://x.com/secure_dapp"><svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></SocialIcon>
              <SocialIcon href="https://www.linkedin.com/company/securecms/posts/?feedView=all&viewAsMember=true"><svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.224 0z" /></svg></SocialIcon>
              <SocialIcon href="https://telegram.me/securedappcommunity"><svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg></SocialIcon>
            </div>
          </div>
          <div className="flex-1 flex flex-col md:flex-row justify-end lg:justify-end space-y-8 md:space-y-0 md:space-x-16 lg:space-x-24">
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Product</h3>
              <ul className="space-y-3">
                {products.map(item => <li key={item.name}><a href={item.href} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors text-sm">{item.name}</a></li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Services</h3>
              <ul className="space-y-3">
                {services.map(item => <li key={item.name}><a href={item.href} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors text-sm">{item.name}</a></li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
              <ul className="space-y-3">
                {company.map(item => <li key={item.name}><a href={item.href} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors text-sm">{item.name}</a></li>)}
                <li><button onClick={() => setIsInquiryModalOpen(true)} className="text-white/80 hover:text-white transition-colors text-sm text-left">Contact Us</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 pt-8 mt-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-white/40">•</span>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
          <div className="text-center md:text-right">© {currentYear}, Vettedcode Technologies India Pvt. Ltd.. All rights reserved</div>
        </div>
      </div>
      <ProjectInquiryModal isOpen={isInquiryModalOpen} onClose={() => setIsInquiryModalOpen(false)} />
    </footer>
  );
}

/* ==========================================
   MAIN LANDING COMPONENT
   ========================================== */
export default function Landing() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Dashboard />
      <ProductExplanation />
      <WhyNecessary />
      <Capabilities />
      <FAQ />
      <Footer />
    </div>
  );
}
