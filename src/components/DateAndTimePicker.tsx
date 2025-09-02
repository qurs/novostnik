import { Ref, useImperativeHandle, useMemo, useState } from "react"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { Input } from "./ui/input"

export default function DateAndTimePicker({
	ref
}: {
	ref: Ref<() => Date | null>
}) {
	const [open, setOpen] = useState(false)
	const [date, setDate] = useState<Date | null>(null)
	const [time, setTime] = useState('10:30:00')

	const dateTime: Date | null = useMemo(() => {
		if (!date) return null
		const [hours, minutes, seconds] = time.split(":").map(Number)
		const full = new Date(date)
		full.setHours(hours ?? 0, minutes ?? 0, seconds ?? 0, 0)
		return full
	}, [date, time])

	useImperativeHandle(ref, () => (
		() => dateTime
	), [dateTime])

	return (
		<div className="flex gap-4">
			<div className="flex flex-col gap-3">
				<Label htmlFor="date-picker" className="px-1">
					Date
				</Label>
				<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date-picker"
						className="w-32 justify-between font-normal"
					>
						{date ? date.toLocaleDateString() : "Select date"}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="start">
						<Calendar
							mode="single"
							selected={date ?? undefined}
							captionLayout="dropdown"
							onSelect={(date) => {
								setDate(date ?? null)
								setOpen(false)
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div className="flex flex-col gap-3">
				<Label htmlFor="time-picker" className="px-1">
					Time
				</Label>
				<Input
					type="time"
					id="time-picker"
					step="1"
					value={time}
					onChange={(e) => setTime(e.target.value)}
					className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
				/>
			</div>
		</div>
	)
}