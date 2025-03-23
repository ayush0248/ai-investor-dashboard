import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Sample data - in a real app, this would come from your API
const news = [
  {
    id: "1",
    title: "RBI Signals Potential Rate Cut as Inflation Eases",
    source: "Economic Times",
    time: "2 hours ago",
  },
  {
    id: "2",
    title: "IT Stocks Rally on Strong Earnings Reports",
    source: "Mint",
    time: "4 hours ago",
  },
  {
    id: "3",
    title: "Oil Prices Drop Amid Global Supply Concerns",
    source: "Business Standard",
    time: "6 hours ago",
  },
  {
    id: "4",
    title: "Retail Sales Exceed Expectations in April",
    source: "Financial Express",
    time: "8 hours ago",
  },
]

export function MarketNews() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Market News</CardTitle>
        <p className="text-sm text-muted-foreground">Latest financial news and updates</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="space-y-1">
              <h3 className="font-medium leading-snug">{item.title}</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{item.source}</span>
                <span className="mx-1">•</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 w-full">
          View All News
        </Button>
      </CardContent>
    </Card>
  )
}

