"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdParamSchema = exports.UpdateArticleSchema = exports.CreateArticleSchema = exports.getArticlesQuerySchema = void 0;
const zod_1 = require("zod");
exports.getArticlesQuerySchema = zod_1.z.object({
    limit: zod_1.z.coerce.number()
        .default(100)
        .refine(val => val > 0, { message: 'limit must be positive' }),
    page: zod_1.z.coerce.number()
        .default(1)
        .refine(val => val > 0, { message: 'page must be positive' }),
    tags: zod_1.z.string().optional()
});
exports.CreateArticleSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    content: zod_1.z.string().min(1, 'Content is required'),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    isPublic: zod_1.z.boolean().default(true),
});
exports.UpdateArticleSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    content: zod_1.z.string().min(1).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    isPublic: zod_1.z.boolean().optional(),
});
exports.IdParamSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, 'id must be a number'),
});
