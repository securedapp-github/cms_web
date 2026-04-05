import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute w-full z-50 top-0 border-b border-gray-200/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer group">
            <img
              src="/STRIGHT.png"
              alt="SecureCMS Logo"
              className="h-40 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#problem" className="text-gray-600 hover:text-secondary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Platform</a>
              <a href="#features" className="text-gray-600 hover:text-secondary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</a>
              <a href="#solution" className="text-gray-600 hover:text-secondary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Solutions</a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://cms-app.securedapp.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_4px_15px_rgba(37,99,235,0.25)] transition-all inline-block"
              >
                Try it now
              </motion.a>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center py-2 rounded-md text-gray-600 hover:text-secondary-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass absolute top-16 left-0 right-0 p-4 m-4"
        >
          <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3 flex flex-col">
            <a href="#problem" className="text-gray-700 hover:text-secondary-600 block px-3 py-2 rounded-md text-base font-medium">Platform</a>
            <a href="#features" className="text-gray-700 hover:text-secondary-600 block px-3 py-2 rounded-md text-base font-medium">Features</a>
            <a
              href="https://cms-app.securedapp.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-4 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white px-4 py-3 rounded-xl text-base font-bold text-center inline-block"
            >
              Try it now
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
