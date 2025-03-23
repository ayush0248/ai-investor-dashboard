"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchIndianStockData } from "@/lib/stock-api"
import { fetchStockDetails } from "@/lib/api"

interface StockDetailViewProps {
  symbol: string
  onBack: () => void
}

export default function StockDetailView({ symbol, onBack }: StockDetailViewProps) {
  const [stockData, setStockData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getStockDetails = async () => {
      setLoading(true)
      try {
        const data = await fetchStockDetails(symbol)
        setStockData(data)
        setError(null)
      } catch (err) {
        console.error(`Error fetching details for ${symbol}:`, err)
        setError("Failed to load stock details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    getStockDetails()
  }, [symbol])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Button variant="ghost" size="sm" onClick={onBack} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to stocks
          </Button>
          <CardTitle>Loading {symbol} details...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !stockData) {
    return (
      <Card>
        <CardHeader>
          <Button variant="ghost" size="sm" onClick={onBack} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to stocks
          </Button>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500 py-8">{error || "Failed to load stock details"}</div>
        </CardContent>
      </Card>
    )
  }

  const {
    shortName,
    longName,
    regularMarketPrice,
    regularMarketChange,
    regularMarketChangePercent,
    regularMarketVolume,
    regularMarketDayHigh,
    regularMarketDayLow,
    regularMarketOpen,
    marketCap,
    trailingPE,
    dividendYield,
    fiftyTwoWeekHigh,
    fiftyTwoWeekLow,
    averageVolume,
    trailingAnnualDividendYield,
  } = stockData

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(2)}B`
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`
    }
    return num.toFixed(2)
  }

  return (
    <Card>
      <CardHeader>
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to stocks
        </Button>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {symbol}
              {stockData.sector && (
                <Badge variant="outline" className="text-sm font-normal">
                  {stockData.sector}
                </Badge>
              )}
            </CardTitle>
            <p className="text-muted-foreground">{longName || shortName}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">₹{regularMarketPrice?.toFixed(2) || "N/A"}</div>
            <div
              className={
                (regularMarketChange || 0) >= 0
                  ? "text-green-600 flex items-center justify-end"
                  : "text-red-600 flex items-center justify-end"
              }
            >
              <TrendingUp className={`h-4 w-4 mr-1 ${(regularMarketChange || 0) < 0 ? "rotate-180" : ""}`} />
              {(regularMarketChange || 0).toFixed(2)} ({(regularMarketChangePercent || 0).toFixed(2)}%)
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Open</div>
            <div className="font-medium">₹{regularMarketOpen?.toFixed(2) || "N/A"}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">High</div>
            <div className="font-medium">₹{regularMarketDayHigh?.toFixed(2) || "N/A"}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Low</div>
            <div className="font-medium">₹{regularMarketDayLow?.toFixed(2) || "N/A"}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Volume</div>
            <div className="font-medium">{formatNumber(regularMarketVolume || 0)}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="font-medium">₹{formatNumber(marketCap || 0)}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">P/E Ratio</div>
            <div className="font-medium">{trailingPE?.toFixed(2) || "N/A"}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Dividend Yield</div>
            <div className="font-medium">
              {trailingAnnualDividendYield ? `${(trailingAnnualDividendYield * 100).toFixed(2)}%` : "N/A"}
            </div>
          </div>
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">52W Range</div>
            <div className="font-medium">
              ₹{fiftyTwoWeekLow?.toFixed(2) || "N/A"} - ₹{fiftyTwoWeekHigh?.toFixed(2) || "N/A"}
            </div>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-md">
          <h3 className="font-medium mb-2">Average Volume</h3>
          <div className="flex items-center justify-between">
            <div>Daily: {formatNumber(regularMarketVolume || 0)}</div>
            <div>3-Month Avg: {formatNumber(averageVolume || 0)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

