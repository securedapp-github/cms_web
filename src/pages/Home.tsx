import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Dashboard from '../components/Dashboard';
import ProductExplanation from '../components/ProductExplanation';
import WhyNecessary from '../components/WhyNecessary';
import Capabilities from '../components/Capabilities';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
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
