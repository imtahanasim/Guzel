export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-4">
          {/* Image Skeleton */}
          <div className="relative w-full aspect-[4/5] bg-gray-200 rounded-lg animate-pulse" />
          {/* Text Skeleton */}
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
