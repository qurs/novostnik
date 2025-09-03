'use server'

import * as db from "./db"
import { z } from 'zod'
import { UTApi, UTFile } from "uploadthing/server";

const UpdateSchema = z.object({
	title: z.string({
		error: 'Invalid title',
	}).min(3).max(64).optional(),
	image: z.file({
		error: 'Invalid image',
	}).mime(["image/png", "image/jpeg"]).max(5_000_000).optional(),
	draft: z.preprocess(
		(val) => val === "on",
    	z.boolean()
	),
	isPinned: z.preprocess(
		(val) => val === "on",
    	z.boolean()
	),
	categoryId: z.cuid().or(z.literal('')),
	publishedAt: z.coerce.date({
		error: 'Invalid publish date',
	}).nullable(),
	pinnedAt: z.coerce.date({
		error: 'Invalid pinned date',
	}).nullable(),
}).refine(obj => Object.values(obj).some(v => v !== undefined), {
  	error: 'Empty metadata!',
})

export async function updateNewsMetadata(id: string, formData: FormData): Promise<db.NewsResponse> {
	const formImageFile = formData.get('image')
	const imageFile = formImageFile instanceof File && formImageFile.size > 0 && formImageFile.name
			? formImageFile
			: undefined

	const validatedFields = UpdateSchema.safeParse({
		title: formData.get('title') || undefined,
		image: imageFile,
		draft: formData.get('draft') || false,
		isPinned: formData.get('isPinned') || false,
		categoryId: formData.get('categoryId'),
		publishedAt: formData.get('publishedAt'),
		pinnedAt: formData.get('pinnedAt'),
	})

	if (!validatedFields.success) {
		return {ok: false, err: validatedFields.error.message}
	}

	let imageUrl: string | undefined

	if (validatedFields.data.image) {
		const utapi = new UTApi();
		const file = new UTFile([validatedFields.data.image], validatedFields.data.image.name, { customId: `uploaded-${validatedFields.data.image.name}` });

		const url = `https://${process.env.UPLOADTHING_APPID}.ufs.sh/f/uploaded-${validatedFields.data.image.name}`
		const res = await fetch(url)
		if (res.ok) {
			imageUrl = url
		}
		else {
			const [res] = await utapi.uploadFiles([file]);
			if (res.error) {
				return {ok: false, err: res.error.message}
			}
			imageUrl = res.data.ufsUrl
		}
	}

	const { image, ...restData } = validatedFields.data
	return await db.updateNewsMetadata(id, {image: imageUrl, ...restData})
}