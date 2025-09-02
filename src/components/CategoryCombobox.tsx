import { Ref, useEffect, useImperativeHandle, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { cn } from "@/lib/utils"
import { fetchCategories } from "@/actions/db"
import { NewsCategory } from "@/generated/client"

export default function CategoryCombobox({
	ref,
	defaultValue,
}: {
	ref: Ref<() => string>,
	defaultValue?: string,
}) {
	const [open, setOpen] = useState(false)
  	const [value, setValue] = useState(defaultValue || '')

	const [ categories, setCategories ] = useState<NewsCategory[]>([])

	useEffect(() => {
		fetchCategories().then(setCategories)
	}, [])

	useImperativeHandle(ref, () => (() => value))

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value
						? categories.find(category => category.id === value)?.name
						: "Select category..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search category..." className="h-9" />
					<CommandList>
						<CommandEmpty>No category found.</CommandEmpty>
						<CommandGroup>
							{categories.map(category => (
								<CommandItem
									key={category.id}
									value={category.id}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue)
										setOpen(false)
									}}
								>
									{category.name}
									<Check
										className={cn(
											"ml-auto",
											value === category.id ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}