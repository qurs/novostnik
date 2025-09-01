'use server'
import { isCurrentUserAdmin } from "@/actions/db"
import { fetchNewsById } from "@/actions/news"
import AdminEditPageContent from "@/components/AdminEditPageContent"
import { News } from "@/generated/client"
import { notFound } from "next/navigation"

export default async function AdminEditPage({ 
	params 
}: {
	params: Promise<{ id: string }>
}) {
	const isAdmin = await isCurrentUserAdmin()
	if (!isAdmin) {
		return notFound()
	}

	const { id } = await params
	const news: News | null = await fetchNewsById(id)
	if (!news) {
		return notFound()
	}

	return <AdminEditPageContent news={news} />
}