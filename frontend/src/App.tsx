import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NFTCreator from "./pages/NFTCreator";
import  RegisterLanding  from "./pages/RegisterLanding";
import { RegisterUser } from "./pages/RegisterUser";
import { RegisterRecruiter } from "./pages/RegisterRecruiter";
import RegisterEducator from "./pages/RegisterEducator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/nft-creator" element={<NFTCreator />} />
          <Route path="/register" element={<RegisterLanding />} />
          <Route path="/register/user" element={<RegisterUser />} />
          <Route path="/register/recruiter" element={<RegisterRecruiter />} />
          <Route path="/register/issuer" element={<RegisterEducator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
