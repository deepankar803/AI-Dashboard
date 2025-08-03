import { useState, useEffect } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ChannelChart } from "@/components/dashboard/ChannelChart";
import { ConversionChart } from "@/components/dashboard/ConversionChart";
import { DataTable } from "@/components/dashboard/DataTable";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TrendingUp, TrendingDown, Users, DollarSign, Target, BarChart3 } from "lucide-react";

interface DashboardMetrics {
  revenue: { value: number; change: number; trend: "up" | "down" };
  users: { value: number; change: number; trend: "up" | "down" };
  conversions: { value: number; change: number; trend: "up" | "down" };
  growth: { value: number; change: number; trend: "up" | "down" };
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    revenue: { value: 125430, change: 12.5, trend: "up" },
    users: { value: 42180, change: 8.2, trend: "up" },
    conversions: { value: 3240, change: -2.1, trend: "down" },
    growth: { value: 18.6, change: 5.3, trend: "up" }
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        revenue: {
          ...prev.revenue,
          value: prev.revenue.value + Math.floor(Math.random() * 100 - 50)
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Loading skeletons */}
          <div className="h-16 dashboard-card animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 dashboard-card animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 dashboard-card animate-pulse" />
            <div className="h-80 dashboard-card animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <DashboardHeader />

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Revenue"
            value={`$${metrics.revenue.value.toLocaleString()}`}
            change={metrics.revenue.change}
            trend={metrics.revenue.trend}
            icon={DollarSign}
            variant="primary"
          />
          <MetricCard
            title="Total Users"
            value={metrics.users.value.toLocaleString()}
            change={metrics.users.change}
            trend={metrics.users.trend}
            icon={Users}
            variant="accent"
          />
          <MetricCard
            title="Conversions"
            value={metrics.conversions.value.toLocaleString()}
            change={metrics.conversions.change}
            trend={metrics.conversions.trend}
            icon={Target}
            variant="default"
          />
          <MetricCard
            title="Growth Rate"
            value={`${metrics.growth.value}%`}
            change={metrics.growth.change}
            trend={metrics.growth.trend}
            icon={BarChart3}
            variant="default"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <ChannelChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DataTable />
          </div>
          <ConversionChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;