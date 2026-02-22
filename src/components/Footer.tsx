import { useState } from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuizTrigger from './Quiz/QuizTrigger';
import ProjectInquiryModal from './ProjectInquiryModal';

export default function Footer() {
  const currentYear = 2024; // Fixed as per requirement "© 2024"
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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-transparent hover:opacity-80 transition-opacity"
    >
      {children}
    </a>
  );

  return (
    <footer className="bg-[#1d4ed8] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between mb-16">
          {/* Left Section: Logo & Socials */}
          <div className="mb-10 lg:mb-0 lg:w-1/4">
            <div className="flex items-center space-x-2 mb-8">
              <div className="text-white"> {/* Custom logo color to match screenshot rough idea if needed, or keeping icon usage */}
                <Shield className="w-8 h-8 text-white fill-white/20" />
              </div>
              <span className="text-xl font-bold text-white">
                SecureCMS
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {/* X / Twitter */}
              <SocialIcon href="https://x.com/secure_dapp">
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </SocialIcon>
              {/* LinkedIn */}
              <SocialIcon href="https://www.linkedin.com/company/securecms/posts/?feedView=all&viewAsMember=true">
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.224 0z" /></svg>
              </SocialIcon>
              {/* Telegram */}
              <SocialIcon href="https://telegram.me/securedappcommunity">
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
              </SocialIcon>
            </div>
          </div>

          <div className="mt-8">
            <QuizTrigger />
          </div>
        </div>

        {/* Right Section: 3 Columns */}
        <div className="flex-1 flex flex-col md:flex-row justify-end space-y-8 md:space-y-0 md:space-x-16 lg:space-x-24">
          {/* Product Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Product</h3>
            <ul className="space-y-3">
              {products.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setIsInquiryModalOpen(true)}
                  className="text-white/80 hover:text-white transition-colors text-sm text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/40">•</span>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
          <div className="text-center md:text-right">
            © {currentYear}, Vettedcode Technologies India Pvt. Ltd.. All rights reserved
          </div>
        </div>
      </div>

      <ProjectInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </footer>
  );
}
