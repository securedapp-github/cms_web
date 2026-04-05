import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Discord',
      href: 'https://discord.com/invite/pqDC8ddnYQ',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z" />
        </svg>
      )
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/secure_dapp',
      icon: (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/securedapp/posts/?feedView=all',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065c0-1.138.92-2.063 2.063-2.063c1.14 0 2.064.925 2.064 2.063c0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
        </svg>
      )
    },
    {
      name: 'Telegram',
      href: 'https://telegram.me/securedappcommunity',
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.441-.168.571-.532 1.341-1.181 1.341-.444 0-.822-.322-1.157-.571l-2.311-1.728-1.284 1.238c-.168.168-.312.312-.556.312-.294 0-.444-.222-.444-.555v-2.012c0-.5-.11-.84-.537-1.178l-5.644-4.2c-.378-.29-.68-.507-.68-.86s.322-.507.7-.684l14.61-5.61c.11-.044.222-.067.333-.067.322 0 .667.222.667.555 0 .089-.011.178-.033.267z" />
        </svg>
      )
    },
  ];

  const columns = [
    {
      title: 'Product',
      links: [
        { name: 'Solidity Shield Scan', href: 'https://securedapp.io/solidity-shield' },
        { name: 'Secure Watch', href: 'https://securedapp.io/real-time-blockchain-threat-monitoring' },
        { name: 'Secure CMS (Consent)', href: 'https://securedapp.io/secure-cms' },
        { name: 'Audit Express', href: 'https://securedapp.io/auditexpress/home' },
        { name: 'Secure Trace', href: 'https://securedapp.io/blockchain-forensic-investigation-tool' },
        { name: 'Secure Pad', href: 'https://securedapp.io/secure-pad' },
        { name: 'PQC Suite', href: 'https://securedapp.io/pqc' },
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Audit', href: 'https://securedapp.io/smart-contract-audit' },
        { name: 'Security', href: 'https://securedapp.io/web3-security' },
        { name: 'Regulatory Solutions', href: 'https://securedapp.io/crypto-compliance-aml' },
        { name: 'Training & Education', href: 'https://securedapp.io/levelup-academy' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: 'https://securedapp.io/about' },
        { name: 'Authors', href: 'https://securedapp.io/authors' },
        { name: 'Media', href: 'https://securedapp.io/media' },
        { name: 'Career', href: 'https://securedapp.gitbook.io/securedapp-launchpad/careers' },
        { name: 'Contact Us', href: 'https://securedapp.gitbook.io/securedapp-launchpad/contact-us' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blogs', href: 'https://blog.securedapp.io/' },
        { name: 'Audits', href: 'https://securedapp.io/audits' },
        { name: 'Vulnerabilities', href: 'https://securedapp.io/solidity-shield-vulnerabilities' },
        { name: 'Github', href: 'https://github.com/securedapp-github' },
        { name: 'Workplace Policy', href: 'https://securedapp.gitbook.io/securedapp-launchpad/workplace-policy' },
        { name: 'Shipping & Delivery Policy', href: 'https://securedapp.gitbook.io/securedapp-launchpad/shipping-and-delivery-policy' },
        { name: 'Pricing Policy', href: 'https://securedapp.gitbook.io/securedapp-launchpad/pricing-policy' },
        { name: 'Cancellation & Refunds', href: 'https://securedapp.gitbook.io/securedapp-launchpad/cancellation-and-refund-policy' },
        { name: 'Whitepaper', href: 'https://securedapp.gitbook.io/securedapp-launchpad' },
      ]
    },
  ];

  return (
    <footer className="bg-secondary-700 text-white py-16 px-4 md:px-8 lg:px-12 border-t border-blue-600">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <img
                src="/STRIGHT.png"
                alt="SecureCMS Logo"
                className="h-35 w-auto rounded-md shadow-sm opacity-100 transition-opacity"
              />
            </div>

            <div className="flex items-center gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-white hover:opacity-80 transition-all transform hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Columns Group */}
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {columns.map((column) => (
              <div key={column.title} className="text-left">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">{column.title}</h3>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? "_blank" : undefined}
                        rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        className="text-sm text-white hover:text-white/80 hover:translate-x-1 inline-block transition-all"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white">
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
          <p>&copy; {currentYear}, Vettedcode Technologies India Pvt. Ltd.. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
