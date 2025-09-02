import { News } from "@/generated/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { updateNewsMetadata } from "@/actions/news";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { Label } from "../ui/label";
import CategoryCombobox from "../CategoryCombobox";
import { Switch } from "../ui/switch";
import DateAndTimePicker from "../DateAndTimePicker";

export default function EditorMetadataSettings({
	initialNews,
} : {
	initialNews: News,
}) {
	const [ isUpdating, setIsUpdating ] = useState(false)
	const [ news, setNews ] = useState(initialNews)
	const categoryComboRef = useRef<() => string>(null)
	const publishedAtRef = useRef<() => Date | null>(null)
	const pinnedAtRef = useRef<() => Date | null>(null)

	const updateMetadata = (formData: FormData) => {
		if (categoryComboRef.current) formData.append('categoryId', categoryComboRef.current())
		if (publishedAtRef.current && publishedAtRef.current()) formData.append('publishedAt', publishedAtRef.current()!.toISOString())
		if (pinnedAtRef.current && pinnedAtRef.current()) formData.append('pinnedAt', pinnedAtRef.current()!.toISOString())

		setIsUpdating(true)
		updateNewsMetadata(news.id, formData).then(res => {
			if (res.ok) {
				if (res.news) setNews(res.news)

				toast.success('Updating news metadata', {
					description: 'You\'ve successfully updated the news metadata!'
				})
			}
			else {
				toast.error('Updating news metadata', {
					description: res.err
				})
			}
			setIsUpdating(false)
		})
	}

	return (
		<form action={updateMetadata} className="flex flex-col justify-between gap-2 p-2 xxxs:gap-3 xxxs:p-3 xxs:p-5 xxs:gap-5">
			<div className="flex gap-2">
				<Label htmlFor="title">Title</Label>
				<Input type="text" name="title" maxLength={64} minLength={3} defaultValue={news.title} />
			</div>
			<div className="flex gap-2">
				<Label htmlFor="image">Image</Label>
				<Input type="file" name="image" />
			</div>
			<div className="flex gap-2">
				<Label htmlFor="categoryId">Category</Label>
				<CategoryCombobox ref={categoryComboRef} defaultValue={news.categoryId} />
			</div>
			<div className="flex gap-2">
				<Label htmlFor="draft">Draft</Label>
				<Switch name="draft" defaultChecked={news.draft} />
			</div>
			<div className="flex gap-2">
				<Label htmlFor="isPinned">Pin</Label>
				<Switch name="isPinned" defaultChecked={news.isPinned} />
			</div>
			<div className="flex gap-2">
				<Label htmlFor="publishedAt">Publish at</Label>
				<DateAndTimePicker ref={publishedAtRef} />
			</div>
			<div className="flex gap-2">
				<Label htmlFor="pinnedAt">Pin at</Label>
				<DateAndTimePicker ref={pinnedAtRef} />
			</div>
			
			<Button type="submit" variant={"outline"} disabled={isUpdating} className="min-w-16 xxs:min-w-28 xs:min-w-36 sm:min-w-50">Update</Button>
		</form>
	)
}