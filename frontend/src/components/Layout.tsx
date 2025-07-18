import React from 'react';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import FloatingElements from '@/components/FloatingElements';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-background relative overflow-x-hidden">
    <BackgroundAnimation />
    <FloatingElements />
    {children}
    <Footer />
  </div>
);

export default Layout; 