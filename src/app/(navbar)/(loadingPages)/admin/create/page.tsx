import { isCurrentUserAdmin } from "@/actions/db"
import AdminCreatePageContent from "@/components/AdminCreatePageContent"
import { notFound } from "next/navigation"

export default async function AdminCreatePage() {
	const isAdmin = await isCurrentUserAdmin()
	if (!isAdmin) {
		return notFound()
	}

	return <AdminCreatePageContent />
}