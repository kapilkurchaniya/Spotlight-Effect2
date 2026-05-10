export default function HospitalsLoading() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-12 text-center">
          <div className="h-10 bg-muted rounded-lg mb-4 max-w-md mx-auto" />
          <div className="h-6 bg-muted rounded-lg max-w-2xl mx-auto" />
        </div>

        {/* Search and Filters Skeleton */}
        <div className="bg-card p-6 rounded-lg border mb-8 space-y-4">
          <div className="h-10 bg-muted rounded-lg" />
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-8 w-12 bg-muted rounded-full" />
            ))}
          </div>
        </div>

        {/* Hospital List Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-6 rounded-lg border bg-card space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="h-6 bg-muted rounded-lg mb-2 max-w-xs" />
                    <div className="h-4 bg-muted rounded-lg max-w-sm" />
                  </div>
                  <div className="h-6 w-12 bg-muted rounded-full" />
                </div>
                <div className="h-4 bg-muted rounded-lg max-w-xs" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 bg-muted rounded-lg" />
                  <div className="h-20 bg-muted rounded-lg" />
                </div>
                <div className="h-10 bg-muted rounded-lg" />
              </div>
            ))}
          </div>

          {/* Map Preview Skeleton */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-lg border bg-card sticky top-24">
              <div className="h-6 bg-muted rounded-lg mb-4 max-w-xs" />
              <div className="h-48 bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
