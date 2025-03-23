"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StockChartProps {
  data: { date: string; price: number }[]
}

export default function StockChart({ data }: StockChartProps) {
  const [period, setPeriod] = useState("1M")
  const [chartData, setChartData] = useState(data)

  useEffect(() => {
    // Filter data based on selected period
    if (!data || data.length === 0) return

    const now = new Date()
    let filterDate = new Date()

    switch (period) {
      case "1D":
        filterDate.setDate(now.getDate() - 1)
        break
      case "1W":
        filterDate.setDate(now.getDate() - 7)
        break
      case "1M":
        filterDate.setMonth(now.getMonth() - 1)
        break
      case "3M":
        filterDate.setMonth(now.getMonth() - 3)
        break
      case "1Y":
        filterDate.setFullYear(now.getFullYear() - 1)
        break
      case "5Y":
        filterDate.setFullYear(now.getFullYear() - 5)
        break
      default:
        filterDate = new Date(0) // All data
    }

    const filteredData = data.filter((item) => new Date(item.date) >= filterDate)
    setChartData(filteredData)
  }, [period, data])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    if (period === "1D") {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
    if (period === "1W" || period === "1M") {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
    return date.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate min and max for Y axis with some padding
  const prices = chartData.map((item) => item.price)
  const minPrice = Math.min(...prices) * 0.995
  const maxPrice = Math.max(...prices) * 1.005

  // Determine if stock is up or down over the period
  const isUp = chartData.length > 1 && chartData[chartData.length - 1].price >= chartData[0].price

  return (
    <div className="h-full w-full">
      <Tabs defaultValue="1M" onValueChange={setPeriod} className="mb-4">
        <TabsList>
          <TabsTrigger value="1D">1D</TabsTrigger>
          <TabsTrigger value="1W">1W</TabsTrigger>
          <TabsTrigger value="1M">1M</TabsTrigger>
          <TabsTrigger value="3M">3M</TabsTrigger>
          <TabsTrigger value="1Y">1Y</TabsTrigger>
          <TabsTrigger value="5Y">5Y</TabsTrigger>
          <TabsTrigger value="ALL">ALL</TabsTrigger>
        </TabsList>
      </Tabs>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis
            domain={[minPrice, maxPrice]}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value.toFixed(0)}`}
          />
          <Tooltip
            formatter={(value: number) => [`₹${value.toFixed(2)}`, "Price"]}
            labelFormatter={formatDate}
            contentStyle={{
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              border: "none",
              borderRadius: "4px",
              color: "#f3f4f6",
            }}
          />
          <Line type="monotone" dataKey="price" stroke={isUp ? "#10b981" : "#ef4444"} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

