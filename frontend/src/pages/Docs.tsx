import React, { useState } from 'react';
import { 
  BookOpen, 
  Code2, 
  Shield, 
  Webhook, 
  HelpCircle, 
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

export const Docs: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const sidebarItems = [
    { id: 'getting-started', label: 'Getting Started', icon: BookOpen },
    { id: 'api-reference', label: 'API Reference', icon: Code2 },
    { id: 'authentication', label: 'Authentication', icon: Shield },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  ];

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Getting Started</h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Welcome to the Docs – Learn how to integrate, run, and extend your AI Code Assistant in minutes.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#00FFB3]/10 to-[#0074D9]/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
              <p className="text-gray-300 mb-4">
                Get up and running with CodePlay in less than 5 minutes.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00FFB3] text-black rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h3 className="text-white font-semibold">Create an Account</h3>
                    <p className="text-gray-400">Sign up for a free CodePlay account to get started.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00FFB3] text-black rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h3 className="text-white font-semibold">Get Your API Key</h3>
                    <p className="text-gray-400">Navigate to your dashboard and generate your first API key.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00FFB3] text-black rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h3 className="text-white font-semibold">Make Your First Request</h3>
                    <p className="text-gray-400">Use our REST API or SDK to start building.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Installation</h3>
                <button
                  onClick={() => copyToClipboard('npm install @codeplay/sdk', 'install')}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'install' ? <Check size={16} /> : <Copy size={16} />}
                  <span className="text-sm">{copiedCode === 'install' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-[#00FFB3] font-mono text-sm overflow-x-auto">
                <code>npm install @codeplay/sdk</code>
              </pre>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Basic Usage</h3>
                <button
                  onClick={() => copyToClipboard(`import { CodePlay } from '@codeplay/sdk';

const codeplay = new CodePlay({
  apiKey: 'your-api-key-here'
});

// Execute code
const result = await codeplay.execute({
  language: 'javascript',
  code: 'console.log("Hello, World!");'
});

console.log(result.output);`, 'usage')}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'usage' ? <Check size={16} /> : <Copy size={16} />}
                  <span className="text-sm">{copiedCode === 'usage' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
                <code>{`import { CodePlay } from '@codeplay/sdk';

const codeplay = new CodePlay({
  apiKey: 'your-api-key-here'
});

// Execute code
const result = await codeplay.execute({
  language: 'javascript',
  code: 'console.log("Hello, World!");'
});

console.log(result.output);`}</code>
              </pre>
            </div>
          </div>
        );

      case 'api-reference':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">API Reference</h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Complete reference for the CodePlay REST API.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Base URL</h2>
              <div className="bg-black/40 rounded-xl p-4">
                <code className="text-[#00FFB3]">https://api.codeplay.dev/v1</code>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Execute Code</h3>
                <div className="space-y-4">
                  <div>
                    <span className="bg-green-500 text-black px-2 py-1 rounded text-sm font-bold mr-3">POST</span>
                    <code className="text-gray-300">/execute</code>
                  </div>
                  
                  <p className="text-gray-300">Execute code in a secure sandbox environment.</p>
                  
                  <div className="bg-black/40 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-2">Request Body</h4>
                    <pre className="text-gray-300 text-sm overflow-x-auto">
                      <code>{`{
  "language": "javascript",
  "code": "console.log('Hello, World!');",
  "timeout": 30000
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'authentication':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Authentication</h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Learn how to authenticate your requests to the CodePlay API.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">API Keys</h2>
              <p className="text-gray-300 mb-4">
                CodePlay uses API keys to authenticate requests. You can generate and manage your API keys from your dashboard.
              </p>
              
              <div className="bg-black/40 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-2">Authorization Header</h4>
                <pre className="text-gray-300 text-sm">
                  <code>Authorization: Bearer your-api-key-here</code>
                </pre>
              </div>
            </div>
          </div>
        );

      case 'webhooks':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Webhooks</h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Set up webhooks to receive real-time notifications about events in your CodePlay account.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Webhook Events</h2>
              <div className="space-y-3">
                {[
                  'code.executed',
                  'project.created',
                  'project.updated',
                  'user.registered'
                ].map((event) => (
                  <div key={event} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00FFB3] rounded-full"></div>
                    <code className="text-gray-300">{event}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'faqs':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Common questions and answers about CodePlay.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: 'What programming languages are supported?',
                  answer: 'CodePlay supports 50+ programming languages including JavaScript, Python, Java, C++, Go, Rust, and many more.'
                },
                {
                  question: 'Is there a free tier available?',
                  answer: 'Yes! We offer a generous free tier that includes 1000 code executions per month and access to all core features.'
                },
                {
                  question: 'How secure is code execution?',
                  answer: 'All code is executed in isolated, secure sandbox environments with strict resource limits and network restrictions.'
                },
                {
                  question: 'Can I integrate CodePlay with my existing tools?',
                  answer: 'Absolutely! We provide REST APIs, SDKs, and webhooks to integrate with your existing development workflow.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001F3F] via-[#0C0C0C] to-[#001122] pt-16">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-[#00FFB3]/10 to-[#0074D9]/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Documentation</h1>
              <p className="text-gray-300 mt-2">Everything you need to build with CodePlay</p>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-gray-300 hover:text-white transition-colors"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className={`lg:block ${isSidebarOpen ? 'block' : 'hidden'} w-full lg:w-64 flex-shrink-0`}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sticky top-24">
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-[#00FFB3]/20 to-[#0074D9]/20 text-white border border-[#00FFB3]/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                      {activeSection === item.id && (
                        <ChevronRight size={16} className="ml-auto" />
                      )}
                    </button>
                  );
                })}
              </nav>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <ExternalLink size={16} />
                  <span>API Status</span>
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};