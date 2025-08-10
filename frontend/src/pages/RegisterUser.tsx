import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Users, Award } from "lucide-react";

import { UserRegistrationForm } from "@/components/auth/userRegistrationForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import FloatingElements from "@/components/FloatingElements";

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
        {/* Navigation Header */}
        <div className="container mx-auto px-4 py-6 animate-in slide-in-from-top duration-500">
        <div className="flex items-center justify-between">
          {/* Logo and Brand - Left Side */}
          <div className="flex items-center gap-3">
            <img 
              src="/images/logoHackchain.png" 
              alt="Hack Chain" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-white">
              Hack Chain
            </span>
          </div>
          
          {/* Back Button - Right Side */}
          <Link to="/">
            <Button variant="ghost" className="gap-2 hover:bg-slate-800 text-slate-300 hover:text-white transition-all duration-200 hover:scale-105">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
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

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 border border-blue-500/30">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Blockchain Verified
                  </h3>
                  <p className="text-slate-300">
                    Your certificates are stored as NFTs, making them immutable and verifiable anywhere.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 border border-green-500/30">
                  <Award className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Industry Recognition
                  </h3>
                  <p className="text-slate-300">
                    Certificates from verified educators and institutions in cybersecurity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 border border-purple-500/30">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Connect with Recruiters
                  </h3>
                  <p className="text-slate-300">
                    Showcase your verified skills to employers and cybersecurity recruiters.
                  </p>
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
            <Card className="w-full max-w-md shadow-2xl hover:shadow-3xl transition-all duration-300 border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
              <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-white">
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