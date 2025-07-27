import React from 'react';
import { Calendar, ArrowRight, User, Clock } from 'lucide-react';

export const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'How We Built Our AI Code Assistant',
      excerpt: 'Discover the technical journey behind creating an AI-powered coding companion that understands context and provides intelligent suggestions.',
      author: 'Sarah Chen',
      publishDate: 'July 2025',
      readTime: '8 min read',
      category: 'Engineering',
      featured: true,
    },
    {
      id: 2,
      title: 'The Future of Real-time Code Collaboration',
      excerpt: 'Exploring how modern web technologies enable seamless collaborative coding experiences across different time zones and skill levels.',
      author: 'Alex Rodriguez',
      publishDate: 'June 2025',
      readTime: '6 min read',
      category: 'Product',
      featured: false,
    },
    {
      id: 3,
      title: 'Optimizing Code Execution in the Browser',
      excerpt: 'Deep dive into WebAssembly, Web Workers, and other technologies that make running code in the browser both fast and secure.',
      author: 'Michael Kim',
      publishDate: 'June 2025',
      readTime: '12 min read',
      category: 'Technical',
      featured: false,
    },
    {
      id: 4,
      title: 'Building Accessible Developer Tools',
      excerpt: 'Why accessibility matters in developer tooling and how we ensure CodePlay works for everyone, regardless of their abilities.',
      author: 'Emma Thompson',
      publishDate: 'May 2025',
      readTime: '5 min read',
      category: 'Design',
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001F3F] via-[#0C0C0C] to-[#001122] pt-16">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
            Latest from our{' '}
            <span className="bg-gradient-to-r from-[#00FFB3] to-[#0074D9] bg-clip-text text-transparent">
              blog
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Insights, tutorials, and updates from the CodePlay team. Stay up to date with the latest in developer tooling and AI-assisted coding.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          {blogPosts
            .filter(post => post.featured)
            .map(post => (
              <div
                key={post.id}
                className="bg-gradient-to-r from-[#00FFB3]/10 to-[#0074D9]/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12 hover:scale-105 transition-all duration-500 cursor-pointer group"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-gradient-to-r from-[#00FFB3] to-[#0074D9] text-black px-3 py-1 rounded-full text-sm font-bold">
                    Featured
                  </span>
                  <span className="text-gray-400 text-sm">{post.category}</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 group-hover:text-[#00FFB3] transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-6 text-gray-400 mb-4 sm:mb-0">
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{post.publishDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-[#00FFB3] group-hover:text-[#0074D9] transition-colors font-semibold">
                    <span>Read more</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter(post => !post.featured)
              .map(post => (
                <div
                  key={post.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer group"
                >
                  <div className="mb-4">
                    <span className="text-[#00FFB3] text-sm font-semibold bg-[#00FFB3]/10 px-2 py-1 rounded-lg">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00FFB3] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Calendar size={14} />
                      <span className="text-sm">{post.publishDate}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-[#00FFB3] group-hover:text-[#0074D9] transition-colors">
                      <span className="text-sm font-semibold">Read more</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#00FFB3]/10 to-[#0074D9]/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay in the loop
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest updates, tutorials, and insights delivered straight to your inbox. No spam, just valuable content for developers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00FFB3] transition-colors"
              />
              <button className="bg-gradient-to-r from-[#00FFB3] to-[#0074D9] text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};