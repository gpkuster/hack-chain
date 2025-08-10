import { Button } from '@/components/ui/button';
import { Wallet, ArrowRight, UserPlus, Award, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass rounded-3xl p-8 md:p-16 glass-hover animate-in fade-in duration-700 slide-in-from-bottom">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-in fade-in duration-700 delay-200 slide-in-from-bottom">
            Show your talent in the{' '}
            <span className="gradient-text">Web3 era</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed animate-in fade-in duration-700 delay-400 slide-in-from-bottom">
            Revolutionize cybersecurity certification with blockchain technology. 
            Earn NFT-based certificates that prove your expertise in ethical hacking 
            and cybersecurity, verified on the blockchain and recognized by top recruiters worldwide.
          </p>
          
                    {/* Three-tier button hierarchy */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-in fade-in duration-700 delay-600 slide-in-from-bottom">
            {/* Primary CTA */}
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-full text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 glow-effect animate-in fade-in duration-700 delay-700 slide-in-from-bottom">
                <UserPlus className="mr-2 h-5 w-5" />
                Get Started Free
              </Button>
            </Link>
            
            {/* Secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 animate-in fade-in duration-700 delay-800 slide-in-from-bottom">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:border-purple-400"
              >
                <Award className="mr-2 h-4 w-4" />
                View Certificates
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-muted-foreground hover:text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </div>
          
                    {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-in fade-in duration-700 delay-1000 slide-in-from-bottom">
            <div className="glass rounded-2xl p-6 glass-hover animate-in fade-in duration-700 delay-1100 slide-in-from-left">
              <div className="text-3xl font-bold text-purple-400 mb-2">10K+</div>
              <div className="text-muted-foreground">Certificates Issued</div>
            </div>
            <div className="glass rounded-2xl p-6 glass-hover animate-in fade-in duration-700 delay-1200 slide-in-from-bottom">
              <div className="text-3xl font-bold text-pink-400 mb-2">500+</div>
              <div className="text-muted-foreground">Partner Companies</div>
            </div>
            <div className="glass rounded-2xl p-6 glass-hover animate-in fade-in duration-700 delay-1300 slide-in-from-right">
              <div className="text-3xl font-bold text-cyan-400 mb-2">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;