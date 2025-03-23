"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Sample data generator
const generateData = (days: number) => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  let value = 100000;

  for (let i = 0; i <= days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const change = Math.random() * 2000 - 1000;
    value += change;

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(value), // Round for better readability
    });
  }

  return data;
};

export function PortfolioChart() {
  const [timeRange, setTimeRange] = useState<"1W" | "1M" | "3M" | "1Y" | "ALL">("1M");
  const [data, setData] = useState<{ date: string; value: number }[]>([]);

  useEffect(() => {
    setData(generateData(30)); // Default 1M data
  }, []);

  useEffect(() => {
    setData(
      timeRange === "1W"
        ? generateData(7)
        : timeRange === "1M"
        ? generateData(30)
        : timeRange === "3M"
        ? generateData(90)
        : timeRange === "1Y"
        ? generateData(365)
        : generateData(1095) // 3 years
    );
  }, [timeRange]);

  console.log("Chart Data:", data); // Debugging log

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Track your investment growth over time</CardDescription>
          </div>
          <div className="flex space-x-2">
            {(["1W", "1M", "3M", "1Y", "ALL"] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">Loading data...</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
