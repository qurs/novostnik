'use server'
import { News } from "@/generated/prisma/client"
import { notFound } from "next/navigation"
import PageContent from "@/components/PageContent"
import { fetchNewsFromDBBySlug } from "@/actions/db"
import { Metadata } from "next"

export async function generateMetadata({ 
	params 
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const news: News | null = await fetchNewsFromDBBySlug(slug)
	if (!news) {
		return notFound()
	}

	return {
		title: news.title,
		description: news.title,
		openGraph: {
			images: news.image,
		}
	}
}

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