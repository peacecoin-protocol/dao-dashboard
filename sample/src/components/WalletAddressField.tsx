interface WalletAddressFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function WalletAddressField({
  label,
  value,
  onChange,
  className = 'field',
}: WalletAddressFieldProps) {
  return (
    <label className={className}>
      <span>{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </label>
  )
}
