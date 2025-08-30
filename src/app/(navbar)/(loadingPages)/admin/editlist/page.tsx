import { isCurrentUserAdmin } from "@/actions/db"
import AdminEditListContent from "@/components/AdminEditListContent"
import { notFound } from "next/navigation"

export default async function AdminCreatePage() {
	const isAdmin = await isCurrentUserAdmin()
	if (!isAdmin) {
		return notFound()
	}

	return <AdminEditListContent />
}