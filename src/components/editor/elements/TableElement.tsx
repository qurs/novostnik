import { Editor } from "@tiptap/react"
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Check } from "lucide-react";
import { useState } from "react";

export default function TableElement({
	children,
	editor
}: {
	children: React.ReactNode,
	editor: Editor
}) {
	const [ rows, setRows ] = useState(1)
	const [ cols, setCols ] = useState(1)

	const createTable = () => {
		editor.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run()
	}

	return (
		<Popover>
			<PopoverTrigger>
				<Tooltip>
					<TooltipTrigger asChild>
						{children}
					</TooltipTrigger>
					<TooltipContent>
						Create Table
					</TooltipContent>
				</Tooltip>
			</PopoverTrigger>
			<PopoverContent className="p-2">
				<div className="flex items-center justify-center gap-5">
					<Input name="rows" type="number" min={1} max={99} placeholder="Rows count" onChange={e => setRows(Number(e.currentTarget.value))} />
					<Input name="cols" type="number" min={1} max={99} placeholder="Cols count" onChange={e => setCols(Number(e.currentTarget.value))} />
					<Check className="size-16 h-full cursor-pointer" onClick={createTable} />
				</div>
			</PopoverContent>
		</Popover>
	)
}