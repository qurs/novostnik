import { isCurrentUserAdmin, setNewsContent } from "@/actions/db"
import { NextRequest } from "next/server"

const handler = async (
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) => {
	const isAdmin = await isCurrentUserAdmin()
	if (!isAdmin) {
		return Response.redirect('/', 403)
	}

	const { id } = await params
	if (!id || id.trim() == '') {
		return Response.error()
	}

	const content = await req.text()
	if (!content || content.trim() == '') {
		return Response.error()
	}

	if (!(await setNewsContent(id, content))) {
		return Response.error()
	}

	return new Response(null, {
		status: 200,
	})
}

export { handler as POST }