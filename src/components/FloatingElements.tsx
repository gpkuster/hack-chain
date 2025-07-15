import { Code, Lock, Shield, Zap, Database, Cpu } from 'lucide-react';

const FloatingElements = () => {
  const elements = [
    { Icon: Code, position: 'top-20 left-10', delay: '0s' },
    { Icon: Lock, position: 'top-40 right-20', delay: '1s' },
    { Icon: Shield, position: 'top-60 left-1/4', delay: '2s' },
    { Icon: Zap, position: 'bottom-40 right-10', delay: '3s' },
    { Icon: Database, position: 'bottom-60 left-20', delay: '4s' },
    { Icon: Cpu, position: 'top-80 right-1/3', delay: '5s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map(({ Icon, position, delay }, index) => (
        <div
          key={index}
          className={`absolute ${position} animate-float opacity-20`}
          style={{ animationDelay: delay }}
        >
          <Icon 
            className="w-8 h-8 text-primary animate-pulse-neon" 
            style={{ animationDelay: delay }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;