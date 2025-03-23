import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function NewsSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="mt-2 h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="mx-1 h-3 w-3" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
        </div>
        <Skeleton className="mt-4 h-9 w-full" />
      </CardContent>
    </Card>
  )
}

