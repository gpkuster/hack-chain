import { Link } from "react-router-dom";
import { ArrowLeft, Building, Users, Shield, Search, Zap, CheckCircle } from "lucide-react";
import { RecruiterRegistrationForm } from "@/components/auth/recruiterRegistrationForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import FloatingElements from "@/components/FloatingElements";
import hackChainLogo from "/images/logoHackchain.png";

export function RegisterRecruiter() {
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
        <div className="z-30 w-full border-b border-white/10 bg-background/80 backdrop-blur mb-6 min-h-[56px]">
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
                  Find and Verify
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> Top Cybersecurity Talent</span>
                </h1>
                
                <p className="text-lg text-slate-300 leading-relaxed">
                  Join as a recruiter and access the world's largest platform for verified 
                  cybersecurity professionals with blockchain-authenticated skills.
                </p>
              </div>

              {/* Features - Solo Recruiter */}
              <div className="space-y-6">
                {/* Recruiter - Destacado */}
                <div className="flex items-start gap-4 group p-6 glass rounded-xl border border-green-500/30 hover:border-green-500/50 transition-all duration-300">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Recruiter Experience</h3>
                    <p className="text-slate-300 mb-4">
                      Connect with certified cybersecurity professionals and verify their skills with confidence.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                        <span className="text-sm text-slate-400">Access verified talent pool</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                        <span className="text-sm text-slate-400">Verify blockchain certificates instantly</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                        <span className="text-sm text-slate-400">Advanced search and filtering tools</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                        <span className="text-sm text-slate-400">Direct contact with top candidates</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 glass rounded-lg border border-emerald-500/20 hover:border-emerald-500/30 transition-all duration-200">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                      <Search className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-400">Smart Search</h4>
                      <p className="text-xs text-slate-400">Find ideal candidates in seconds</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 glass rounded-lg border border-emerald-500/20 hover:border-emerald-500/30 transition-all duration-200">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-400">Verified Skills</h4>
                      <p className="text-xs text-slate-400">Blockchain-authenticated</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to action for existing users */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-200">
                <p className="text-sm text-slate-300 mb-3">
                  Already have a recruiter account?
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
              <Card className="w-full max-w-md shadow-2xl hover:shadow-3xl transition-all duration-300 border border-green-500/30 hover:border-green-500/50 bg-gradient-to-br from-slate-900/95 via-green-900/20 to-slate-900/95 backdrop-blur-xl">
                <CardHeader className="space-y-1 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Create Recruiter Account
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Enter your information to start finding top cybersecurity talent
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <RecruiterRegistrationForm />
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
                © 2025 Hack Chain. Connecting top cybersecurity talent with leading companies.
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
