import { ArrowRight, User, Award, Building } from 'lucide-react';

const ValueProposition = () => {
  return (
    <section id="community" className="pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From learning to employment - your journey in the Web3 cybersecurity ecosystem
          </p>
        </div>
        
        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
            
            {/* Step 1: Student */}
            <div className="flex-1 text-center group">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Student</h3>
              <p className="text-muted-foreground">
                Complete cybersecurity courses and pass rigorous practical assessments
              </p>
            </div>
            
            {/* Arrow 1 */}
            <div className="hidden lg:block">
              <ArrowRight className="w-8 h-8 text-primary animate-pulse-neon" />
            </div>
            
            {/* Step 2: NFT Certificate */}
            <div className="flex-1 text-center group">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 neon-glow">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">NFT Certificate</h3>
              <p className="text-muted-foreground">
                Receive blockchain-verified NFT certificate proving your expertise
              </p>
            </div>
            
            {/* Arrow 2 */}
            <div className="hidden lg:block">
              <ArrowRight className="w-8 h-8 text-primary animate-pulse-neon" />
            </div>
            
            {/* Step 3: Recruiter */}
            <div className="flex-1 text-center group">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Building className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Recruiter</h3>
              <p className="text-muted-foreground">
                Employers instantly verify credentials and hire top talent
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="glass rounded-xl p-6 inline-block">
              <p className="text-lg text-muted-foreground">
                <span className="gradient-text font-semibold">Tamper-proof</span> • 
                <span className="gradient-text font-semibold"> Instant verification</span> • 
                <span className="gradient-text font-semibold"> Global recognition</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;