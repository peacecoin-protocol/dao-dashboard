import { useEffect, useMemo, useState, useId } from 'react'
import { Calendar } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { cn } from '~/lib/utils'

type DateTimePickerProps = {
  id?: string
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  okLabel?: string
  cancelLabel?: string
  dateLabel?: string
  timeLabel?: string
  className?: string
  disabled?: boolean
}

const splitDateTime = (value?: string) => {
  if (!value) return { date: '', time: '' }
  const [datePart = '', timePart = ''] = value.split('T')
  const normalizedTime = timePart ? timePart.slice(0, 5) : ''
  return { date: datePart, time: normalizedTime }
}

const formatDisplayValue = (value?: string) => {
  if (!value) return ''
  const [datePart = '', timePart = ''] = value.split('T')
  if (!datePart || !timePart) return value
  return `${datePart} ${timePart.slice(0, 5)}`
}

export function DateTimePicker({
  id,
  value,
  onChange,
  placeholder = 'Select date & time',
  okLabel = 'OK',
  cancelLabel = 'Cancel',
  dateLabel = 'Date',
  timeLabel = 'Time',
  className,
  disabled,
}: DateTimePickerProps) {
  const internalId = useId()
  const triggerId = id ?? `datetime-trigger-${internalId}`
  const dateId = `${triggerId}-date`
  const timeId = `${triggerId}-time`

  const [open, setOpen] = useState(false)
  const [draftDate, setDraftDate] = useState('')
  const [draftTime, setDraftTime] = useState('')

  useEffect(() => {
    if (!open) return
    const { date, time } = splitDateTime(value)
    setDraftDate(date)
    setDraftTime(time)
  }, [open, value])

  const displayValue = useMemo(() => formatDisplayValue(value), [value])
  const canConfirm = Boolean(draftDate && draftTime)

  const handleConfirm = () => {
    if (!canConfirm) return
    onChange(`${draftDate}T${draftTime}`)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={triggerId}
          type="button"
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 p-3 text-base focus:outline-none focus:border-teal-600 dark:border-gray-600 dark:focus:border-teal-600',
            !displayValue && 'text-gray-400',
            disabled && 'cursor-not-allowed opacity-60',
            className
          )}
          disabled={disabled}
        >
          <span className="truncate">{displayValue || placeholder}</span>
          <Calendar className="ml-2 h-4 w-4 text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor={dateId}>{dateLabel}</Label>
            <Input
              id={dateId}
              type="date"
              value={draftDate}
              onChange={(event) => setDraftDate(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor={timeId}>{timeLabel}</Label>
            <Input
              id={timeId}
              type="time"
              value={draftTime}
              onChange={(event) => setDraftTime(event.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={!canConfirm}
            >
              {okLabel}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
