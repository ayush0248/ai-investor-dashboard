import type { Metadata } from "next"
import { PortfolioHoldings } from "@/components/portfolio-holdings"
import { SectorAllocation } from "@/components/sector-allocation"
import { MonthlyPerformance } from "@/components/monthly-performance"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Portfolio | Investor Portal",
  description: "Manage your investment portfolio",
}

export default function PortfolioPage() {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Portfolio</h1>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Investment
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Portfolio</h2>
          <p className="text-muted-foreground">Manage your investment holdings</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-1">
            <PortfolioHoldings />
          </div>
          <div className="space-y-6">
            <SectorAllocation />
            <MonthlyPerformance />
          </div>
        </div>
      </div>
    </div>
  )
}
