import Logo from './common/Logo';

export default function Header() {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo size="lg" showText={true} />
          <nav className="flex items-center space-x-6">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
