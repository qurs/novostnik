'use server'

import { PrismaClient, News, NewsCategory } from "@/generated/client"
import { NewsWhereInput, PrismaClientKnownRequestError } from "@/generated/internal/prismaNamespace"
import { getServerSession } from "next-auth"
import { generateSlug } from 'url-slug-generator'


const prisma = new PrismaClient()

export interface NewsResponse {
	ok: boolean
	err?: string
	news?: News
}

interface UpdateNewsStruct {
	title?: string,
	image?: string,
	draft: boolean,
	isPinned: boolean,
	categoryId: string,
	publishedAt: Date | null,
	pinnedAt: Date | null,
}

export async function createNews(title: string): Promise<NewsResponse> {
	try {
		const slug = generateSlug(title, {maxLength: 64})
		await prisma.news.create({ data: {title, slug} })
		return {ok: true}
	}
	catch (e) {
		if (e instanceof PrismaClientKnownRequestError) {
			let err = ''
			switch (e.code) {
				case 'P2002':
					err = `Duplicate field value`
					break
				case 'P2014':
					err = `Invalid ID`
					break
				case 'P2003':
					err = `Invalid input data`
					break
				default:
					err = `Something went wrong`
			}

			return {ok: false, err: err}
		}

		return {ok: false}
	}
}

export async function updateNewsMetadata(id: string, data: UpdateNewsStruct): Promise<NewsResponse> {
	try {
		let slug: string | undefined
		if (data.title) {
			slug = generateSlug(data.title, {maxLength: 64})
		}

		const news = await prisma.news.update({ where: {id}, data: {slug, ...data} })
		return {ok: true, news: news}
	}
	catch (e) {
		if (e instanceof PrismaClientKnownRequestError) {
			let err = ''
			switch (e.code) {
				case 'P2002':
					err = `Duplicate field value`
					break
				case 'P2014':
					err = `Invalid ID`
					break
				case 'P2003':
					err = `Invalid input data`
					break
				default:
					err = `Something went wrong`
			}

			return {ok: false, err: err}
		}

		return {ok: false}
	}
}

export async function fetchPinnedNewsFromDB(): Promise<News[]> {
	const date = new Date()
	const news = await prisma.news.findMany({ where: { isPinned: true, draft: false, publishedAt: { lte: date }, pinnedAt: { lte: date } } })
	return news.sort((a, b) => (b.pinnedAt!.getTime() - a.pinnedAt!.getTime()))
}

export async function fetchNewsFromDBBySlug(slug: string): Promise<News | null> {
	return await prisma.news.findUnique({ where: { slug: slug } })
}

export async function fetchNewsFromDBById(id: string): Promise<News | null> {
	return await prisma.news.findUnique({ where: { id: id } })
}

export async function fetchNews(page: number, pageSize: number, where?: NewsWhereInput): Promise<News[]> {
	return await prisma.news.findMany({
		skip: (page - 1) * pageSize,
		take: pageSize,
		where,
	})
}

export async function fetchCategories(): Promise<NewsCategory[]> {
	return await prisma.newsCategory.findMany()
}

export async function fetchNewsMaxPage(pageSize: number): Promise<number> {
	return Math.ceil(await prisma.news.count() / pageSize)
}

export async function setNewsContent(id: string, content: string): Promise<boolean> {
	try {
		await prisma.news.update({ where: { id: id }, data: { content: content } })
		return true
	}
	catch(e) {
		return false
	}
}

export async function isCurrentUserAdmin(): Promise<string | undefined> {
	const session = await getServerSession()
	if (!session || !session.user || !session.user.email) return

	const user = await prisma.admins.findUnique({ where: { email: session.user.email } })
	if (!user || !user.role) return

	if (user.role != process.env.NEXT_PUBLIC_ADMIN_ROLE) return
	return user.role
}