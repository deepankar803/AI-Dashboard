import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { channel: "Organic", visitors: 4800, conversions: 320 },
  { channel: "Paid Search", visitors: 3200, conversions: 280 },
  { channel: "Social", visitors: 2800, conversions: 150 },
  { channel: "Email", visitors: 1800, conversions: 220 },
  { channel: "Direct", visitors: 2400, conversions: 180 },
];

export const ChannelChart = () => {
  return (
    <div className="chart-container">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Traffic Channels</h3>
        <p className="text-sm text-muted-foreground">Visitors and conversions by channel</p>
      </div>
      
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="channel" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))"
              }}
            />
            <Bar 
              dataKey="visitors" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="conversions" 
              fill="hsl(var(--accent))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};