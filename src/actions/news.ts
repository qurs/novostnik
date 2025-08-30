'use server'

import { News } from "@/generated/client"
import * as db from "./db"

export async function createNews(form: FormData) {

}

export async function fetchPinnedNews(): Promise<News[]> {
	return db.fetchPinnedNewsFromDB()
}

export async function fetchNewsBySlug(slug: string): Promise<News | null> {
	return db.fetchNewsFromDBBySlug(slug)
}