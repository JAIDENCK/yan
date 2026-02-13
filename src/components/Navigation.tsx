import { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onAdminClick: () => void;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Voice Acting', href: '#voice-acting' },
  { label: 'Credits', href: '#credits' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation({ onAdminClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-soft py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('#home')}
              className="text-xl font-bold text-coral hover:text-coral-dark transition-colors"
            >
              YanbieVA
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeSection === item.href.slice(1)
                      ? 'bg-coral/10 text-coral'
                      : 'text-foreground/70 hover:text-coral hover:bg-coral/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Admin Button */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onAdminClick}
                className="text-foreground/50 hover:text-coral hover:bg-coral/10"
              >
                <Lock size={18} />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onAdminClick}
                className="text-foreground/50 hover:text-coral"
              >
                <Lock size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground/70"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-4 right-4 bg-white rounded-2xl shadow-coral-lg p-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                    activeSection === item.href.slice(1)
                      ? 'bg-coral/10 text-coral'
                      : 'text-foreground/70 hover:bg-coral/5 hover:text-coral'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
