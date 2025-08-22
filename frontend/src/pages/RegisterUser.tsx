import { Link } from "react-router-dom";
import { ArrowLeft, User, Users, Building, Shield } from "lucide-react";
import { UserRegistrationForm } from "@/components/auth/userRegistrationForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import FloatingElements from "@/components/FloatingElements";
import hackChainLogo from "/images/logoHackchain.png";

export function RegisterUser() {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background">
      {/* Background Animation - Continuous and always running */}
      <div className="absolute inset-0 z-0 bg-background" />
      <div className="absolute inset-0 z-10">
        <BackgroundAnimation />
        <FloatingElements />
      </div>
      
      {/* Page Content with entrance animations */}
      <div className="relative z-20 animate-in fade-in duration-700">
        {/* Sticky header with full-width border, consistent with RegisterLanding */}
        <div className="z-30 w-full border-b border-white/10 bg-background/80 backdrop-blur mb-6" style={{minHeight: '56px'}}>
    <div className="flex items-center justify-between max-w-6xl mx-auto px-4 pt-6 pb-3">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2 justify-start">
              <img
                src={hackChainLogo}
                alt="Hack Chain Logo"
                className="h-9 w-9 md:h-10 md:w-10 drop-shadow-lg"
              />
              <span className="text-xl md:text-2xl font-bold gradient-text drop-shadow-lg tracking-tight">
                Hack Chain
              </span>
            </div>
            {/* Back to RegisterLanding */}
            <Link to="/register" className="flex items-center gap-2 group">
              <span className="text-sm md:text-base font-medium text-muted-foreground group-hover:text-primary transition-colors">Back to Register</span>
              <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pb-12 animate-in slide-in-from-bottom duration-700 delay-150">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Information */}
          <div className="space-y-8 animate-in slide-in-from-left duration-700 delay-300">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white leading-tight">
                Join the Future of 
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Cybersecurity Certification</span>
              </h1>
              
              <p className="text-lg text-slate-300 leading-relaxed">
                Create your student account and start earning blockchain-verified 
                certificates that prove your expertise in ethical hacking and cybersecurity.
              </p>
            </div>

            {/* Features - Solo Student */}
            <div className="space-y-6">
              {/* Student - Destacado */}
              <div className="flex items-start gap-4 group p-6 glass rounded-xl border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Student Experience</h3>
                  <p className="text-slate-300 mb-4">
                    Join thousands of students earning blockchain-verified certificates in cybersecurity and ethical hacking.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      <span className="text-sm text-slate-400">Complete hands-on cybersecurity courses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      <span className="text-sm text-slate-400">Earn NFT certificates that prove your skills</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      <span className="text-sm text-slate-400">Build a verifiable professional portfolio</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      <span className="text-sm text-slate-400">Connect directly with top recruiters</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action for existing users */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-200">
              <p className="text-sm text-slate-300 mb-3">
                Already have an account?
              </p>
              <Link to="/login">
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700">
                  Sign In Instead
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="flex justify-center animate-in slide-in-from-right duration-700 delay-500">
            <Card className="w-full max-w-md shadow-2xl hover:shadow-3xl transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50 bg-gradient-to-br from-slate-900/95 via-purple-900/20 to-slate-900/95 backdrop-blur-xl">
              <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Create Student Account
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Enter your information to get started with Hack Chain
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <UserRegistrationForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur animate-in slide-in-from-bottom duration-700 delay-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © 2025 Hack Chain. Securing the future of cybersecurity education.
            </p>
            
            <div className="flex gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-slate-400 hover:text-white transition-all duration-200 hover:scale-105"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-slate-400 hover:text-white transition-all duration-200 hover:scale-105"
              >
                Terms of Service
              </Link>
              <Link 
                to="/help" 
                className="text-slate-400 hover:text-white transition-all duration-200 hover:scale-105"
              >
                Help
              </Link>
            </div>
          </div>
        </div>
      </footer>
      
      </div>
    </div>
  );
}