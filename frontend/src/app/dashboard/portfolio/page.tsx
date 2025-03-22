"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";

const sampleData = [
  { date: "Mar 1", value: 120 },
  { date: "Mar 2", value: 130 },
  { date: "Mar 3", value: 125 },
  { date: "Mar 4", value: 140 },
  { date: "Mar 5", value: 135 },
  { date: "Mar 6", value: 145 },
  { date: "Mar 7", value: 150 },
];

const portfolioAllocation = [
  { name: "Tech", value: 40 },
  { name: "Healthcare", value: 25 },
  { name: "Finance", value: 20 },
  { name: "Energy", value: 15 },
];

const COLORS = ["#4F46E5", "#06B6D4", "#FACC15", "#EF4444"];

export default function PortfolioDashboard() {
  const [aiInsight, setAiInsight] = useState("AI-powered insights will appear here.");
  const [loading, setLoading] = useState(false);

  const fetchAIInsights = () => {
    setLoading(true);
    setTimeout(() => {
      setAiInsight("AI Analysis: Tech stocks are showing strong bullish momentum due to increased investor confidence.");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Portfolio Performance */}
      <Card className="shadow-lg rounded-2xl p-6 bg-gray-900 text-white col-span-2">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Portfolio Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleData}>
              <XAxis dataKey="date" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip contentStyle={{ backgroundColor: "#333", borderRadius: "10px" }} />
              <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Portfolio Allocation */}
      <Card className="shadow-lg rounded-2xl p-6 bg-gray-800 text-white">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Portfolio Allocation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={portfolioAllocation} dataKey="value" outerRadius={100} label>
                {portfolioAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="shadow-lg rounded-2xl p-6 bg-gray-800 text-white col-span-3">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">AI Insights</h2>
          <p className="mt-4 text-lg italic text-gray-300">{loading ? "Analyzing market trends..." : aiInsight}</p>
          <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" onClick={fetchAIInsights}>
            {loading ? "Fetching..." : "Get AI Insights"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
