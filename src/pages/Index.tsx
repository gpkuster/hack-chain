import Navbar from '@/components/Navbar';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import FloatingElements from '@/components/FloatingElements';
import HeroSection from '@/components/HeroSection';
import FeatureBlocks from '@/components/FeatureBlocks';
import ValueProposition from '@/components/ValueProposition';
import CallToAction from '@/components/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background Effects */}
      <BackgroundAnimation />
      <FloatingElements />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <FeatureBlocks />
        <ValueProposition />
        <CallToAction />
      </main>
      
      {/* Footer */}
      <footer className="py-12 glass border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="gradient-text text-2xl font-bold mb-4">HackChain</div>
          <p className="text-muted-foreground">
            Revolutionizing cybersecurity certification with blockchain technology
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            © 2024 HackChain. Built on the blockchain for the future.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
