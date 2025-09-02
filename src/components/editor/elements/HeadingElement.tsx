import { Editor } from "@tiptap/react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { Level } from "@tiptap/extension-heading";

export default function HeadingElement({
	children,
	editor,
	level,
}: {
	editor: Editor,
	level: Level,
	children: React.ReactNode,
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Toggle
					pressed={editor.isActive('heading', { level })}
					onPressedChange={() => editor.chain().focus().toggleHeading({ level }).run()}>
						{children}
				</Toggle>
			</TooltipTrigger>
			<TooltipContent>
				{`Heading ${level}`}
			</TooltipContent>
		</Tooltip>
	)
}