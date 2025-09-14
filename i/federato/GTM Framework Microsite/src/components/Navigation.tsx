import { motion } from "motion/react";
import { useState, useEffect } from "react";
import federatoLogo from "figma:asset/d33cd8cd931035c4dcc73d7c922893e7b68bed64.png";

const navigationItems = [
  { label: "The Crisis", href: "#crisis" },
  { label: "Root Cause", href: "#root-cause" },
  { label: "Calculator", href: "#calculator" },
  { label: "Strategy", href: "#strategy" },
  { label: "Framework", href: "#framework" },
  { label: "Execution", href: "#execution" },
  { label: "Results", href: "#results" }
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'bg-white/10 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-[#0A459C] p-1.5 rounded-lg">
              <img 
                src={federatoLogo} 
                alt="Federato" 
                className="h-5 w-5 brightness-0 invert"
              />
            </div>
            <span className={`text-lg transition-colors duration-300 ${
              isScrolled ? 'text-[#0A459C]' : 'text-[#0A459C]'
            }`}>
              The Inefficiency Tax
            </span>
          </div>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-[#0A459C]' 
                    : 'text-[#0A459C] hover:text-[#20DFA6]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => scrollToSection('#calendar-section')}
            className={`px-3 py-1.5 rounded-md text-sm transition-all duration-300 ${
              isScrolled
                ? 'text-[#0A459C] hover:bg-[#B3DDFA]/20'
                : 'text-[#0A459C] hover:bg-[#B3DDFA]/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Talk to Ron
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}