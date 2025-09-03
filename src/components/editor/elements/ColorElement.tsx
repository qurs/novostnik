import { Editor } from "@tiptap/react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

export enum ColorElementType {
	Default = 'Text',
	Background = 'Background Text',
}

export default function ColorElement({
	children,
	editor,
	type,
}: {
	editor: Editor,
	type: ColorElementType,
	children: React.ReactNode,
}) {
	const [ color, setColor ] = useState('')

	useEffect(() => {
		if (color == '') return

		const focus = editor.chain().focus()
		switch(type) {
			case ColorElementType.Background:
				focus.setBackgroundColor(color).run()
				break
			default:
				focus.setColor(color).run()
		}
	}, [color])

	return (
		<Tooltip>
			<TooltipTrigger>
				<label className="inline-flex items-center gap-1 cursor-pointer">
					{children}
					<input
						type="color"
						onBlur={e => setColor(e.currentTarget.value)}
						className="w-6 h-6 p-0 m-0 border-0 bg-transparent cursor-pointer"
					/>
				</label>
			</TooltipTrigger>
			<TooltipContent>
				{`${type} Color`}
			</TooltipContent>
		</Tooltip>
	)
}