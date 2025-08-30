'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorMenuBar from './editor/EditorMenuBar'
import { useState } from 'react'
import TextAlign from "@tiptap/extension-text-align"
import { BulletList, OrderedList } from '@tiptap/extension-list'
import { BackgroundColor, TextStyle, Color } from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'

export default function AdminCreatePageContent() {
	const [post, setPost] = useState("");

	const LinkExtenstion = Link.configure({
		openOnClick: false,
		autolink: true,
		defaultProtocol: 'https',
		protocols: ['http', 'https'],
		isAllowedUri: (url, ctx) => {
			try {
				// construct URL
				const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

				// use default validation
				if (!ctx.defaultValidate(parsedUrl.href)) {
					return false
				}

				// disallowed protocols
				const disallowedProtocols = ['ftp', 'file', 'mailto']
				const protocol = parsedUrl.protocol.replace(':', '')

				if (disallowedProtocols.includes(protocol)) {
					return false
				}

				// only allow protocols specified in ctx.protocols
				const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

				if (!allowedProtocols.includes(protocol)) {
					return false
				}

				// all checks have passed
				return true
			} catch {
				return false
			}
		},
	})

	const editor = useEditor({
		extensions: [
			StarterKit,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			OrderedList, BulletList,
			TextStyle, BackgroundColor, Color,
			LinkExtenstion,
		],
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
			<EditorMenuBar editor={editor!} />
			<EditorContent className='w-full min-h-[75vh]' editor={editor} />
		</div>
	)
}