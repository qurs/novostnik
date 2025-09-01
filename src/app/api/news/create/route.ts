import { createNews, isCurrentUserAdmin } from "@/actions/db"
import { NextRequest } from "next/server"

const handler = async (
	req: NextRequest,
) => {
	const isAdmin = await isCurrentUserAdmin()
	if (!isAdmin) {
		return Response.redirect('/', 403)
	}

	const title = await req.text()
	if (!title || title.trim() == '' || title.length < 3 || title.length > 64) {
		return new Response(null, {
			status: 400,
			statusText: 'You need enter the title with length of >= 3 and <= 64 symbols'
		})
	}

	const {ok, err} = await createNews(title)
	if (!ok) {
		return new Response(null, {
			status: 400,
			statusText: err,
		})
	}

	return new Response(null, {
		status: 200,
	})
}

export { handler as POST }