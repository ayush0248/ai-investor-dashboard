"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IndianStockData from "@/components/indian-stock-data"
import StockDetailView from "@/components/stock-detail-view"

export default function EnhancedStockDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStock, setSelectedStock] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const handleSelectStock = (symbol: string) => {
    setSelectedStock(symbol)
    setActiveTab("details")
  }

  const handleBackToOverview = () => {
    setSelectedStock(null)
    setActiveTab("overview")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Indian Stock Market</h1>
          <p className="text-muted-foreground">Real-time stock prices and market data</p>
        </div>
        <div className="relative w-full md:w-auto">
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          {selectedStock && <TabsTrigger value="details">{selectedStock} Details</TabsTrigger>}
        </TabsList>
        <TabsContent value="overview">
          <IndianStockData onSelectStock={handleSelectStock} searchQuery={searchQuery} />
        </TabsContent>
        {selectedStock && (
          <TabsContent value="details">
            <StockDetailView symbol={selectedStock} onBack={handleBackToOverview} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

