import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route, useLocation } from "wouter";

interface ProtectedRouteProps {
  path: string;
  component: React.ComponentType;
  requiredRole?: "admin" | "attorney" | "insuranceAgency" | "doctor";
}

export function ProtectedRoute({
  path,
  component: Component,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  return (
    <Route path={path}>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : !user ? (
        <Redirect to="/landing" />
      ) : requiredRole && user.role !== requiredRole && !user.isAdmin ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6 text-center">
            You don't have permission to access this page. This page requires 
            {requiredRole === "admin" ? " administrator" : ` ${requiredRole}`} privileges.
          </p>
          <button 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            onClick={() => setLocation("/")}
          >
            Return to Dashboard
          </button>
        </div>
      ) : (
        <Component />
      )}
    </Route>
  );
}