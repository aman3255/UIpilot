import React from 'react';
import { Play, BookOpen, Code2, Terminal, Layers } from 'lucide-react';

interface HeroProps {
  onAuthModalOpen: (mode: 'login' | 'signup') => void;
}

export const Hero: React.FC<HeroProps> = ({ onAuthModalOpen }) => {
  return (
    <section className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Code,{' '}
            <span className="text-[#00FFB3]">Your Playground</span>
          </h1>
          
          <p className="text-xl text-[#CFCFCF] mb-8 leading-relaxed max-w-2xl">
            Build, edit, and run code snippets in real time. Bring your ideas to life with a developer-first experience that makes coding feel effortless.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => onAuthModalOpen('signup')}
              className="bg-[#00FFB3] text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#00FFB3]/90 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105"
            >
              <Play size={20} fill="currentColor" />
              <span>Start Coding</span>
            </button>
            
            <button className="border-2 border-[#CFCFCF] text-[#CFCFCF] px-8 py-4 rounded-2xl font-bold text-lg hover:text-white hover:border-white transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105">
              <BookOpen size={20} />
              <span>Explore Docs</span>
            </button>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 text-[#CFCFCF]">
              <Code2 size={20} className="text-[#00FFB3]" />
              <span>Real-time Editing</span>
            </div>
            <div className="flex items-center space-x-3 text-[#CFCFCF]">
              <Terminal size={20} className="text-[#00FFB3]" />
              <span>Instant Preview</span>
            </div>
            <div className="flex items-center space-x-3 text-[#CFCFCF]">
              <Layers size={20} className="text-[#00FFB3]" />
              <span>Multi-language</span>
            </div>
          </div>
        </div>

        {/* Right Content - Code Editor Mockup */}
        <div className="relative">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
            {/* Editor Header */}
            <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-[#CFCFCF] text-sm">app.tsx</span>
              </div>
            </div>

            {/* Editor Content */}
            <div className="p-6 font-mono text-sm">
              <div className="space-y-2">
                <div className="text-gray-500">1</div>
                <div className="text-gray-500">2</div>
                <div className="text-gray-500">3</div>
                <div className="text-gray-500">4</div>
                <div className="text-gray-500">5</div>
                <div className="text-gray-500">6</div>
                <div className="text-gray-500">7</div>
                <div className="text-gray-500">8</div>
                <div className="text-gray-500">9</div>
                <div className="text-gray-500">10</div>
              </div>
              
              <div className="absolute top-16 left-12 space-y-2">
                <div className="text-blue-400">import <span className="text-yellow-300">React</span> <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;</div>
                <div></div>
                <div className="text-purple-400">function <span className="text-yellow-300">App</span>() {'{'}
                </div>
                <div className="ml-4 text-purple-400">return</div>
                <div className="ml-8 text-gray-400">{'<'}<span className="text-red-400">div</span> <span className="text-blue-400">className</span>=<span className="text-green-400">"app"</span>{'>'}</div>
                <div className="ml-12 text-gray-400">{'<'}<span className="text-red-400">h1</span>{'>'}<span className="text-white">Hello World!</span>{'</'}<span className="text-red-400">h1</span>{'>'}</div>
                <div className="ml-8 text-gray-400">{'</'}<span className="text-red-400">div</span>{'>'}</div>
                <div>{'}'}</div>
                <div></div>
                <div className="text-purple-400">export <span className="text-purple-400">default</span> <span className="text-yellow-300">App</span>;</div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="border-t border-gray-700 bg-white p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hello World!</h2>
                <p className="text-gray-600">Your code is running live!</p>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 bg-[#00FFB3] text-black px-3 py-1 rounded-lg text-sm font-semibold animate-pulse">
            Live Preview
          </div>
          
          <div className="absolute -bottom-4 -left-4 bg-gray-800 border border-gray-600 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Running</span>
          </div>
        </div>
      </div>
    </section>
  );
};