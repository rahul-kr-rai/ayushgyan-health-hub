import { ReactNode } from "react";
import DoctorSidebar from "./DoctorSidebar";
import { Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface DoctorLayoutProps {
  children: ReactNode;
  doctorName: string;
  specialization: string;
  pageTitle?: string;
  isOnline?: boolean;
  onOnlineChange?: (online: boolean) => void;
}

const DoctorLayout = ({ 
  children, 
  doctorName, 
  specialization,
  pageTitle,
  isOnline = true,
  onOnlineChange 
}: DoctorLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DoctorSidebar doctorName={doctorName} specialization={specialization} />
      
      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between h-16 px-8">
            <h1 className="text-xl font-serif font-semibold text-foreground">
              {pageTitle}
            </h1>
            <div className="flex items-center gap-6">
              {/* Online Status */}
              {onOnlineChange && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {isOnline ? "Online" : "Offline"}
                  </span>
                  <Switch 
                    checked={isOnline} 
                    onCheckedChange={onOnlineChange}
                    className={isOnline ? "data-[state=checked]:bg-green-500" : ""}
                  />
                </div>
              )}
              <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
