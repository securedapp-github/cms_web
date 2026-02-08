import { ShieldCheck, Users, Award, Zap, Globe } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance',
    subtitle: 'Meet DPDPA and Global Privacy Requirements with Confidence',
    description: 'SecureCMS enables organizations to collect, manage, and document user consent in accordance with data protection laws such as India\'s Digital Personal Data Protection Act (DPDPA), GDPR, CCPA, and other global regulations. By ensuring lawful consent collection and auditable records, businesses can reduce compliance risks and avoid regulatory penalties.',
    color: 'bg-blue-500'
  },
  {
    icon: Users,
    title: 'Build User Trust',
    subtitle: 'Give Users Transparency and Control Over Their Data',
    description: 'With SecureCMS, users clearly understand how their personal data is collected, processed, and used. Granular consent and preference controls empower individuals to manage their choices easily—strengthening trust, improving engagement, and fostering long-term customer relationships.',
    color: 'bg-teal-500'
  },
  {
    icon: Award,
    title: 'Reputation',
    subtitle: 'Strengthen Your Brand Through Responsible Data Practices',
    description: 'Adopting a structured consent and preference management approach demonstrates your organization\'s commitment to privacy and ethical data handling. SecureCMS helps establish a strong internal privacy culture that enhances brand reputation, increases stakeholder confidence, and positions your business as a trusted data custodian.',
    color: 'bg-orange-500'
  },
  {
    icon: Zap,
    title: 'Operational Efficiency',
    subtitle: 'Automate Consent Workflows and Reduce Manual Effort',
    description: 'SecureCMS centralizes consent and preference management across channels, eliminating fragmented processes and manual tracking. Automated workflows and dashboards help teams operate more efficiently, respond faster to user requests, and focus on business-critical priorities.',
    color: 'bg-purple-500'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    subtitle: 'Manage Consent Across Regions Without Complexity',
    description: 'Whether operating in India or expanding globally, SecureCMS supports jurisdiction-specific consent requirements. Our platform adapts to regional privacy laws, enabling seamless compliance across borders while maintaining consistent user experiences.',
    color: 'bg-emerald-500'
  }
];

export default function WhyNecessary() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Consent & Preference Management Is Necessary
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            An effective Consent & Preference Management system is essential for organizations to
            meet <span className="font-semibold">DPDPA obligations</span>, build user trust, and manage personal data
            responsibly in today's privacy-first digital ecosystem.
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="flex items-start space-x-6">
                <div className={`${reason.color} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <reason.icon className="w-7 h-7 text-white" />
                </div>
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
