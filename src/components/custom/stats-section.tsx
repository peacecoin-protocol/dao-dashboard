interface StatsSectionProps {
  tvl?: string | number
  members?: string | number
  className?: string
}

export function StatsSection({
  tvl = '$0',
  members = '0%',
  className,
}: StatsSectionProps) {
  return (
    <div
      className={`flex bg-gray-100 rounded-xl items-center justify-between cursor-pointer${
        className ? ` ${className}` : ''
      }`}
    >
      <div className="flex flex-row gap-4 w-full items-center p-4 justify-center">
        <div className="flex flex-col gap-2 w-full justify-center">
          <div className="text-heavy_white text-sm flex justify-center items-center">
            TVL
          </div>

          <div className="flex bg-primary_blue rounded-xl text-white font-bold p-1 w-full items-center justify-center text-sm">
            {tvl}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="text-heavy_white text-sm flex justify-center items-center">
            Memebers
          </div>
          <div className="flex bg-primary_blue rounded-xl text-white font-bold p-1 w-full items-center justify-center text-sm">
            {members}
          </div>
        </div>
      </div>
    </div>
  )
}
