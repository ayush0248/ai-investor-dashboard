"use client"

import { useEffect, useState } from "react"
import { TrendingUp, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchIndianStockData, type StockData } from "@/lib/stock-api"

export default function IndianStockData() {
  const [stocks, setStocks] = useState<StockData[]>([])
  const [indices, setIndices] = useState({
    nifty: 0,
    niftyChange: 0,
    niftyChangePercent: 0,
    sensex: 0,
    sensexChange: 0,
    sensexChangePercent: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Fetch stock data and indices
  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch both stock data and indices in parallel
      const stockData = await fetchIndianStockData()

      setStocks(stockData)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Failed to fetch market data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Initial data fetch and polling setup
  useEffect(() => {
    fetchData()

    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchData()
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Manual refresh handler
  const handleRefresh = () => {
    fetchData()
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Indian Stock Market</CardTitle>
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</span>
          )}
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : loading && stocks.length === 0 ? (
          <div className="text-center py-4">Loading stock data...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">NIFTY 50</div>
                  <div className="text-2xl font-bold">{indices.nifty.toFixed(2)}</div>
                  <div className={`text-sm ${indices.niftyChangePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {indices.niftyChangePercent >= 0 ? "+" : ""}
                    {indices.niftyChangePercent.toFixed(2)}%{indices.niftyChangePercent >= 0 ? " ↑" : " ↓"}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">SENSEX</div>
                  <div className="text-2xl font-bold">{indices.sensex.toFixed(2)}</div>
                  <div className={`text-sm ${indices.sensexChangePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {indices.sensexChangePercent >= 0 ? "+" : ""}
                    {indices.sensexChangePercent.toFixed(2)}%{indices.sensexChangePercent >= 0 ? " ↑" : " ↓"}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-4 bg-muted/50 p-3 text-sm font-medium">
                <div>Symbol</div>
                <div>Price</div>
                <div>Change</div>
                <div>Volume</div>
              </div>
              <div className="divide-y">
                {stocks.slice(0, 10).map((stock) => (
                  <div key={stock.symbol} className="grid grid-cols-4 items-center p-3 text-sm">
                    <div className="font-medium">
                      {stock.symbol}
                      <div className="text-xs text-muted-foreground truncate max-w-[120px]">{stock.name}</div>
                    </div>
                    <div>₹{stock.price.toFixed(2)}</div>
                    <div
                      className={
                        stock.change >= 0 ? "text-green-600 flex items-center" : "text-red-600 flex items-center"
                      }
                    >
                      <TrendingUp className={`h-3 w-3 mr-1 ${stock.change < 0 ? "rotate-180" : ""}`} />
                      {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </div>
                    <div>{(stock.volume / 1000000).toFixed(2)}M</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="font-medium mb-2">Top Gainers</h3>
                <div className="space-y-2">
                  {stocks
                    .filter((stock) => stock.change > 0)
                    .sort((a, b) => b.changePercent - a.changePercent)
                    .slice(0, 3)
                    .map((stock) => (
                      <div
                        key={`gainer-${stock.symbol}`}
                        className="flex justify-between items-center p-2 rounded-md bg-muted/50"
                      >
                        <div className="font-medium">{stock.symbol}</div>
                        <Badge variant="outline" className="text-green-600">
                          +{stock.changePercent.toFixed(2)}%
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Top Losers</h3>
                <div className="space-y-2">
                  {stocks
                    .filter((stock) => stock.change < 0)
                    .sort((a, b) => a.changePercent - b.changePercent)
                    .slice(0, 3)
                    .map((stock) => (
                      <div
                        key={`loser-${stock.symbol}`}
                        className="flex justify-between items-center p-2 rounded-md bg-muted/50"
                      >
                        <div className="font-medium">{stock.symbol}</div>
                        <Badge variant="outline" className="text-red-600">
                          {stock.changePercent.toFixed(2)}%
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

