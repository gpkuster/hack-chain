import { Award, UserCheck, Vote, Shield, Zap, Globe } from 'lucide-react';

const FeatureBlocks = () => {
  const features = [
    {
      Icon: Award,
      title: 'NFT Certificates',
      description: 'Blockchain-verified credentials that can\'t be forged or faked. Own your achievements forever.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      Icon: UserCheck,
      title: 'Recruiter Verification',
      description: 'Instant credential verification for employers. No more fake certificates or lengthy background checks.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      Icon: Vote,
      title: 'DAO Governance',
      description: 'Community-driven platform decisions. Vote on new certifications, standards, and platform improvements.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      Icon: Shield,
      title: 'Security First',
      description: 'Built by cybersecurity experts for cybersecurity professionals. Maximum security standards.',
      color: 'from-orange-500 to-red-500',
    },
    {
      Icon: Zap,
      title: 'Instant Verification',
      description: 'Real-time credential verification powered by smart contracts. No waiting, no paperwork.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      Icon: Globe,
      title: 'Global Recognition',
      description: 'Certificates recognized worldwide by leading cybersecurity firms and tech companies.',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section id="certificates" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-in fade-in duration-700 slide-in-from-top">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="gradient-text">HackChain</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The future of cybersecurity certification is here. Built on blockchain, 
            verified by experts, and recognized globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`glass rounded-2xl p-8 glass-hover group animate-in fade-in duration-700 slide-in-from-bottom delay-${100 + index * 100}`}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.Icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBlocks;