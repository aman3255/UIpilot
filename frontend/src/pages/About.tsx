import React from 'react';
import { Code2, Users, Zap, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001F3F] via-[#0C0C0C] to-[#001122] pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#00FFB3] to-[#0074D9] rounded-2xl mb-6">
              <Code2 size={40} className="text-black" />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-8 leading-tight">
            About{' '}
            <span className="bg-gradient-to-r from-[#00FFB3] to-[#0074D9] bg-clip-text text-transparent">
              UI-Pilot
            </span>
          </h1>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12">
            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
              We're building a next-gen AI-powered code assistant that helps developers build, 
              preview, and share code snippets instantly with zero setup. Our mission is to make 
              coding more accessible, efficient, and enjoyable for developers of all skill levels.
            </p>
          </div>
        </div>
      </section>

      {/* Illustration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#00FFB3]/10 to-[#0074D9]/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-16 text-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
              {[
                { icon: Code2, label: 'Smart Coding' },
                { icon: Zap, label: 'Lightning Fast' },
                { icon: Users, label: 'Collaborative' },
                { icon: Heart, label: 'Developer First' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <item.icon size={32} className="text-[#00FFB3]" />
                  </div>
                  <span className="text-gray-300 font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00FFB3]/20 to-[#0074D9]/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 sm:p-12">
                <div className="grid sm:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-black text-white mb-2">50+</div>
                    <div className="text-gray-300">Languages Supported</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">1M+</div>
                    <div className="text-gray-300">Code Snippets Created</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-white mb-2">99.9%</div>
                    <div className="text-gray-300">Uptime Guarantee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-[#00FFB3] to-[#0074D9] bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Empowering developers to focus on what matters most - building amazing software.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Innovation First</h3>
              <p className="text-gray-300 leading-relaxed">
                We leverage cutting-edge AI and cloud technologies to provide developers with 
                tools that were previously impossible, making complex tasks simple and intuitive.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Community Driven</h3>
              <p className="text-gray-300 leading-relaxed">
                Built by developers, for developers. Every feature is designed based on real 
                feedback from our community of passionate coders around the world.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};