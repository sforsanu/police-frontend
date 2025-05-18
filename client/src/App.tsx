import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AuthPage from "@/pages/auth-page";
import UsersPage from "@/pages/users";
import LandingPage from "@/pages/landing-page";
import ContactPage from "@/pages/contact-page";
import WorkflowPage from "@/pages/workflow-page";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/protected-route";
import Upload from "./pages/upload";
import WorkflowAuth from "./pages/workflow-auth";
import CaseManagementPage from "./pages/case-management";
import InsuranceViewPage from "./pages/insurance-view";
import SettingsPage from "./pages/settings";
import HelpSupportPage from "./pages/help-support";
import MedicalRecordsPage from "./pages/medical-records";
function Router() {
  return (
    <Switch>
      <Route path="/landing" component={LandingPage} />
      <Route path="/contact" component={ContactPage} />
      {/* <Route path="/workflow" component={WorkflowPage} /> */}
      <ProtectedRoute path="/" component={Home} />
      <ProtectedRoute path="/users" component={UsersPage} requiredRole="admin" />
      <ProtectedRoute path="/upload" component={Upload} requiredRole="admin"/>
      <ProtectedRoute path="/workflow" component={WorkflowAuth}/>
      <ProtectedRoute path="/cases" component={CaseManagementPage} />
      <ProtectedRoute path="/insurance" component={InsuranceViewPage} requiredRole="insuranceAgency" />
      <ProtectedRoute path="/medical" component={MedicalRecordsPage} requiredRole="doctor" />
      <ProtectedRoute path="/settings" component={SettingsPage} />
      <ProtectedRoute path="/help" component={HelpSupportPage} />
      <Route path="/auth" component={AuthPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location, setLocation] = useLocation();
  const { user } = useAuth();
  
  useEffect(() => {
    // Only redirect if we're exactly at the root and not authenticated
    if (location === "/" && !user) {
      setLocation("/landing");
    }
  }, [location, setLocation, user]);
  
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
