import { Button } from '@/components/ui/button';
import { Wallet, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass rounded-3xl p-8 md:p-16 glass-hover">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Show your talent in the{' '}
            <span className="gradient-text">Web3 era</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Revolutionize cybersecurity certification with blockchain technology. 
            Earn NFT-based certificates that prove your expertise in ethical hacking 
            and cybersecurity, verified on the blockchain and recognized by top recruiters worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-lg px-8 py-4 neon-glow transition-all duration-300 hover:scale-105"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="glass-hover border-white/20 text-lg px-8 py-4"
            >
              Learn More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="glass rounded-xl p-6 glass-hover">
              <div className="text-3xl font-bold gradient-text">10k+</div>
              <div className="text-muted-foreground">Certificates Issued</div>
            </div>
            <div className="glass rounded-xl p-6 glass-hover">
              <div className="text-3xl font-bold gradient-text">500+</div>
              <div className="text-muted-foreground">Partner Companies</div>
            </div>
            <div className="glass rounded-xl p-6 glass-hover">
              <div className="text-3xl font-bold gradient-text">98%</div>
              <div className="text-muted-foreground">Job Placement Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;