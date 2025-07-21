import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureBlocks from '@/components/FeatureBlocks';
import ValueProposition from '@/components/ValueProposition';
import CallToAction from '@/components/CallToAction';

const Index = () => {
  return (
    <Layout>
      {/* Navigation */}
      <Navbar />
      {/* Main Content */}
      <main>
        <HeroSection />
        <FeatureBlocks />
        <ValueProposition />
        <CallToAction />
      </main>
    </Layout>
  );
};

export default Index;
