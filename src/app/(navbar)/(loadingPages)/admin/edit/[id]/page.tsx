'use server'
import { isCurrentUserAdmin, fetchNewsFromDBById } from "@/actions/db"
import AdminEditPageContent from "@/components/AdminEditPageContent"
import { News } from "@/generated/prisma/client"
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
	const news: News | null = await fetchNewsFromDBById(id)
	if (!news) {
		return notFound()
	}

	return <AdminEditPageContent news={news} />
}