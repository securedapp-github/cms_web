import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionDivider from './components/SectionDivider';
import Problem from './components/Problem';
import Solution from './components/Solution';
import DDPPAct from './components/DDPPAct';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Industries from './components/Industries';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-gray-900">
      <Navbar />
      <main>
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-4 font-bold">
            Trusted by Enterprise Security Teams
          </p>
        <Hero />
        <SectionDivider label="THREATS" />
        <Problem />
        <SectionDivider label="SOLUTIONS" />
        <Solution />
        <SectionDivider label="COMPLIANCE" />
        <DDPPAct />
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Compliance as a Multiplier</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Beyond avoiding penalties, our CMS builds brand trust and accelerates enterprise sales through verified data privacy.
          </p>
        </div>
        <Benefits />
        <SectionDivider label="PROCESS" />
        <HowItWorks />
        <SectionDivider label="FEATURES" />
        <Features />
        <SectionDivider label="ECOSYSTEM" />
        <Industries />
        <CTA />
        <SectionDivider label="FAQS" />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

export default App;
