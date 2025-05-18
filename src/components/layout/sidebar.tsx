import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth, User } from "@/hooks/use-auth";
import { 
  Home, 
  Users, 
  FileText, 
  Upload, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  LifeBuoy,
  HelpCircle,
  Book,
  AlertOctagon,
  WorkflowIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  role?: Array<"admin" | "attorney" | "insuranceAgency" | "doctor"> | null;
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Define menu items with role-based access
  const menuItems: MenuItem[] = [
    { 
      icon: <Home size={20} />, 
      label: "Dashboard", 
      path: "/", 
      role: null // Available to all roles
    },
    { 
      icon: <Upload size={20} />, 
      label: "Upload Reports", 
      path: "/upload", 
      role: ["admin"] // Available to all roles
    },
    { 
      icon: <WorkflowIcon size={20} />, 
      label: "Workflow", 
      path: "/workflow", 
      role: null// Available to all roles
    },
    { 
      icon: <FileText size={20} />, 
      label: "Case Management", 
      path: "/cases", 
      role: null // Available to all roles  
    },
    { 
      icon: <Users size={20} />, 
      label: "User Management", 
      path: "/users", 
      role: ["admin"] // Admin only
    },
    { 
      icon: <AlertOctagon size={20} />, 
      label: "Insurance View", 
      path: "/insurance", 
      role: ["admin", "insuranceAgency"] // Admin and Insurance Agency
    },
    { 
      icon: <Book size={20} />, 
      label: "Medical Records", 
      path: "/medical", 
      role: ["admin", "doctor"] // Admin and Doctors
    },
    { 
      icon: <Settings size={20} />, 
      label: "Settings", 
      path: "/settings", 
      role: null // Available to all roles
    },
    { 
      icon: <LifeBuoy size={20} />, 
      label: "Help & Support", 
      path: "/help", 
      role: null // Available to all roles
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    // If no role restriction or user is admin, show the item
    if (!item.role || user?.isAdmin) return true;
    // Otherwise check if user's role is in the allowed roles
    return user && user.role && item.role.includes(user.role);
  });

  return (
    <div
      className={`h-screen flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"} bg-gradient-to-b from-indigo-900 via-blue-900 to-purple-900 shadow-xl`}
    >
      {/* Logo/Header */}
      <div className="flex items-center p-4 justify-between border-b border-indigo-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <FileText className="h-7 w-7 text-indigo-300" />
            <span className="font-bold text-lg tracking-wide text-white">AcciJustice</span>
          </div>
        )}
        {collapsed && <FileText className="h-7 w-7 text-indigo-300 mx-auto" />}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-indigo-300 hover:text-white hover:bg-indigo-800"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {/* User info */}
      <div className={`px-4 py-5 ${collapsed ? "text-center" : ""} border-b border-indigo-800 bg-indigo-950/40`}> 
        {!collapsed ? (
          <>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-9 w-9 bg-indigo-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {user?.fullName?.charAt(0).toUpperCase() || ''}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{user?.fullName}</p>
                <p className="text-xs text-indigo-200 capitalize">{user?.role}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="h-9 w-9 bg-indigo-700 text-white rounded-full flex items-center justify-center mx-auto font-bold text-lg">
            {user?.fullName?.charAt(0).toUpperCase() || ''}
          </div>
        )}
      </div>

      {/* Menu items */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {filteredMenuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors gap-2
                ${location === item.path
                  ? "bg-indigo-700/80 text-white shadow"
                  : "text-indigo-200 hover:bg-indigo-800 hover:text-white"}
                ${collapsed ? "justify-center" : ""}`}
              aria-current={location === item.path ? "page" : undefined}
            >
              {item.icon}
              {!collapsed && <span className="ml-2">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <Separator className="bg-indigo-800 my-2" />

      {/* Logout button */}
      <div className="p-4">
        <Button
          variant="ghost"
          className={`w-full flex items-center justify-${collapsed ? "center" : "start"} text-indigo-200 hover:bg-indigo-800 hover:text-white font-semibold rounded-lg px-3 py-2`}
          onClick={handleLogout}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
}