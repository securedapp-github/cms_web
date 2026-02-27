import { ShieldCheck, Zap, Lock } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'DPDP Act Compliant',
    description: 'Ensures verifiability, auditability, and privacy compliance as per the Digital Personal Data Protection Act, 2023.',
    color: 'bg-blue-500'
  },
  {
    icon: Zap,
    title: 'Seamless Integration',
    description: 'Modular architecture enabling Data Fiduciaries to integrate consent processes efficiently and securely.',
    color: 'bg-orange-500'
  },
  {
    icon: Lock,
    title: 'User-Centric Design',
    description: 'Empowers Data Principals to manage their entire consent lifecycle with complete control and transparency.',
    color: 'bg-teal-500'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
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
