import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align"
import { BulletList, OrderedList } from '@tiptap/extension-list'
import { BackgroundColor, TextStyle, Color } from '@tiptap/extension-text-style'
import { TableKit } from '@tiptap/extension-table'
import Link from '@tiptap/extension-link'

export default function getExtensions() {
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

				// all checks have passed
				return true
			} catch {
				return false
			}
		},
	})

	return [
		StarterKit,
		TextAlign.configure({
			types: ["heading", "paragraph"],
		}),
		OrderedList, BulletList,
		TextStyle, BackgroundColor, Color,
		LinkExtenstion,
		TableKit,
	]
}