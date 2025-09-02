'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import EditorMenuBar from './editor/EditorMenuBar'
import { useEffect, useState } from 'react'
import { News } from '@/generated/client'
import EditorForm from './editor/EditorForm'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import getExtensions from '@/configs/editorExtensions'
import EditorSettings from './editor/EditorSettings'

export default function AdminEditPageContent({
	news
}: {
	news: News
}) {
	const [post, setPost] = useState(news.content)
	const [responseStatus, setResponseStatus] = useState(0)
	const router = useRouter()

	useEffect(() => {
		if (responseStatus == 0) return
		setResponseStatus(0)

		if (responseStatus == 200) {
			toast.success('News update', {
				description: "News page successfully updated!",
			})
		}
	}, [responseStatus])

	const editor = useEditor({
		extensions: getExtensions(),
		content: post,
		immediatelyRender: false,
		autofocus: true,
		editable: true,
		onUpdate: ({ editor }) => {
			setPost(editor.getHTML());
		},
	})

	return (
		<div className="flex flex-col rounded-xl min-h-[75vh] p-1 m-5 xxxs:m-8 xs:m-10 sm:m-15 md:mx-15 md:mt-15 lg:mt-20 bg-stone-900/50">
			<EditorSettings news={news} />
			<EditorMenuBar editor={editor!} />
			<EditorContent className='w-full min-h-[75vh]' editor={editor} />
			<EditorForm onConfirm={() => {
				fetch(`/api/news/update/${news.id}`, { method: 'POST', body: editor?.getHTML() }).then(res => {
					setResponseStatus(res.status)
				})
			}} onDecline={() => router.push('/admin/editlist/1')} />
		</div>
	)
}