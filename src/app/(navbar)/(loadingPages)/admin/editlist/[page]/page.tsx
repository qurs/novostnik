'use server'
import { fetchNews, fetchNewsMaxPage, isCurrentUserAdmin } from "@/actions/db"
import AdminEditListContent from "@/components/AdminEditListContent"
import { EDIT_LIST_PAGE_SIZE } from "@/configs/generic"
import { notFound } from "next/navigation"

export default async function AdminCreatePage({ 
	params 
}: {
	params: Promise<{ page: number }>
}) {
	const isAdmin = await isCurrentUserAdmin()
	if (!isAdmin) {
		return notFound()
	}

	const pageSize = EDIT_LIST_PAGE_SIZE

	const { page } = await params
	const news = await fetchNews(page, pageSize)
	const maxPage = await fetchNewsMaxPage(pageSize)

	return <AdminEditListContent page={Number(page)} maxPage={maxPage} news={news} />
}