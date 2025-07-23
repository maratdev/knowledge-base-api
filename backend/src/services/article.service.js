"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const article_model_1 = require("../models/article.model");
const AppError_1 = require("../middlewares/errors/AppError");
class ArticleService {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return article_model_1.Article.create(data);
        });
    }
    static update(id, userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield article_model_1.Article.findByPk(id);
            if (!article)
                throw new AppError_1.NotFoundError('Article not found');
            if (article.user_id !== userId) {
                throw new AppError_1.ForbiddenError('Forbidden: You cannot update someone else article');
            }
            return article.update(data);
        });
    }
    static delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield article_model_1.Article.findByPk(id);
            if (!article)
                throw new AppError_1.NotFoundError('Article not found');
            if (article.user_id !== userId) {
                throw new AppError_1.ForbiddenError('Forbidden: You cannot update someone else article');
            }
            return article.destroy();
        });
    }
    static getOne(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, includePrivate = false) {
            const article = yield article_model_1.Article.findByPk(id);
            if (!article)
                throw new AppError_1.NotFoundError('Article not found');
            if (!includePrivate && !article.isPublic) {
                throw new AppError_1.BadRequestError('Access denied');
            }
            return article;
        });
    }
    static getAll(tags_1) {
        return __awaiter(this, arguments, void 0, function* (tags, includePrivate = false, limit = ArticleService.DEFAULT_LIMIT, page = 1) {
            const where = {};
            if (tags) {
                where.tags = { $overlap: tags };
            }
            if (!includePrivate) {
                where.isPublic = true;
            }
            const safeLimit = Math.min(limit, ArticleService.MAX_LIMIT);
            const safePage = Math.max(page, 1);
            const offset = (safePage - 1) * safeLimit;
            return article_model_1.Article.findAll({ where, limit: safeLimit, offset });
        });
    }
}
exports.ArticleService = ArticleService;
ArticleService.MAX_LIMIT = 1000;
ArticleService.DEFAULT_LIMIT = 100;
