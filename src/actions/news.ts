'use server'

import { News } from "@/generated/client"
import * as db from "./db"
import { z } from 'zod'
import { UTApi, UTFile } from "uploadthing/server";

const UpdateTitleSchema = z.object({
	title: z.string({
		error: 'Invalid title',
	}).min(3).max(64),
})

const UpdateImageSchema = z.object({
	image: z.file({
		error: 'Invalid image',
	}).mime(["image/png", "image/jpeg"]).max(5_000_000),
})

interface Result {
	ok: boolean
	err?: string
}

export async function updateNewsTitle(id: string, formData: FormData): Promise<Result> {
	const validatedFields = UpdateTitleSchema.safeParse({
		title: formData.get('title'),
	})

	if (!validatedFields.success) {
		return {ok: false, err: validatedFields.error.message}
	}

	const res = await db.updateNewsTitle(id, validatedFields.data.title)
	if (!res.ok) {
		return {ok: false, err: res.err}
	}

	return {ok: true}
}

export async function updateNewsImage(id: string, formData: FormData): Promise<Result> {
	const validatedFields = UpdateImageSchema.safeParse({
		image: formData.get('image'),
	})

	if (!validatedFields.success) {
		return {ok: false, err: validatedFields.error.message}
	}

	const utapi = new UTApi();
	const file = new UTFile([validatedFields.data.image], validatedFields.data.image.name, { customId: `uploaded-${validatedFields.data.image.name}` });
	const [res] = await utapi.uploadFiles([file]);
	if (res.error) {
		return {ok: false, err: res.error.message}
	}

	const updateRes = await db.updateNewsImage(id, res.data.ufsUrl)
	if (!updateRes.ok) {
		return {ok: false, err: updateRes.err}
	}

	return {ok: true}
}

export async function fetchPinnedNews(): Promise<News[]> {
	return db.fetchPinnedNewsFromDB()
}

export async function fetchNewsBySlug(slug: string): Promise<News | null> {
	return db.fetchNewsFromDBBySlug(slug)
}

export async function fetchNewsById(id: string): Promise<News | null> {
	return db.fetchNewsFromDBById(id)
}