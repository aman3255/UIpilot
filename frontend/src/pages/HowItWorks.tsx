import React from 'react';
import { Upload, CheckCircle, Table, Download, ArrowRight, Lock, Sparkles, Code2, Monitor } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: Lock,
      title: "Sign Up or Log In",
      description: "Start by authenticating your identity using a secure Sign In or Sign Up flow. This allows you to generate, edit, and manage your code sessions.",
      visual: (
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-400 ml-2">Authentication</span>
            </div>
            <div className="space-y-2">
              <input 
                type="text" 
                placeholder="Email address" 
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded text-xs text-gray-300"
                disabled
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded text-xs text-gray-300"
                disabled
              />
              <button className="w-full py-2 bg-[#00FFB3] text-black rounded font-semibold text-xs">
                Sign In
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      icon: Sparkles,
      title: "Enter Your Prompt",
      description: "Type a natural language prompt like 'Create a simple HTML button with CSS hover effect'. Our LLM instantly interprets it and writes accurate, clean code.",
      visual: (
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles size={16} className="text-[#915EFF]" />
              <span className="text-xs text-gray-400">AI Prompt</span>
            </div>
            <div className="bg-gray-800/50 border border-gray-600 rounded p-3">
              <div className="text-xs text-gray-300 mb-2">
                <span className="text-[#00FFB3]">You:</span> Create a simple HTML button with CSS hover effect
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#915EFF] rounded-full animate-pulse"></div>
                <span className="text-xs text-[#915EFF]">AI is generating...</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      icon: Code2,
      title: "Edit, Preview & Export",
      description: "Tweak the generated code in real-time, see the live preview side-by-side, then copy or download it as needed. Your playground, your rules.",
      visual: (
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
          <div className="grid grid-cols-2 gap-2">
            {/* Code Editor Side */}
            <div className="bg-gray-800/50 rounded p-2">
              <div className="text-xs text-gray-400 mb-2">Code Editor</div>
              <div className="space-y-1 text-xs font-mono">
                <div><span className="text-blue-400">&lt;button</span> <span className="text-yellow-300">class=</span><span className="text-green-400">"btn"</span><span className="text-blue-400">&gt;</span></div>
                <div className="ml-2 text-gray-300">Click me</div>
                <div><span className="text-blue-400">&lt;/button&gt;</span></div>
              </div>
            </div>
            {/* Preview Side */}
            <div className="bg-gray-800/50 rounded p-2">
              <div className="text-xs text-gray-400 mb-2">Live Preview</div>
              <div className="flex items-center justify-center h-12">
                <button className="px-4 py-2 bg-[#00FFB3] text-black rounded text-xs font-semibold 
                :bg-[#00FFB3]/90 transition-colors">
                  Click me
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#00040f] to-[#001a2d] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Hero Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#00FFB3] to-[#915EFF] bg-clip-text text-transparent animate-pulse">
            How It Works
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Build code with prompts. Edit. Preview. Copy. Deploy.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-[#00FFB3] to-[#915EFF] mx-auto rounded-full mt-6"></div>
        </div>

        {/* Steps */}
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 hover:scale-[1.02] hover:bg-white/10 transition-all duration-300 hover:border-[#00FFB3]/30 hover:shadow-lg hover:shadow-[#00FFB3]/10"
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-[#00FFB3] to-[#915EFF] rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg">
                {step.id}
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#00FFB3]/20 to-[#915EFF]/20 rounded-xl flex items-center justify-center group-hover:from-[#00FFB3]/30 group-hover:to-[#915EFF]/30 transition-all duration-300">
                    <step.icon size={28} className="text-[#00FFB3] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00FFB3] transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>

                {/* Visual */}
                <div className="mt-6">
                  {step.visual}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00FFB3]/5 to-[#915EFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="px-12 py-4 bg-gradient-to-r from-[#00FFB3] to-[#915EFF] text-black font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#00FFB3]/25 hover:shadow-2xl group">
            <span className="flex items-center space-x-2">
              <span>Try It Now</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </button>
          <p className="text-gray-400 mt-4 text-sm">
            No credit card required • Start building in seconds
          </p>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#00FFB3]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#915EFF]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#00FFB3]/5 to-[#915EFF]/5 rounded-full blur-3xl"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00FFB3] rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-[#915EFF] rounded-full animate-ping delay-500"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default HowItWorks;