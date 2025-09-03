'use client'

import getExtensions from "@/configs/editorExtensions"
import { News } from "@/generated/client"
import { renderToReactElement } from "@tiptap/static-renderer"
import { generateJSON, JSONContent } from "@tiptap/core"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
	subsets: ['cyrillic', 'latin'],
})

export default function PageContent({
	news,
}: {
	news: News,
}) {
	const extensions = useMemo(getExtensions, [])
	const [ json, setJson ] = useState<JSONContent | null>(null)
 
	useEffect(() => {
		setJson(generateJSON(news.content, extensions))
	}, [news.content, extensions])

	const reactElement = useMemo(() => {
		if (!json) return null
		return renderToReactElement({
			content: json,
			extensions: extensions,
		})
	}, [json, extensions])

	return (
		<>
			<div className="fixed inset-0 -z-10">
				<Image className="w-full h-full object-cover blur-xs brightness-50" src={news.image} alt="" fill />
			</div>
			<div className="flex flex-col rounded-xl m-5 px-5 pb-5 pt-2 xs:m-10 xs:px-10 xs:pb-10 xs:pt-5 md:m-15 md:px-15 md:pb-15 md:pt-10 lg:m-20 lg:px-20 lg:pb-20 lg:pt-10 bg-slate-900/90 min-h-[100vh]">
				<h1 className={`text-sm tiny:text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ${montserrat.className}`}>{news.title}</h1>
				<p className={`text-xs tiny:text-sm xs:text-base ${montserrat.className}`}>Published at: {news.publishedAt?.toLocaleString()}</p>
				<hr className="my-5" />
				<div className="tiptap">
					{reactElement}
				</div>
			</div>
		</>
	)
}