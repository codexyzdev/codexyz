import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
}

/**
 * Skeleton loading component for placeholder content
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-muted/50",
                className
            )}
            {...props}
        />
    )
}

/**
 * Skeleton for project cards in ProjectsGrid
 */
export function ProjectCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border border-input/60 bg-card/80 backdrop-blur-sm shadow-sm">
            <Skeleton className="w-full h-64 sm:h-72 md:h-80 rounded-none" />
            <div className="p-3 flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
            </div>
        </div>
    )
}

/**
 * Skeleton for tech cards in TechGrid
 */
export function TechCardSkeleton() {
    return (
        <div className="flex flex-col items-center gap-3 p-4 rounded-lg border border-input/60 bg-card/80 backdrop-blur-sm">
            <Skeleton className="h-16 w-16 rounded-md" />
            <Skeleton className="h-4 w-20" />
        </div>
    )
}

/**
 * Loading skeleton for the entire projects grid
 */
export function ProjectsGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
            ))}
        </div>
    )
}

/**
 * Loading skeleton for the entire tech grid
 */
export function TechGridSkeleton({ count = 9 }: { count?: number }) {
    return (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <TechCardSkeleton key={i} />
            ))}
        </div>
    )
}
