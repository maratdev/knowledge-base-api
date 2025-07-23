import {NextFunction, Request, Response, Router} from 'express';
import {ArticleService} from '../services/article.service';
import {authGuard} from '../middlewares/auth.middleware';
import logger from '../utils/logger';
import {
	CreateArticleSchema,
	getArticlesQuerySchema,
	IdParamSchema,
	UpdateArticleSchema
} from '../schemas/article.schema';
import { StatusCodes } from 'http-status-codes';
const router = Router();

router.post('/', authGuard, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const parseResult = CreateArticleSchema.safeParse(req.body);
		if (!parseResult.success) {
			return res.status(StatusCodes.BAD_REQUEST).json({ error: parseResult.error.issues });
		}

		const { title, content, tags, isPublic } = req.body;
		const userId = req.user!.userId;
		const article = await ArticleService.create({ title, content, tags, isPublic, user_id: userId });
		res.json(article);
	} catch (err: any) {
		logger.error({err: err.message, userId: req.user!.userId});
		next(err);
	}
});

router.put('/:id', authGuard, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const idResult = IdParamSchema.safeParse(req.params);
		if (!idResult.success) {
			return res.status(StatusCodes.BAD_REQUEST).json({ error: idResult.error.issues });
		}

		const bodyResult = UpdateArticleSchema.safeParse(req.body);
		if (!bodyResult.success) {
			return res.status(StatusCodes.BAD_REQUEST).json({ error: bodyResult.error.issues });
		}

		const userId = req.user!.userId;
		const article = await ArticleService.update(req.params.id, userId, req.body);
		res.json(article);
	} catch (err: any) {
		logger.error({err: err.message, userId: req.user!.userId});
		next(err);
	}
});

router.delete('/:id', authGuard, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const parseResult = IdParamSchema.safeParse(req.params);
		if (!parseResult.success) {
			return res.status(StatusCodes.BAD_REQUEST).json({ error: parseResult.error.issues });
		}

		const userId = req.user!.userId;
		await ArticleService.delete(req.params.id, userId);
		res.json({ message: 'Deleted' });
	} catch (err: any) {
		logger.error({err: err.message, userId: req.user!.userId});
		next(err);
	}
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const parseResult = IdParamSchema.safeParse(req.params);
		if (!parseResult.success) {
			return res.status(StatusCodes.BAD_REQUEST).json({ error: parseResult.error.issues });
		}
		const article = await ArticleService.getOne(req.params.id);
		res.json(article);
	} catch (err: any) {
		logger.error(err.message);
		next(err);
	}
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const parseResult = getArticlesQuerySchema.safeParse(req.query);
		if (!parseResult.success) {
			return res.status(StatusCodes.BAD_REQUEST).json({ error: parseResult.error.issues });
		}
		const { limit, page, tags } = parseResult.data;
		const tagsArr = tags ? tags.split(',') : undefined;
		const articles = await ArticleService.getAll(tagsArr, false, limit, page);
		if (!articles || articles.length === 0) {
			return res.status(StatusCodes.NO_CONTENT).send();
		}
		res.json(articles);
	} catch (err: any) {
		logger.error(err.message);
		next(err);
	}
});

export default router;
