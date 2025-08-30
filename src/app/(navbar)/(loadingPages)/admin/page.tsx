import { isCurrentUserAdmin } from "@/actions/db"
import AdminPageContent from "@/components/AdminPageContent"
import { notFound } from "next/navigation"

export default async function AdminPage() {
	const isAdmin = await isCurrentUserAdmin()
	if (!isAdmin) {
		return notFound()
	}

	return <AdminPageContent />
}