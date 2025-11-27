interface PageSubHeaderSectionProps {
  title?: string
  description?: string
}

export function PageSubHeaderSection({
  title,
  description,
}: PageSubHeaderSectionProps) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <h2 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-gray-700">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-xs sm:text-sm max-w-3xl">
          {description}
        </p>
      )}
    </div>
  )
}
