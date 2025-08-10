const TestBackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Test - Simple colored background to see if it shows */}
      <div className="absolute inset-0 bg-purple-900/10" />
      
      {/* Test - Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Test - Simple moving lines */}
      <div className="absolute top-0 left-0 w-full h-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 bg-purple-500 animate-data-flow opacity-60"
            style={{
              top: `${30 + i * 20}%`,
              animationDelay: `${i * 3}s`,
              width: '300px',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TestBackgroundAnimation;
