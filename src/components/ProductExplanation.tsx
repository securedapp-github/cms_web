export default function ProductExplanation() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What is SecureCMS?</h2>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-lg">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              SecureCMS is a centralised consent management system that allows organisations to
              collect, store, update, and synchronise user consent and privacy preferences across
              their digital ecosystem. It provides a single, auditable source of truth for consent
              data, ensuring that user choices are respected consistently across all platforms and
              processing activities.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The platform supports compliance readiness for regulations such as GDPR, CCPA, CPRA,
              and India's Digital Personal Data Protection (DPDP) Act by enabling lawful consent
              capture, purpose-based controls, and traceable consent records.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              SecureCMS is designed to be equally effective for legal, compliance, marketing, and
              engineering teams, removing operational silos and simplifying privacy governance at scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
