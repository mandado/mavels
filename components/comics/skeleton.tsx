import { Skeleton } from "@/components/ui/skeleton"

const ComicCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-96 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  )
}

export function ComicsGridSkeleton() {
  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(8)].map((_, index) => (
          <ComicCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}