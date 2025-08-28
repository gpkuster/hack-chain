import { useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Award, Building, ArrowRight, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import FloatingElements from "@/components/FloatingElements";
import hackChainLogo from "/images/logoHackchain.png";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

// Scroll to top on mount
const RegisterLanding = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);
  }, []);
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-background">
      {/* Background animation and floating elements */}
      <BackgroundAnimation />
      <FloatingElements />
      <div className="z-30 w-full border-b border-white/10 sticky top-0 bg-background/80 backdrop-blur" style={{minHeight: '56px'}}>
        {/* Header container aligned with main content */}
  <div className="flex items-center justify-between max-w-6xl mx-auto px-4 pt-6 pb-3">
          <div className="flex items-center gap-2">
            <img
              src={hackChainLogo}
              alt="Hack Chain Logo"
              className="h-9 w-9 md:h-10 md:w-10 drop-shadow-lg"
            />
            <span className="text-xl md:text-2xl font-bold gradient-text drop-shadow-lg tracking-tight">
              Hack Chain
            </span>
          </div>
          {/* Back to Home */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-sm md:text-base font-medium text-muted-foreground group-hover:text-primary transition-colors">Back to Home</span>
            <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>

      <div className="animate-in fade-in duration-700 slide-in-from-bottom">
        <div className="z-10 flex flex-col items-start max-w-4xl mx-auto px-4 mt-8 mb-8">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            Join the Future of{' '}
            <span className="gradient-text">Cybersecurity Certification</span>
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl">
            Choose your role and start your journey with blockchain-verified certificates in ethical hacking and cybersecurity.
          </p>
        </div>

        <div className="z-10 w-full flex flex-col flex-1 max-w-6xl px-4 space-y-12 mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Student Card */}
          {/* Student Card */}
            <Card className="relative overflow-hidden glass glass-hover border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 neon-glow-subtle">
              <CardHeader className="space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl gradient-text">Student</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Learn cybersecurity and earn blockchain-verified certificates
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <span>Earn NFT certificates</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <span>Build verifiable skill portfolio</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <span>Connect with recruiters</span>
                  </div>
                </div>
                <Link to="/register/user" className="block">
                  <Button className="w-full gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-500/90 hover:to-pink-500/90 neon-glow transition-all duration-300 hover:scale-105">
                    Join as Student
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

          {/* Educator Card */}
            <Card className="relative overflow-hidden glass glass-hover border-blue-500/30 hover:border-cyan-500/50 transition-all duration-300 neon-glow-subtle">
              <CardHeader className="space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Educator</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Issue verified certificates and build your teaching reputation
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    <span>Issue NFT certificates</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    <span>Track student progress</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    <span>Verified educator status</span>
                  </div>
                </div>
                <Link to="/register/issuer" className="block">
                  <Button 
                    className="w-full gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-500/90 hover:to-cyan-500/90 neon-glow transition-all duration-300 hover:scale-105"
                  >
                    Join as Educator
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="text-center">
                  <span className="text-xs text-muted-foreground px-3 py-1 rounded-full glass">
                    * Requires manual verification
                  </span>
                </div>
              </CardContent>
            </Card>

          {/* Recruiter Card */}
            <Card className="relative overflow-hidden glass glass-hover border-green-500/30 hover:border-emerald-500/50 transition-all duration-300 neon-glow-subtle">
              <CardHeader className="space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Recruiter</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Find and verify top cybersecurity talent with confidence
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                    <span>Search verified talent</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                    <span>Verify skill certificates</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                    <span>Advanced filtering tools</span>
                  </div>
                </div>
                <Link to="/register/recruiter" className="block">
                  <Button 
                    className="w-full gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-500/90 hover:to-emerald-500/90 neon-glow transition-all duration-300 hover:scale-105"
                  >
                    Join as Recruiter
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-primary/20">
          </div>


          <div className="flex flex-col gap-24">
            <div className="text-center glass rounded-xl p-6 border border-primary/20 mt-1 mb-24">
              <p className="text-muted-foreground mb-4">
                Already have an account?
              </p>
              <Link to="/login">
                <Button variant="outline" className="glass glass-hover">
                  Sign In Instead
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-white/10 bg-background">
        <Footer />
      </div>
    </div>
  );
};

export default RegisterLanding;