"use client"

import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PortfolioSummary() {
  // In a real app, this data would come from your API
  const portfolioValue = 124567.89
  const portfolioChange = 1243.45
  const portfolioChangePercent = 1.02
  const isPositive = portfolioChange >= 0

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Portfolio Summary</CardTitle>
        <CardDescription>Your investment portfolio overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">Total Value</div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                ${portfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">Today's Change</div>
            <div className="flex items-center gap-2">
              {isPositive ? (
                <ArrowUp className="h-5 w-5 text-green-500" />
              ) : (
                <ArrowDown className="h-5 w-5 text-red-500" />
              )}
              <span className={`text-2xl font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                $
                {Math.abs(portfolioChange).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
                ({isPositive ? "+" : "-"}
                {Math.abs(portfolioChangePercent).toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Stocks</div>
            <div className="text-sm font-medium">68%</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">ETFs</div>
            <div className="text-sm font-medium">22%</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Crypto</div>
            <div className="text-sm font-medium">8%</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Cash</div>
            <div className="text-sm font-medium">2%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

