import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MonthlyPerformance() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Monthly Performance</CardTitle>
        <p className="text-sm text-muted-foreground">Your portfolio's monthly returns (%)</p>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-end justify-between gap-2 pt-4">
          {/* This would be a real chart in a production app */}
          <div className="h-[60%] w-6 bg-primary rounded-t-md"></div>
          <div className="h-[45%] w-6 bg-primary rounded-t-md"></div>
          <div className="h-[20%] w-6 bg-destructive rounded-t-md"></div>
          <div className="h-[80%] w-6 bg-primary rounded-t-md"></div>
          <div className="h-[35%] w-6 bg-destructive rounded-t-md"></div>
          <div className="h-[55%] w-6 bg-primary rounded-t-md"></div>
          <div className="h-[50%] w-6 bg-primary rounded-t-md"></div>
          <div className="h-[10%] w-6 bg-destructive rounded-t-md"></div>
          <div className="h-[25%] w-6 bg-primary rounded-t-md"></div>
          <div className="h-[30%] w-6 bg-primary rounded-t-md"></div>
          <div className="h-[70%] w-6 bg-primary rounded-t-md"></div>
          <div className="h-[40%] w-6 bg-primary rounded-t-md"></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </CardContent>
    </Card>
  )
}

