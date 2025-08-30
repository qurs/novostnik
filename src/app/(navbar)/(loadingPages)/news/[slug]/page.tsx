import { fetchNewsBySlug } from "@/actions/news"
import { News } from "@/generated/client"
import Image from "next/image"
import { notFound } from "next/navigation"
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function NewsPage({ 
	params 
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const news: News | null = await fetchNewsBySlug(slug)
	if (!news) {
		return notFound()
	}

	return (
		<>
			<div className="fixed inset-0 -z-10">
				<Image className="w-full h-full object-cover blur-xs brightness-50" src={news.image} alt="" fill />
			</div>
			<div className="flex flex-col rounded-xl m-5 px-5 pb-5 pt-2 xs:m-10 xs:px-10 xs:pb-10 xs:pt-5 md:m-15 md:px-15 md:pb-15 md:pt-10 lg:m-20 lg:px-20 lg:pb-20 lg:pt-10 bg-slate-900/90 min-h-[100vh]">
				<h1 className="text-sm tiny:text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{news.title}</h1>
				<hr className="my-5" />
				<div className="prose prose-lg max-w-none">
					<Markdown remarkPlugins={[remarkGfm]}>
						{news.content}
					</Markdown>
				</div>
			</div>
		</>
	)
}