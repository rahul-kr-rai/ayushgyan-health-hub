import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Bell } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  userName: string;
  userPrakriti?: string;
  pageTitle?: string;
}

const DashboardLayout = ({ 
  children, 
  userName, 
  userPrakriti,
  pageTitle 
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar userName={userName} userPrakriti={userPrakriti} />
      
      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between h-16 px-8">
            <h1 className="text-xl font-serif font-semibold text-foreground">
              {pageTitle}
            </h1>
            <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
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

export default DashboardLayout;
