import { Card } from '@/components/ui/card'

export default function UserGuideLoading() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-16 text-center space-y-4">
          <div className="h-12 bg-muted rounded-lg animate-pulse max-w-xs mx-auto" />
          <div className="h-6 bg-muted rounded-lg animate-pulse max-w-2xl mx-auto" />
        </div>

        {/* Quick Start Card Skeleton */}
        <Card className="p-8 mb-12 space-y-4">
          <div className="h-8 bg-muted rounded-lg animate-pulse max-w-xs" />
          <div className="h-4 bg-muted rounded-lg animate-pulse" />
          <div className="h-4 bg-muted rounded-lg animate-pulse max-w-2xl" />
          <div className="flex gap-4 pt-4">
            <div className="h-10 bg-muted rounded-lg animate-pulse flex-1 max-w-xs" />
            <div className="h-10 bg-muted rounded-lg animate-pulse flex-1 max-w-xs" />
          </div>
        </Card>

        {/* Guide Sections Skeleton */}
        <div className="space-y-4 mb-16">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="p-6 space-y-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted rounded-lg animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-muted rounded-lg animate-pulse" />
                  <div className="h-4 bg-muted rounded-lg animate-pulse max-w-xs" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Skeleton */}
        <Card className="p-8 mb-16 space-y-6">
          <div className="h-8 bg-muted rounded-lg animate-pulse max-w-xs" />
          {[1, 2, 3].map((item) => (
            <div key={item} className="space-y-2">
              <div className="h-5 bg-muted rounded-lg animate-pulse max-w-md" />
              <div className="h-4 bg-muted rounded-lg animate-pulse" />
              <div className="h-4 bg-muted rounded-lg animate-pulse max-w-2xl" />
            </div>
          ))}
        </Card>
      </div>
    </main>
  )
}
