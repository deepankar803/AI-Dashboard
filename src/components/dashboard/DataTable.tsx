import { useState } from "react";
import { ChevronUp, ChevronDown, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface TableData {
  id: string;
  campaign: string;
  channel: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  status: "active" | "paused" | "completed";
}

const data: TableData[] = [
  {
    id: "1",
    campaign: "Summer Sale 2024",
    channel: "Google Ads",
    impressions: 125000,
    clicks: 3200,
    conversions: 280,
    cost: 4500,
    status: "active"
  },
  {
    id: "2",
    campaign: "Brand Awareness Q2",
    channel: "Facebook",
    impressions: 89000,
    clicks: 2100,
    conversions: 150,
    cost: 3200,
    status: "active"
  },
  {
    id: "3",
    campaign: "Product Launch",
    channel: "LinkedIn",
    impressions: 45000,
    clicks: 980,
    conversions: 95,
    cost: 2800,
    status: "completed"
  },
  {
    id: "4",
    campaign: "Retargeting Q2",
    channel: "Display",
    impressions: 67000,
    clicks: 1560,
    conversions: 220,
    cost: 1900,
    status: "paused"
  }
];

export const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof TableData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof TableData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredData = data.filter(item =>
    item.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    return sortDirection === "asc" 
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const getStatusBadge = (status: TableData["status"]) => {
    const variants = {
      active: "default",
      paused: "secondary",
      completed: "outline"
    } as const;
    
    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  const SortIcon = ({ column }: { column: keyof TableData }) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="dashboard-card">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Campaign Performance</h3>
            <p className="text-sm text-muted-foreground">Recent campaigns and their metrics</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-muted/50 border-border/50"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th 
                className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort("campaign")}
              >
                <div className="flex items-center gap-2">
                  Campaign
                  <SortIcon column="campaign" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort("channel")}
              >
                <div className="flex items-center gap-2">
                  Channel
                  <SortIcon column="channel" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort("impressions")}
              >
                <div className="flex items-center gap-2">
                  Impressions
                  <SortIcon column="impressions" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort("clicks")}
              >
                <div className="flex items-center gap-2">
                  Clicks
                  <SortIcon column="clicks" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort("conversions")}
              >
                <div className="flex items-center gap-2">
                  Conversions
                  <SortIcon column="conversions" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort("cost")}
              >
                <div className="flex items-center gap-2">
                  Cost
                  <SortIcon column="cost" />
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-medium text-foreground">{item.campaign}</td>
                <td className="py-3 px-4 text-muted-foreground">{item.channel}</td>
                <td className="py-3 px-4 text-foreground">{item.impressions.toLocaleString()}</td>
                <td className="py-3 px-4 text-foreground">{item.clicks.toLocaleString()}</td>
                <td className="py-3 px-4 text-foreground">{item.conversions}</td>
                <td className="py-3 px-4 text-foreground">${item.cost.toLocaleString()}</td>
                <td className="py-3 px-4">{getStatusBadge(item.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};