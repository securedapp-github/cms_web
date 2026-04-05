import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqList = [
  {
    question: "What is a consent management system?",
    answer: "A consent management system (CMS) is a software platform that enables businesses to collect, store, manage, and audit user consent for processing personal data. It ensures that consent is captured in a legally valid format, can be withdrawn by the user at any time, and is available as a verifiable record during regulatory audits. Secure CMS is India's purpose-built CMS for DPDP Act compliance."
  },
  {
    question: "What is DPDP compliance?",
    answer: "DPDP compliance refers to adherence with India's Digital Personal Data Protection Act, 2023 — a comprehensive data protection law that governs how businesses collect, store, process, and delete the personal data of Indian residents. Compliance requires obtaining explicit user consent, honouring data subject rights, appointing a Data Protection Officer (for Significant Data Fiduciaries), and maintaining auditable consent records."
  },
  {
    question: "Do Indian businesses need a consent management system?",
    answer: "Yes. Any business that processes digital personal data of Indian residents is subject to the DPDP Act, 2023. The Act mandates explicit, purpose-specific consent and gives users enforceable rights to access, correct, and delete their data. A consent management system is the most reliable way to meet these obligations, maintain audit records, and avoid penalties of up to ₹250 crore."
  },
  {
    question: "How is the DPDP Act different from GDPR?",
    answer: "While both laws protect personal data rights, the DPDP Act differs from the EU's GDPR in several key ways. The DPDP Act relies primarily on consent as the legal basis for processing (GDPR recognises six bases). The DPDP Act currently applies only to digital data. GDPR has a more mature enforcement history; DPDP enforcement is beginning now. Both require privacy notices, user rights mechanisms, and breach notification obligations."
  },
  {
    question: "Can users withdraw consent under the DPDP Act?",
    answer: "Yes. The DPDP Act gives Data Principals (users) an explicit right to withdraw consent at any time. The withdrawal must be as easy as giving consent in the first place. Secure CMS's self-service Consent Preference Centre makes withdrawal a one-click action, and propagates the change to all connected systems in real time via API."
  },
  {
    question: "What happens if I don't comply with the DPDP Act?",
    answer: "Non-compliance with the DPDP Act can result in penalties of up to ₹250 crore per contravention, imposed by India's Data Protection Board after investigation. Beyond financial penalties, businesses risk enforcement orders, suspension of data processing activities, reputational damage, and loss of user trust. Early compliance is significantly less costly than reactive remediation after a regulatory action."
  },
  {
    question: "What is the difference between a CMS and a cookie consent banner?",
    answer: "A cookie consent banner is a narrow tool that captures consent for cookie-based tracking on a website. A consent management system is a comprehensive platform that manages all forms of personal data consent — not just cookies — across web, mobile, and API touchpoints."
  },
  {
    question: "How quickly can SecureCMS be deployed?",
    answer: "SecureCMS can be fully deployed in under 24 hours. For web deployments, our JavaScript snippet takes minutes to implement. Mobile SDK integration typically requires less than half a day of engineering effort. Enterprise API integrations with CRM or CDP platforms are guided by our onboarding team and typically complete within 2–5 business days."
  },
  {
    question: "Does SecureCMS support multi-language consent notices?",
    answer: "Yes. SecureCMS supports consent notices in 20+ languages, including Hindi, Tamil, Bengali, Telugu, Marathi, Kannada, Gujarati, and English. Multi-language support is available on Growth and Enterprise plans. This is particularly important for businesses with users across India's linguistically diverse states."
  },
  {
    question: "Is SecureCMS compliant with ISO 27001 and SOC 2?",
    answer: "SecureCMS's infrastructure is aligned with ISO 27001 information security management standards. We also undergo periodic SOC 2 Type II audits covering Security, Availability, and Confidentiality criteria. SOC 2 audit reports are available to enterprise clients under NDA. These certifications provide the third-party assurance that enterprise procurement and legal teams require."
  },
  {
    question: "How does SecureCMS handle user rights requests under the DPDP Act?",
    answer: "SecureCMS includes a built-in User Rights Management module that automates the intake, tracking, and fulfilment of DPDP rights requests — access, correction, erasure, and nomination rights. Each request is assigned an SLA, tracked to completion, and documented in the audit log. This eliminates the need for custom internal tooling and reduces the risk of missing statutory response deadlines."
  },
  {
    question: "Can SecureCMS integrate with my existing CRM or analytics platform?",
    answer: "Yes. SecureCMS integrates natively with major CRM platforms (Salesforce, HubSpot, Zoho), analytics platforms (Segment, Mixpanel, CleverTap), and advertising platforms (Google, Meta). Our REST API and webhook system allow any platform to stay in sync with real-time consent status. Custom integrations are supported on Enterprise plans."
  },
  {
    question: "What is the cost of SecureCMS?",
    answer: "SecureCMS offers tiered pricing based on the number of monthly consent events, features required, and level of support. The Starter plan is designed for early-stage startups, Growth for scaling SaaS and e-commerce platforms, and Enterprise for exchanges and financial institutions with custom requirements. Contact us for a tailored quote based on your data volume and compliance needs."
  },
  {
    question: "How does SecureCMS store and protect consent data?",
    answer: "All consent records are encrypted at rest using AES-256 and in transit using TLS 1.3. Data is stored by default in India (AWS Mumbai region) to ensure data residency compliance. Consent logs are immutable — records cannot be altered retroactively. Role-based access controls and MFA enforcement restrict access to authorised personnel only."
  },
  {
    question: "What is a Data Fiduciary under the DPDP Act?",
    answer: "Under the Digital Personal Data Protection Act, 2023, a Data Fiduciary is any person or entity that determines the purpose and means of processing personal data. This includes businesses, startups, apps, and platforms that collect user data. Data Fiduciaries are responsible for obtaining valid consent, maintaining data accuracy, implementing security safeguards, and enabling user rights — all obligations SecureCMS automates."
  }
];

const FAQItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className={`bg-white mb-4 border border-gray-100 rounded-2xl transition-all duration-300 shadow-sm ${isOpen ? 'bg-white shadow-md' : 'bg-gray-50/50'}`}>
      <button
        onClick={toggle}
        className="w-full text-left p-6 flex justify-between items-center gap-4 transition-colors"
      >
        <span className="text-lg font-bold text-gray-900">{question}</span>
        <div className={`shrink-0 transition-colors ${isOpen ? 'text-primary-600' : 'text-gray-400'}`}>
          <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 relative bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16 flex flex-col items-center">
          <div className="w-12 h-12 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6 border border-primary-500/20">
            <HelpCircle className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">FAQ: Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">
            Everything you need to know about DPDP and Secure CMS.
          </p>
        </div>

        <div className="flex flex-col">
          {faqList.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              toggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
