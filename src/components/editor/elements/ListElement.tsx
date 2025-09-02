import { Editor } from "@tiptap/react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";

export enum ListElementType {
	Ordered = 'orderedList',
	Bullet = 'bulletList',
}

export default function ListElement({
	children,
	editor,
	type,
}: {
	editor: Editor,
	type: ListElementType,
	children: React.ReactNode,
}) {
	const action = type == ListElementType.Ordered ? editor.chain().focus().toggleOrderedList().run : editor.chain().focus().toggleBulletList().run

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Toggle
					pressed={editor.isActive(type)}
					onPressedChange={action}>
						{children}
				</Toggle>
			</TooltipTrigger>
			<TooltipContent>
				{`${type == ListElementType.Ordered ? 'Ordered' : 'Bullet'} List`}
			</TooltipContent>
		</Tooltip>
	)
}