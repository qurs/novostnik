'use server'
import { News } from "@/generated/client"
import { notFound } from "next/navigation"
import PageContent from "@/components/PageContent"
import { fetchNewsFromDBBySlug } from "@/actions/db"

export default async function NewsPage({ 
	params 
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const news: News | null = await fetchNewsFromDBBySlug(slug)
	if (!news) {
		return notFound()
	}

	return <PageContent news={news} />
}