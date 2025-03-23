"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, Search } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export function StockOverview() {
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: "AAPL", name: "Apple Inc.", price: 173.57, change: 0.96, changePercent: 0.56 },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 338.11, change: 2.23, changePercent: 0.66 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 125.3, change: -0.23, changePercent: -0.18 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 127.74, change: 0.45, changePercent: 0.35 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 237.49, change: -3.28, changePercent: -1.36 },
  ])
  const [searchQuery, setSearchQuery] = useState("")

  // In a real app, you would fetch this data from an API
  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => ({
          ...stock,
          price: Number.parseFloat((stock.price + (Math.random() * 0.4 - 0.2)).toFixed(2)),
          change: Number.parseFloat((Math.random() * 2 - 1).toFixed(2)),
          changePercent: Number.parseFloat((Math.random() * 1 - 0.5).toFixed(2)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Market Overview</CardTitle>
            <CardDescription>Real-time stock market data</CardDescription>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search stocks..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
            <div className="col-span-4">Symbol</div>
            <div className="col-span-4 text-right">Price</div>
            <div className="col-span-4 text-right">Change</div>
          </div>
          {filteredStocks.map((stock) => (
            <div key={stock.symbol} className="grid grid-cols-12 items-center py-2 text-sm">
              <div className="col-span-4">
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-xs text-muted-foreground">{stock.name}</div>
              </div>
              <div className="col-span-4 text-right font-medium">${stock.price.toFixed(2)}</div>
              <div className="col-span-4 flex justify-end">
                <Badge variant={stock.change >= 0 ? "outline" : "destructive"} className="flex items-center gap-1">
                  {stock.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 w-full">
          View All Markets
        </Button>
      </CardContent>
    </Card>
  )
}

