import { Editor } from "@tiptap/react"
import { 
	Brush,
	Heading1,
	Heading2,
	Heading3,
	ImageIcon,
	Link,
	List,
	ListOrdered,
	PaintBucket,
	Table,
} from "lucide-react"
import LinkElement from "./elements/LinkElement";
import { Separator } from "@/components/ui/separator"
import HeadingElement from "./elements/HeadingElement";
import ListElement, { ListElementType } from "./elements/ListElement";
import ColorElement, { ColorElementType } from "./elements/ColorElement";
import TableElement from "./elements/TableElement";
import ImageElement from "./elements/ImageElement";

export default function EditorMenuBar({ editor }: {editor: Editor}) {
	if (!editor) {
		return null;
	}

	

	return (
		<div className="flex flex-wrap items-center border rounded-t-md p-1 mb-1 bg-slate-900 space-x-2 z-50">
			<HeadingElement editor={editor} level={1}>
				<Heading1 className="size-4" />
			</HeadingElement>
			<HeadingElement editor={editor} level={2}>
				<Heading2 className="size-4" />
			</HeadingElement>
			<HeadingElement editor={editor} level={3}>
				<Heading3 className="size-4" />
			</HeadingElement>

			<Separator className="h-8!" orientation={"vertical"} />

			<ListElement editor={editor} type={ListElementType.Ordered}>
				<ListOrdered className="size-4" />
			</ListElement>
			<ListElement editor={editor} type={ListElementType.Bullet}>
				<List className="size-4" />
			</ListElement>

			<Separator className="h-8!" orientation="vertical" />

			<ColorElement editor={editor} type={ColorElementType.Default}>
				<Brush className="size-4" />
			</ColorElement>

			<ColorElement editor={editor} type={ColorElementType.Background}>
				<PaintBucket className="size-4" />
			</ColorElement>

			<Separator className="h-8!" orientation="vertical" />

			<LinkElement editor={editor}>
				<Link className="size-4 cursor-pointer" />
			</LinkElement>

			<Separator className="h-8!" orientation="vertical" />

			<TableElement editor={editor}>
				<Table className="size-4 cursor-pointer" />
			</TableElement>

			<Separator className="h-8!" orientation="vertical" />

			<ImageElement editor={editor} />
		</div>
	)
}