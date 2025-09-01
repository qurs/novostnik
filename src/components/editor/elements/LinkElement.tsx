import { Editor } from "@tiptap/react"
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Link, Unlink } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function LinkElement({
	editor
}: {
	editor: Editor
}) {
	const [ link, setLink ] = useState<string>('')

	const sendLinkToEditor = () => {
		editor.chain().focus().setLink({href: link}).run()
	}

	return (
		<Popover>
			<PopoverTrigger>
				<Link className="size-4 cursor-pointer" />
			</PopoverTrigger>
			<PopoverContent className="p-2">
				<div className="flex justify-center items-center gap-3">
					<Input type="url" placeholder="https://google.com" onKeyDown={(e) => {if (e.code == 'Enter') sendLinkToEditor()}} onChange={(e) => setLink(e.currentTarget.value)} />
					<Tooltip>
						<TooltipTrigger>
							<Check className="size-6 cursor-pointer" onClick={() => sendLinkToEditor()} />
						</TooltipTrigger>
						<TooltipContent>Apply link</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger>
							<Unlink className="size-6 cursor-pointer" onClick={() => editor.chain().focus().unsetLink().run()} />
						</TooltipTrigger>
						<TooltipContent>Unset link</TooltipContent>
					</Tooltip>
				</div>
			</PopoverContent>
		</Popover>
	)
}