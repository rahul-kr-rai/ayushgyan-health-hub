import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Leaf,
  MessageCircle,
  FileText,
  ShoppingBag,
  Settings,
  LogOut,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/doctor" },
  { icon: Users, label: "Patients", path: "/dashboard/doctor/patients" },
  { icon: Calendar, label: "Appointments", path: "/dashboard/doctor/appointments" },
  { icon: FileText, label: "Prescriptions", path: "/dashboard/doctor/prescriptions" },
  { icon: ShoppingBag, label: "Products", path: "/products" },
];

interface DoctorSidebarProps {
  doctorName: string;
  specialization: string;
}

const DoctorSidebar = ({ doctorName, specialization }: DoctorSidebarProps) => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-xl font-serif font-semibold text-foreground">
              AyushGyan
            </span>
            <Badge variant="secondary" className="ml-2 text-xs">Doctor</Badge>
          </div>
        </Link>
      </div>

      {/* Doctor Profile */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">{doctorName}</p>
            <p className="text-xs text-muted-foreground">{specialization}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Link
          to="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
        <Button variant="ghost" className="w-full justify-start gap-3 px-4" asChild>
          <Link to="/login">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default DoctorSidebar;
