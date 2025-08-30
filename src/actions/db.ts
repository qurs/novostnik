'use server'

import { PrismaClient, News } from "@/generated/client"
import { getServerSession } from "next-auth"


const prisma = new PrismaClient()

export async function fetchPinnedNewsFromDB(): Promise<News[]> {
	const date = new Date()
	const news = await prisma.news.findMany({ where: { isPinned: true, draft: false, publishedAt: { lte: date }, pinnedAt: { lte: date } } })
	return news.sort((a, b) => (a.pinnedAt!.getTime() - b.pinnedAt!.getTime()))
}

export async function fetchNewsFromDBBySlug(slug: string): Promise<News | null> {
	return await prisma.news.findUnique({ where: { slug: slug } })
}

export async function isCurrentUserAdmin(): Promise<boolean> {
	const session = await getServerSession()
	if (!session || !session.user || !session.user.email) return false

	const user = await prisma.admins.findUnique({ where: { email: session.user.email } })
	if (!user || !user.role) return false

	return user.role == process.env.NEXT_PUBLIC_ADMIN_ROLE
}