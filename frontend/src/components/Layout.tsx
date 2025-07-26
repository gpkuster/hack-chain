import React from 'react';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import FloatingElements from '@/components/FloatingElements';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen relative overflow-x-hidden">
        <div className="absolute inset-0 -z-30 bg-background" />
            <div className="absolute inset-0 -z-20">
            <BackgroundAnimation />
            <FloatingElements />
            </div>
        <div className="relative z-10">
        {children}
      <Footer />
    </div>
  </div>
  );
  

export default Layout; 