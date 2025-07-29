import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  onAuthModalOpen: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAuthModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Blog', href: '/blog' },
  ];

  // Add Code link for authenticated users
  const authenticatedLinks = [
    ...navLinks,
    { name: 'Code', href: '/code' },
  ];

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/20 backdrop-blur-xl border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Code2 size={28} className="text-[#00FFB3]" />
            <span className="text-white font-black text-xl tracking-tight">UI-Pilot</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {(user ? authenticatedLinks : navLinks).map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative font-semibold transition-all duration-300 ${
                  isActiveLink(link.href)
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActiveLink(link.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00FFB3] to-[#0074D9] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors font-medium"
                >
                  <User size={20} />
                  <span>{user.fullName}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-white font-semibold">{user.fullName}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <Link
                      to="/code"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <Code2 size={16} />
                      <span>Code Generator</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <LogOut size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => onAuthModalOpen('login')}
                  className="text-gray-300 border border-gray-600 px-6 py-2.5 rounded-xl font-semibold hover:text-white hover:border-white hover:bg-white/5 transition-all duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => onAuthModalOpen('signup')}
                  className="bg-gradient-to-r from-[#00FFB3] to-[#0074D9] text-black px-6 py-2.5 rounded-xl font-bold hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  Signup
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 rounded-b-2xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {(user ? authenticatedLinks : navLinks).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-3 font-semibold transition-colors rounded-xl ${
                    isActiveLink(link.href)
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <div className="border-t border-white/10 pt-4 mt-4">
                  <div className="px-3 py-2">
                    <p className="text-white font-semibold">{user.fullName}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-white/10 pt-4 mt-4 space-y-2">
                  <button
                    onClick={() => {
                      onAuthModalOpen('login');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-3 text-gray-300 border border-gray-600 rounded-xl font-semibold hover:text-white hover:border-white hover:bg-white/5 transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onAuthModalOpen('signup');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-3 bg-gradient-to-r from-[#00FFB3] to-[#0074D9] text-black rounded-xl font-bold hover:scale-105 transition-all"
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};