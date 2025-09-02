import { News } from "@/generated/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { updateNewsImage, updateNewsTitle } from "@/actions/news";
import { toast } from "sonner";
import { useState } from "react";

export default function EditorSettings({
	news,
} : {
	news: News,
}) {
	const [ title, setTitle ] = useState(news.title)

	const updateTitle = (formData: FormData) => {
		updateNewsTitle(news.id, formData).then(res => {
			if (res.ok) {
				toast.success('Updating news title', {
					description: `You've successfully updated the news title to "${formData.get('title')}"`
				})
			}
			else {
				toast.error('Updating news title', {
					description: res.err
				})
			}
		})
	}

	const updateImage = (formData: FormData) => {
		updateNewsImage(news.id, formData).then(res => {
			if (res.ok) {
				toast.success('Updating news image', {
					description: 'You\'ve successfully updated the news image!'
				})
			}
			else {
				toast.error('Updating news image', {
					description: res.err
				})
			}
		})
	}

	return (
		<>
			<form action={updateTitle}>
				<div className="flex justify-between gap-2 p-2 xxxs:gap-3 xxxs:p-3 xxs:p-5 xxs:gap-5">
					<Input type="text" name="title" maxLength={64} minLength={3} defaultValue={news.title} value={title} onChange={e => setTitle(e.currentTarget.value)} />
					<Button type="submit" variant={"outline"} className="min-w-16 xxs:min-w-28 xs:min-w-36 sm:min-w-50">Update Title</Button>
				</div>
			</form>
			<form action={updateImage}>
				<div className="flex justify-between gap-2 p-2 xxxs:gap-3 xxxs:p-3 xxs:p-5 xxs:gap-5">
					<Input type="file" name="image" />
					<Button type="submit" variant={"outline"} className="min-w-16 xxs:min-w-28 xs:min-w-36 sm:min-w-50">Update Image</Button>
				</div>
			</form>
		</>
	)
}