interface ProposalBadgesProps {
  label: string
  status: string
}

export function ProposalBadges({ label, status }: ProposalBadgesProps) {
  return (
    <div className="flex flex-row gap-2">
      <span className="flex bg-primary_blue rounded-xl text-white font-bold w-44 p-1 items-center justify-center text-sm px-4">
        {label}
      </span>
      <span className="flex bg-primary_blue rounded-xl text-white font-bold p-1 items-center justify-center text-sm px-4">
        {status}
      </span>
    </div>
  )
}
