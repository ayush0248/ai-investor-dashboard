"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data
const data = [
  { month: "Jan", return: 2.4 },
  { month: "Feb", return: 1.8 },
  { month: "Mar", return: -0.7 },
  { month: "Apr", return: 3.2 },
  { month: "May", return: -1.5 },
  { month: "Jun", return: 2.1 },
  { month: "Jul", return: 1.9 },
  { month: "Aug", return: -0.3 },
  { month: "Sep", return: 0.8 },
  { month: "Oct", return: 1.2 },
  { month: "Nov", return: 2.8 },
  { month: "Dec", return: 1.6 },
];

export function PortfolioPerformance() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Monthly Performance</CardTitle>
        <CardDescription>Your portfolio's monthly returns (%)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => (typeof value === "number" ? `${value.toFixed(1)}%` : value)} />
              <Bar dataKey="return" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
