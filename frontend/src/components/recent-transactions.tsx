import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Sample data - in a real app, this would come from your API
const transactions = [
  {
    id: "1",
    type: "buy",
    symbol: "RELIANCE",
    name: "Reliance Industries",
    shares: 5,
    price: 2873.45,
    date: "2023-05-15",
  },
  {
    id: "2",
    type: "sell",
    symbol: "TCS",
    name: "Tata Consultancy Services",
    shares: 2,
    price: 3456.2,
    date: "2023-05-12",
  },
  {
    id: "3",
    type: "buy",
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    shares: 3,
    price: 1678.9,
    date: "2023-05-10",
  },
  {
    id: "4",
    type: "buy",
    symbol: "INFY",
    name: "Infosys",
    shares: 2,
    price: 1432.75,
    date: "2023-05-08",
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Transactions</CardTitle>
        <p className="text-sm text-muted-foreground">Your latest stock transactions</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    transaction.type === "buy" ? "bg-green-500/20" : "bg-red-500/20"
                  }`}
                >
                  {transaction.type === "buy" ? (
                    <ArrowUp className={`h-5 w-5 ${transaction.type === "buy" ? "text-green-500" : "text-red-500"}`} />
                  ) : (
                    <ArrowDown
                      className={`h-5 w-5 ${transaction.type === "buy" ? "text-green-500" : "text-red-500"}`}
                    />
                  )}
                </div>
                <div>
                  <div className="font-medium">{transaction.symbol}</div>
                  <div className="text-xs text-muted-foreground">{transaction.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {transaction.type === "buy" ? "+" : "-"}
                  {transaction.shares} shares
                </div>
                <div className="text-xs text-muted-foreground">₹{transaction.price.toFixed(2)} per share</div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 w-full">
          View All Transactions
        </Button>
      </CardContent>
    </Card>
  )
}

