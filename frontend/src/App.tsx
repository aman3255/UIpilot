import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { Docs } from './pages/Docs';

function App() {
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: 'login' | 'signup';
  }>({
    isOpen: false,
    mode: 'login',
  });

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0C0C0C]">
          <Navbar onAuthModalOpen={openAuthModal} />
          
          <Routes>
            <Route path="/" element={<Home onAuthModalOpen={openAuthModal} />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
          
          <Footer />
          
          <AuthModal
            isOpen={authModal.isOpen}
            onClose={closeAuthModal}
            initialMode={authModal.mode}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;