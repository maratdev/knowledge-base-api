import { User, Article } from '../models';
import { BadRequestError, ForbiddenError, NotFoundError } from "../middlewares/errors/AppError";

export class ArticleService {
	static readonly MAX_LIMIT = 1000;
	static readonly DEFAULT_LIMIT = 100;

	static async create(data: { title: string; content: string; tags: string[]; isPublic: boolean, user_id: string }) {
		const user = await User.findByPk(data.user_id);
		if (!user) {
			throw new NotFoundError('User not found');
		}
		return Article.create(data);
	}

	static async update(id: string, userId: string, data: Partial<Article>) {
		const article = await Article.findByPk(id);
		if (!article) throw new NotFoundError('Article not found');

		if (article.user_id !== userId) {
			throw new ForbiddenError ('Forbidden: You cannot update someone else article');
		}
		return article.update(data);
	}

	static async delete(id: string,  userId: string,) {
		const article = await Article.findByPk(id);
		if (!article) throw new NotFoundError('Article not found');

		if (article.user_id !== userId) {
			throw new ForbiddenError('Forbidden: You cannot update someone else article');
		}
		return article.destroy();
	}

	static async getOne(id: string, includePrivate = false) {
		const article = await Article.findByPk(id);
		if (!article) throw new NotFoundError('Article not found');

		if (!includePrivate && !article.isPublic) {
			throw new BadRequestError('Access denied');
		}

		return article;
	}

	static async getAll(
		tags?: string[],
		includePrivate = false,
		limit: number = ArticleService.DEFAULT_LIMIT,
		page: number = 1
	) {
		const where: any = {};

		if (tags) {
			where.tags = { $overlap: tags };
		}

		if (!includePrivate) {
			where.isPublic = true;
		}

		const safeLimit = Math.min(limit, ArticleService.MAX_LIMIT);
		const safePage = Math.max(page, 1);
		const offset = (safePage - 1) * safeLimit;

		return Article.findAll({ where, limit: safeLimit, offset });
	}
}
