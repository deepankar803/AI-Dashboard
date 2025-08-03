import { Bell, Settings, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const DashboardHeader = () => {
  return (
    <div className="dashboard-card">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            ADmyBRAND Insights
          </h1>
          <p className="text-muted-foreground mt-1">
            Analytics Dashboard • Last updated 2 minutes ago
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search metrics..."
              className="pl-10 w-64 bg-muted/50 border-border/50"
            />
          </div>
          
          <Button variant="outline" size="icon" className="hover-lift">
            <Calendar className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="hover-lift">
            <Bell className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="hover-lift">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};