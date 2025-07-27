import React from 'react';
import { Github, Linkedin, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom'; // required for SPA links

export const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Docs', href: '/docs' }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/aman3255/UIpilot' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/aman3255' }
  ];

  return (
    <footer className="bg-[#0C0C0C] border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Code2 size={24} className="text-[#00FFB3]" />
              <span className="text-white font-bold text-xl">UI-Pilot</span>
            </div>
            <p className="text-[#CFCFCF] max-w-md">
              The ultimate developer playground. Build, test, and share your code with the world. 
              Experience the future of collaborative coding.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#CFCFCF] hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#CFCFCF] hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg"
                  aria-label={name}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-[#CFCFCF] text-sm">
                Join our community of developers and start building amazing projects today.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 UI-Pilot. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-gray-500 text-sm">Designed especially for developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
