import { Button } from '@/components/ui/button';
import { Rocket, ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section id="dao" className="pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 md:p-16 text-center animate-in fade-in duration-700 slide-in-from-bottom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-in fade-in duration-700 delay-200 slide-in-from-top">
              Start building your{' '}
              <span className="gradient-text">identity</span> today
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed animate-in fade-in duration-700 delay-400 slide-in-from-bottom">
              Join thousands of cybersecurity professionals who have already transformed 
              their careers with blockchain-verified credentials. The future of professional 
              certification is here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-in fade-in duration-700 delay-600 slide-in-from-bottom">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-xl px-12 py-6 neon-glow transition-all duration-300 hover:scale-105"
              >
                <Rocket className="w-6 h-6 mr-3" />
                Get Started Now
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-hover border-white/20 text-xl px-12 py-6"
              >
                View Demo
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass rounded-xl p-6 animate-in fade-in duration-700 delay-700 slide-in-from-left">
                <div className="text-2xl font-bold gradient-text">Free</div>
                <div className="text-muted-foreground">Registration</div>
              </div>
              <div className="glass rounded-xl p-6 animate-in fade-in duration-700 delay-800 slide-in-from-bottom">
                <div className="text-2xl font-bold gradient-text">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
              <div className="glass rounded-xl p-6 animate-in fade-in duration-700 delay-900 slide-in-from-bottom">
                <div className="text-2xl font-bold gradient-text">Instant</div>
                <div className="text-muted-foreground">Verification</div>
              </div>
              <div className="glass rounded-xl p-6 animate-in fade-in duration-700 delay-1000 slide-in-from-right">
                <div className="text-2xl font-bold gradient-text">Lifetime</div>
                <div className="text-muted-foreground">Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;