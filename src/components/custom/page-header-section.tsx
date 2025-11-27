interface PageHeaderSectionProps {
  title: string
  description?: string
}

export function PageHeaderSection({
  title,
  description,
}: PageHeaderSectionProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground text-sm sm:text-base max-w-4xl">
          {description}
        </p>
      )}
    </div>
  )
}
