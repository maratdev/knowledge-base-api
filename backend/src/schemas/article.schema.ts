import { z } from 'zod';

export const getArticlesQuerySchema = z.object({
	limit: z.coerce.number()
		.default(100)
		.refine(val => val > 0, { message: 'limit must be positive' }),

	page: z.coerce.number()
		.default(1)
		.refine(val => val > 0, { message: 'page must be positive' }),

	tags: z.string().optional()
});

export const CreateArticleSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	content: z.string().min(1, 'Content is required'),
	tags: z.array(z.string()).default([]),
	isPublic: z.boolean().default(true),
});

export const UpdateArticleSchema = z.object({
	title: z.string().min(1).optional(),
	content: z.string().min(1).optional(),
	tags: z.array(z.string()).optional(),
	isPublic: z.boolean().optional(),
});

export const IdParamSchema = z.object({
	id: z.string().regex(/^\d+$/, 'id must be a number'),
}); 