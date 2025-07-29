import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Code2, Terminal, Layers, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HomeProps {
  onAuthModalOpen: (mode: 'login' | 'signup') => void;
}

export const Home: React.FC<HomeProps> = ({ onAuthModalOpen }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/code');
    } else {
      onAuthModalOpen('signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] via-[#0C0C0C] to-[#001122]">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Build and Preview{' '}
              <span className="animate-text bg-gradient-to-r from-[#00FFB3] via-[#0074D9] to-[#00FFB3] bg-[length:200%_200%] bg-clip-text text-transparent">
                Code Snippets
              </span>{' '}
              Instantly
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Your personal coding assistant to generate, edit, preview, and format code in real-time with zero setup required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-[#00FFB3] to-[#0074D9] text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Play size={20} fill="currentColor" />
                <span>{isAuthenticated ? 'Start Coding' : 'Get Started'}</span>
              </button>
            </div>


            {/* Features */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 text-gray-300 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <Code2 size={24} className="text-[#00FFB3]" />
                <span className="font-semibold">Real-time Editing</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <Terminal size={24} className="text-[#0074D9]" />
                <span className="font-semibold">Instant Preview</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <Layers size={24} className="text-[#00FFB3]" />
                <span className="font-semibold">Multi-language</span>
              </div>
            </div>
          </div>

          {/* Right Content - Code Editor Mockup */}
          <div className="relative animate-slide-in-right">
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl hover:scale-105 transition-all duration-500">
              {/* Editor Header */}
              <div className="bg-black/60 px-6 py-4 flex items-center space-x-3 border-b border-white/10">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-gray-300 text-sm font-semibold">app.tsx</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#00FFB3] rounded-full animate-pulse"></div>
                  <span className="text-[#00FFB3] text-xs font-semibold">Live</span>
                </div>
              </div>

              {/* Editor Content */}
              <div className="p-6 font-mono text-sm relative">
                <div className="space-y-3">
                  <div className="text-blue-400">
                    <span className="text-purple-400">import</span>{' '}
                    <span className="text-yellow-300">React</span>{' '}
                    <span className="text-purple-400">from</span>{' '}
                    <span className="text-green-400">'react'</span>;
                  </div>
                  <div></div>
                  <div className="text-purple-400">
                    <span className="text-purple-400">function</span>{' '}
                    <span className="text-yellow-300">App</span>() {'{'}
                  </div>
                  <div className="ml-4 text-purple-400">return (</div>
                  <div className="ml-8 text-gray-400">
                    {'<'}<span className="text-red-400">div</span>{' '}
                    <span className="text-blue-400">className</span>=
                    <span className="text-green-400">"app"</span>{'> '}
                  </div>
                  <div className="ml-12 text-gray-400">
                    {'<'}<span className="text-red-400">h1</span>{'>'}
                    <span className="text-white">Hello, CodePlay!</span>
                    {'</'}<span className="text-red-400">h1</span>{'>'}
                  </div>
                  <div className="ml-12 text-gray-400">
                    {'<'}<span className="text-red-400">p</span>{'>'}
                    <span className="text-white">Building amazing things...</span>
                    {'</'}<span className="text-red-400">p</span>{'>'}
                  </div>
                  <div className="ml-8 text-gray-400">
                    {'</'}<span className="text-red-400">div</span>{'>'}
                  </div>
                  <div className="ml-4 text-purple-400">);</div>
                  <div>{'}'}</div>
                  <div></div>
                  <div className="text-purple-400">
                    <span className="text-purple-400">export default</span>{' '}
                    <span className="text-yellow-300">App</span>;
                  </div>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="border-t border-white/10 bg-white p-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Hello, CodePlay!</h2>
                  <p className="text-gray-600 text-lg">Building amazing things...</p>
                  <div className="mt-4 flex justify-center">
                    <div className="bg-gradient-to-r from-[#00FFB3] to-[#0074D9] w-16 h-1 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#00FFB3] to-[#0074D9] text-black px-4 py-2 rounded-xl text-sm font-bold animate-bounce">
              Live Preview
            </div>

            <div className="absolute -bottom-4 -left-4 bg-black/80 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-xl text-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">Running</span>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-[#00FFB3] to-[#0074D9] bg-clip-text text-transparent">
                code faster
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From idea to deployment, our platform provides all the tools you need to build, test, and share your code.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: 'Smart Code Editor',
                description: 'Syntax highlighting, auto-completion, and error detection for 50+ languages.',
              },
              {
                icon: Terminal,
                title: 'Instant Execution',
                description: 'Run your code in real-time with our cloud-based execution environment.',
              },
              {
                icon: Layers,
                title: 'Version Control',
                description: 'Built-in Git integration with branch management and collaboration tools.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                <feature.icon size={48} className="text-[#00FFB3] mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                <div className="mt-6">
                  <Link
                    to="/docs"
                    className="text-[#00FFB3] hover:text-[#0074D9] font-semibold flex items-center space-x-2 transition-colors"
                  >
                    <span>Learn more</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};