'use server'
import { fetchNewsBySlug } from "@/actions/news"
import { News } from "@/generated/client"
import { notFound } from "next/navigation"
import PageContent from "@/components/PageContent"

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

	return <PageContent news={news} />
}