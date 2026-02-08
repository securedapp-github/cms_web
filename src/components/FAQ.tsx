import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is SecureCMS only a cookie consent tool?',
    answer: 'No. SecureCMS is a comprehensive consent and preference management platform that manages consent across systems, purposes, and user journeys, not just cookies.'
  },
  {
    question: 'Does SecureCMS support Indian privacy regulations?',
    answer: 'Yes. SecureCMS supports compliance readiness for India\'s Digital Personal Data Protection (DPDP) Act, along with global privacy frameworks.'
  },
  {
    question: 'Can SecureCMS integrate with existing tools?',
    answer: 'SecureCMS is built with an API-first architecture and can integrate with common enterprise, marketing, and analytics platforms.'
  },
  {
    question: 'How long does implementation take?',
    answer: 'Implementation timelines vary based on integration complexity, but most organisations can begin consent capture within weeks.'
  },
  {
    question: 'How much does SecureCMS cost?',
    answer: 'Pricing is based on your organization\'s size and requirements. Contact our sales team for a customized quote.'
  },
  {
    question: 'Is SecureCMS registered with India\'s Data Protection Board?',
    answer: 'SecureCMS follows all DPDP Act requirements and stays updated with regulatory developments from the Data Protection Board of India.'
  },
  {
    question: 'What happens to our data if we switch providers?',
    answer: 'You retain full ownership of your consent data. We provide complete data export capabilities and migration support to ensure smooth transitions.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-xl overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have a question?</p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=Abhishek@securedapp.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Write to us
          </a>
        </div>
      </div>
    </section>
  );
}
