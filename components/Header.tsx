import React, { useState, useEffect, FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { href: '/#about', label: 'About', section: 'about' },
    { href: '/#news', label: 'News', section: 'news' },
    { href: '/#research', label: 'Research', section: 'research' },
    { href: '/#projects', label: 'Projects', section: 'projects' },
    { href: '/blog', label: 'Blog', section: null },
    { href: '/#contact', label: 'Contact', section: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    setIsOpen(false);

    if (link.href === '/blog') {
      navigate('/blog');
      return;
    }

    if (link.section) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(link.section!);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(link.section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  // Only the home page has a dark banner behind the header; elsewhere the top is
  // white paper, so the header must use its solid (dark-text) style immediately.
  const overHero = location.pathname === '/' && !isScrolled && !isOpen;
  const solid = !overHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? 'bg-paper/85 backdrop-blur-md border-b border-hair shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="/"
            className={`text-xl font-semibold tracking-tight font-heading transition-colors ${
              solid ? 'text-ink' : 'text-white drop-shadow'
            }`}
          >
            K. Hiratsuka
          </a>
          <nav className="hidden md:flex space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={`text-sm font-medium transition-colors ${
                  solid
                    ? 'text-ink-light hover:text-accent'
                    : 'text-white/90 hover:text-white drop-shadow'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className={`focus:outline-none transition-colors ${
                solid ? 'text-ink' : 'text-white drop-shadow'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 border-b border-hair' : 'max-h-0'
        } ${isOpen ? 'bg-paper/95 backdrop-blur-md' : 'bg-transparent'}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="block px-3 py-2 rounded-md text-base font-medium text-ink-light hover:text-accent hover:bg-accent-soft"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
