'use client'
import { Editor } from "@tiptap/react"
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Check } from "lucide-react";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { ClientUploadedFileData } from "uploadthing/types";

export default function ImageElement({
	editor
}: {
	editor: Editor
}) {
	const createImage = (res: ClientUploadedFileData<{
			uploadedBy: string;
			url: string;
		}>[]
	) => {
		res.forEach(el => {
			editor.chain().focus().setImage({ src: el.ufsUrl, alt: '' }).run()
		})
	}

	return (
		<Tooltip>
			<TooltipTrigger>
				<UploadButton
					endpoint="imageUploader"
					onClientUploadComplete={createImage}
				/>
			</TooltipTrigger>
			<TooltipContent>
				Insert Image
			</TooltipContent>
		</Tooltip>
	)
}