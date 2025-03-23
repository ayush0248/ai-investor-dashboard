"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data
const data = [
  { name: "Technology", value: 45, color: "#4F46E5" },
  { name: "Healthcare", value: 20, color: "#6366F1" },
  { name: "Financials", value: 15, color: "#818CF8" },
  { name: "Consumer", value: 10, color: "#A5B4FC" },
  { name: "Energy", value: 5, color: "#C7D2FE" },
  { name: "Other", value: 5, color: "#E0E7FF" },
];

export function PortfolioAllocation() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Sector Allocation</CardTitle>
        <CardDescription>Distribution of your investments by sector</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
