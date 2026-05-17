"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        <h2 className="text-xl font-semibold text-foreground">
          Algo salió mal
        </h2>
        <p className="text-sm text-muted-foreground">
          {error.message || "Ocurrió un error inesperado."}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}
