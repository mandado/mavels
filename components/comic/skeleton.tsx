import { Skeleton } from "@/components/ui/skeleton"

const CreatorCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}

export default function ComicPageSkeleton() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Title Section */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Main Comic Image */}
      <Skeleton className="w-full h-96 rounded-xl" />

      {/* Creators Section */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" /> {/* "Creators" heading */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <CreatorCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}