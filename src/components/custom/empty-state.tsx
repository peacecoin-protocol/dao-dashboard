interface EmptyStateProps {
  title: string
  subtitle?: string
  className?: string
}

export function EmptyState({ title, subtitle, className }: EmptyStateProps) {
  return (
    <div
      className={`w-full border border-dashed rounded-xl p-6 text-center text-sm text-muted-foreground bg-gray-50 ${className ?? ''}`}
    >
      <p className="font-semibold text-gray-700">{title}</p>
      {subtitle ? <p className="mt-1">{subtitle}</p> : null}
    </div>
  )
}
