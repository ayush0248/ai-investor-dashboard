"use client"

import { useEffect, useState } from "react"
import { Search, TrendingUp, Star, StarOff, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import StockChart from "@/components/stock-chart"
import {  fetchStockDetails } from "@/lib/api"

// Types for stock data
interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  high: number
  low: number
}

interface StockDetails {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  open: number
  high: number
  low: number
  volume: number
  marketCap: number
  pe: number
  dividend: number
  sector: string
  historicalData: { date: string; price: number }[]
}

export default function StockDashboard() {
  const [stocks, setStocks] = useState<StockData[]>([])
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedStock, setSelectedStock] = useState<StockDetails | null>(null)
  const [watchlist, setWatchlist] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")

  // Fetch initial stock data
  useEffect(() => {
    const fetchInitialStockData = async () => {
      setLoading(true)
      try {
        const data = await fetchStockDetails("AAPL")
        setStocks(data)
        setFilteredStocks(data)
      } catch (error) {
        console.error("Error fetching stock data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialStockData()

    // Set up polling for real-time updates
    const interval = setInterval(() => {
      getStockData()
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Filter stocks based on search query and active tab
  useEffect(() => {
    let filtered = stocks

    if (searchQuery) {
      filtered = filtered.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (activeTab === "watchlist") {
      filtered = filtered.filter((stock) => watchlist.includes(stock.symbol))
    }

    setFilteredStocks(filtered)
  }, [searchQuery, stocks, watchlist, activeTab])

  // Handle stock selection
  const handleSelectStock = async (symbol: string) => {
    try {
      const details = await fetchStockDetails(symbol)
      setSelectedStock(details)
    } catch (error) {
      console.error("Error fetching stock details:", error)
    }
  }

  // Toggle watchlist
  const toggleWatchlist = (symbol: string) => {
    if (watchlist.includes(symbol)) {
      setWatchlist(watchlist.filter((item) => item !== symbol))
    } else {
      setWatchlist([...watchlist, symbol])
    }
  }

  // Refresh data manually
  const refreshData = async () => {
    setLoading(true)
    try {
      const data = await fetchStockDetails("AAPL")
      setStocks(data)
    } catch (error) {
      console.error("Error refreshing stock data:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Indian Stock Market</h1>
            <p className="text-muted-foreground">Real-time stock prices and market data</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={refreshData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search stocks..."
                className="w-full md:w-[300px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Stocks</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist ({watchlist.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Stock Listings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 bg-muted/50 p-3 text-sm font-medium">
                        <div>Symbol</div>
                        <div>Price</div>
                        <div>Change</div>
                        <div>Volume</div>
                        <div className="text-right">Actions</div>
                      </div>
                      <div className="divide-y">
                        {loading && filteredStocks.length === 0 ? (
                          <div className="p-4 text-center text-muted-foreground">Loading stock data...</div>
                        ) : filteredStocks.length === 0 ? (
                          <div className="p-4 text-center text-muted-foreground">No stocks found</div>
                        ) : (
                          filteredStocks.map((stock) => (
                            <div
                              key={stock.symbol}
                              className="grid grid-cols-5 items-center p-3 text-sm cursor-pointer hover:bg-muted/50"
                              onClick={() => handleSelectStock(stock.symbol)}
                            >
                              <div className="font-medium">
                                {stock.symbol}
                                <div className="text-xs text-muted-foreground truncate max-w-[120px]">{stock.name}</div>
                              </div>
                              <div>₹{stock.price.toFixed(2)}</div>
                              <div
                                className={
                                  stock.change >= 0
                                    ? "text-green-600 flex items-center"
                                    : "text-red-600 flex items-center"
                                }
                              >
                                <TrendingUp className={`h-3 w-3 mr-1 ${stock.change < 0 ? "rotate-180" : ""}`} />
                                {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                              </div>
                              <div>{(stock.volume / 1000000).toFixed(2)}M</div>
                              <div className="text-right">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleWatchlist(stock.symbol)
                                  }}
                                >
                                  {watchlist.includes(stock.symbol) ? (
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  ) : (
                                    <StarOff className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle>Market Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-sm font-medium text-muted-foreground">NIFTY 50</div>
                            <div className="text-2xl font-bold">22,055.18</div>
                            <div className="text-sm text-green-600">+0.42% ↑</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-sm font-medium text-muted-foreground">SENSEX</div>
                            <div className="text-2xl font-bold">72,643.31</div>
                            <div className="text-sm text-green-600">+0.38% ↑</div>
                          </CardContent>
                        </Card>
                      </div>

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
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="watchlist" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Your Watchlist</CardTitle>
              </CardHeader>
              <CardContent>
                {watchlist.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <StarOff className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Your watchlist is empty</h3>
                    <p>Add stocks to your watchlist by clicking the star icon next to any stock.</p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 bg-muted/50 p-3 text-sm font-medium">
                      <div>Symbol</div>
                      <div>Price</div>
                      <div>Change</div>
                      <div>Volume</div>
                      <div className="text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {filteredStocks.map((stock) => (
                        <div
                          key={`watchlist-${stock.symbol}`}
                          className="grid grid-cols-5 items-center p-3 text-sm cursor-pointer hover:bg-muted/50"
                          onClick={() => handleSelectStock(stock.symbol)}
                        >
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
                          <div className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleWatchlist(stock.symbol)
                              }}
                            >
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedStock && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {selectedStock.symbol}
                    <Badge variant="outline" className="text-sm font-normal">
                      {selectedStock.sector}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => toggleWatchlist(selectedStock.symbol)}>
                      {watchlist.includes(selectedStock.symbol) ? (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                    </Button>
                  </CardTitle>
                  <p className="text-muted-foreground">{selectedStock.name}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">₹{selectedStock.price.toFixed(2)}</div>
                  <div
                    className={
                      selectedStock.change >= 0
                        ? "text-green-600 flex items-center justify-end"
                        : "text-red-600 flex items-center justify-end"
                    }
                  >
                    <TrendingUp className={`h-4 w-4 mr-1 ${selectedStock.change < 0 ? "rotate-180" : ""}`} />
                    {selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-[300px]">
                <StockChart data={selectedStock.historicalData} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Open</div>
                  <div className="font-medium">₹{selectedStock.open.toFixed(2)}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">High</div>
                  <div className="font-medium">₹{selectedStock.high.toFixed(2)}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Low</div>
                  <div className="font-medium">₹{selectedStock.low.toFixed(2)}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Volume</div>
                  <div className="font-medium">{(selectedStock.volume / 1000000).toFixed(2)}M</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                  <div className="font-medium">₹{(selectedStock.marketCap / 10000000000).toFixed(2)}B</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">P/E Ratio</div>
                  <div className="font-medium">{selectedStock.pe.toFixed(2)}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Dividend Yield</div>
                  <div className="font-medium">{selectedStock.dividend.toFixed(2)}%</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">52W Range</div>
                  <div className="font-medium">
                    ₹{(selectedStock.low * 0.8).toFixed(2)} - ₹{(selectedStock.high * 1.2).toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function getStockData() {
    throw new Error("Function not implemented.")
}

