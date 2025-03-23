import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StockSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
          <Skeleton className="h-9 w-64" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-12 text-sm">
            <div className="col-span-4">
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="col-span-4 text-right">
              <Skeleton className="ml-auto h-4 w-16" />
            </div>
            <div className="col-span-4 text-right">
              <Skeleton className="ml-auto h-4 w-16" />
            </div>
          </div>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="grid grid-cols-12 items-center py-2">
                <div className="col-span-4">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="mt-1 h-3 w-24" />
                </div>
                <div className="col-span-4 text-right">
                  <Skeleton className="ml-auto h-5 w-16" />
                </div>
                <div className="col-span-4 flex justify-end">
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            ))}
          <Skeleton className="mt-4 h-9 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

