import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SectorAllocation() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Sector Allocation</CardTitle>
        <p className="text-sm text-muted-foreground">Distribution of your investments by sector</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          {/* This would be a real chart in a production app */}
          <div className="relative h-[200px] w-[200px] rounded-full bg-blue-500/20 overflow-hidden">
            <div
              className="absolute inset-0 bg-blue-500 rounded-full"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
            ></div>
            <div
              className="absolute inset-0 bg-purple-500 rounded-full"
              style={{ clipPath: "polygon(0 45%, 100% 45%, 100% 65%, 0 65%)" }}
            ></div>
            <div
              className="absolute inset-0 bg-green-500 rounded-full"
              style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 80%, 0 80%)" }}
            ></div>
            <div
              className="absolute inset-0 bg-yellow-500 rounded-full"
              style={{ clipPath: "polygon(0 80%, 100% 80%, 100% 90%, 0 90%)" }}
            ></div>
            <div
              className="absolute inset-0 bg-gray-500 rounded-full"
              style={{ clipPath: "polygon(0 90%, 100% 90%, 100% 100%, 0 100%)" }}
            ></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Technology</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
            <span className="text-xs">Healthcare</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Financials</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs">Consumer</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-gray-500"></div>
            <span className="text-xs">Other</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

