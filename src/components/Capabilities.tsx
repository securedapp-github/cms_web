import { Building2, Shield, Database, Map, FolderKanban, Users, UserCheck, History, Lock, UserCog, Baby, FileText, AlertTriangle, HardDrive, Network, Lightbulb } from 'lucide-react';

const capabilities = [
  {
    icon: Building2,
    title: 'Organization Management',
    description: 'Centralize user roles, departments, and access controls to ensure secure and accountable consent operations across your organization.'
  },
  {
    icon: Shield,
    title: 'DPIA',
    description: 'Identify and mitigate privacy risks with structured DPIA workflows aligned to DPDPA and global data protection standards.'
  },
  {
    icon: Database,
    title: 'Data Discovery',
    description: 'Automatically identify and classify personal data across systems to enable accurate consent mapping and lawful data processing.'
  },
  {
    icon: Map,
    title: 'Data Mapping',
    description: 'Visualize how personal data flows across applications, vendors, and jurisdictions to support transparency and regulatory audits.'
  },
  {
    icon: FolderKanban,
    title: 'Cataloguing',
    description: 'Maintain a centralized inventory of data assets, processing purposes, and consent requirements to strengthen compliance oversight.'
  },
  {
    icon: Users,
    title: 'Preference Centre',
    description: 'Empower data principals to view, manage, and update their consent preferences through an intuitive web and mobile-friendly interface.'
  },
  {
    icon: UserCheck,
    title: 'Principal Management',
    description: 'Manage data principal identities and consent histories securely while ensuring easy fulfillment of consent and privacy requests.'
  },
  {
    icon: History,
    title: 'Legacy Consent',
    description: 'Migrate, validate, and govern previously collected consents to ensure continued compliance under DPDPA requirements.'
  },
  {
    icon: Lock,
    title: 'Consent Governance',
    description: 'Define consent policies, approval workflows, and audit trails to ensure consistent and defensible consent practices.'
  },
  {
    icon: UserCog,
    title: 'DPO Operations',
    description: 'Support Data Protection Officers with dashboards, alerts, and reporting tools to manage compliance responsibilities efficiently.'
  },
  {
    icon: Baby,
    title: 'Parental Consent',
    description: 'Enable age-gating and verifiable parental consent mechanisms in line with DPDPA obligations for children\'s data.'
  },
  {
    icon: FileText,
    title: 'DPAR',
    description: 'Automate the intake, tracking, and resolution of data principal access and consent-related requests within statutory timelines.'
  },
  {
    icon: AlertTriangle,
    title: 'PII Incident',
    description: 'Detect, document, and manage personal data incidents with structured workflows and audit-ready records.'
  },
  {
    icon: HardDrive,
    title: 'Data Processors',
    description: 'Maintain visibility and control over third-party processors handling personal data and associated consent obligations.'
  },
  {
    icon: Network,
    title: 'Downstreams',
    description: 'Track how consent choices propagate across downstream systems, integrations, and partners.'
  },
  {
    icon: Lightbulb,
    title: 'Awareness',
    description: 'Promote internal privacy awareness through documentation, policies, and role-based guidance to strengthen compliance culture.'
  }
];

export default function Capabilities() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Structured Consent Management. Seamless DPDPA Compliance.
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            SecureCMS provides a comprehensive, modular Consent Management System designed to
            help organizations operationalize <span className="font-semibold">DPDPA compliance</span>, strengthen privacy
            governance, and scale data protection programs with ease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl hover:shadow-lg transition-all border border-gray-100 group cursor-pointer"
            >
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
