import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: LucideIcon;
  variant?: "default" | "primary" | "accent";
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  variant = "default" 
}: MetricCardProps) => {
  const cardClass = cn(
    "hover-lift transition-all duration-300",
    {
      "metric-card-primary": variant === "primary",
      "metric-card-accent": variant === "accent",
      "dashboard-card": variant === "default"
    }
  );

  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = trend === "up" ? "text-success" : "text-destructive";

  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "p-2 rounded-lg",
          variant === "primary" ? "bg-white/20" : "bg-primary/10"
        )}>
          <Icon className={cn(
            "h-5 w-5",
            variant === "primary" ? "text-white" : "text-primary"
          )} />
        </div>
        <div className={cn("flex items-center gap-1 text-sm", trendColor)}>
          <TrendIcon className="h-3 w-3" />
          <span className="font-medium">
            {change > 0 ? "+" : ""}{change}%
          </span>
        </div>
      </div>
      
      <div>
        <p className={cn(
          "text-sm font-medium",
          variant === "primary" ? "text-white/80" : "text-muted-foreground"
        )}>
          {title}
        </p>
        <p className={cn(
          "text-2xl font-bold mt-1",
          variant === "primary" ? "text-white" : "text-foreground"
        )}>
          {value}
        </p>
      </div>
    </div>
  );
};