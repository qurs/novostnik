import { Editor } from "@tiptap/react"
import { 
	Brush,
	Heading1,
	Heading2,
	Heading3,
	Link,
	List,
	ListOrdered,
	PaintBucket,
	Unlink
} from "lucide-react"
import { Toggle } from "../ui/toggle"
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import LinkElement from "./elements/LinkElement";

interface Option {
	icon?: React.ReactNode,
	tooltip: string,
	action?: () => void,
	isActive?: boolean,
	customElement?: React.ReactNode,
}

export default function EditorMenuBar({ editor }: {editor: Editor}) {
	const [ link, setLink ] = useState('')

	if (!editor) {
		return null;
	}

	const Options: Option[] = [
		{
			icon: <Heading1 className="size-4" />,
			tooltip: 'Heading 1',
			action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
			isActive: editor.isActive('heading', { level: 1 }),
		},
		{
			icon: <Heading2 className="size-4" />,
			tooltip: 'Heading 2',
			action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
			isActive: editor.isActive('heading', { level: 2 }),
		},
		{
			icon: <Heading3 className="size-4" />,
			tooltip: 'Heading 3',
			action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
			isActive: editor.isActive('heading', { level: 3 }),
		},
		{
			icon: <ListOrdered className="size-4" />,
			tooltip: 'Ordered List',
			action: () => editor.chain().focus().toggleOrderedList().run(),
			isActive: editor.isActive('orderedList'),
		},
		{
			icon: <List className="size-4" />,
			tooltip: 'Bullet List',
			action: () => editor.chain().focus().toggleBulletList().run(),
			isActive: editor.isActive('bulletList'),
		},
		{
			tooltip: 'Text Color',
			customElement: (
				<label className="inline-flex items-center gap-1 cursor-pointer">
					<Brush className="size-4" />
					<input
						type="color"
						onChange={(e) => editor.chain().focus().setColor(e.currentTarget.value).run()}
						className="w-6 h-6 p-0 m-0 border-0 bg-transparent cursor-pointer"
					/>
				</label>
			),
		},
		{
			tooltip: 'Background Text Color',
			customElement: (
				<label className="inline-flex items-center gap-1 cursor-pointer">
					<PaintBucket className="size-4" />
					<input
						type="color"
						onChange={(e) => editor.chain().focus().setBackgroundColor(e.currentTarget.value).run()}
						className="w-6 h-6 p-0 m-0 border-0 bg-transparent cursor-pointer"
					/>
				</label>
			),
		},
		{
			tooltip: 'Link',
			customElement: <LinkElement editor={editor} />,
		},
	]

	return (
		<div className="border rounded-t-md p-1 mb-1 bg-slate-900 space-x-2 z-50">
			{Options.map((option, index) => (
				<Tooltip key={index}>
					<TooltipTrigger asChild>
						{option.customElement ? option.customElement :
							<Toggle
								key={index}
								pressed={option.isActive}
								onPressedChange={() => option.action!()}>
									{option.icon}
							</Toggle>
						}
						
					</TooltipTrigger>
					<TooltipContent>
						<p>{option.tooltip}</p>
					</TooltipContent>
				</Tooltip>
			))}
		</div>
	)
}