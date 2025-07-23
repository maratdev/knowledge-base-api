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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_service_1 = require("../services/article.service");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const logger_1 = __importDefault(require("../utils/logger"));
const article_schema_1 = require("../schemas/article.schema");
const http_status_codes_1 = require("http-status-codes");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authGuard, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseResult = article_schema_1.CreateArticleSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: parseResult.error.issues });
        }
        const { title, content, tags, isPublic } = req.body;
        const userId = req.user.userId;
        const article = yield article_service_1.ArticleService.create({ title, content, tags, isPublic, user_id: userId });
        res.json(article);
    }
    catch (err) {
        logger_1.default.error({ err: err.message, userId: req.user.userId });
        next(err);
    }
}));
router.put('/:id', auth_middleware_1.authGuard, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idResult = article_schema_1.IdParamSchema.safeParse(req.params);
        if (!idResult.success) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: idResult.error.issues });
        }
        const bodyResult = article_schema_1.UpdateArticleSchema.safeParse(req.body);
        if (!bodyResult.success) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: bodyResult.error.issues });
        }
        const userId = req.user.userId;
        const article = yield article_service_1.ArticleService.update(req.params.id, userId, req.body);
        res.json(article);
    }
    catch (err) {
        logger_1.default.error({ err: err.message, userId: req.user.userId });
        next(err);
    }
}));
router.delete('/:id', auth_middleware_1.authGuard, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseResult = article_schema_1.IdParamSchema.safeParse(req.params);
        if (!parseResult.success) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: parseResult.error.issues });
        }
        const userId = req.user.userId;
        yield article_service_1.ArticleService.delete(req.params.id, userId);
        res.json({ message: 'Deleted' });
    }
    catch (err) {
        logger_1.default.error({ err: err.message, userId: req.user.userId });
        next(err);
    }
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseResult = article_schema_1.IdParamSchema.safeParse(req.params);
        if (!parseResult.success) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: parseResult.error.issues });
        }
        const article = yield article_service_1.ArticleService.getOne(req.params.id);
        res.json(article);
    }
    catch (err) {
        logger_1.default.error(err.message);
        next(err);
    }
}));
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseResult = article_schema_1.getArticlesQuerySchema.safeParse(req.query);
        if (!parseResult.success) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: parseResult.error.issues });
        }
        const { limit, page, tags } = parseResult.data;
        const tagsArr = tags ? tags.split(',') : undefined;
        const articles = yield article_service_1.ArticleService.getAll(tagsArr, false, limit, page);
        res.json(articles);
    }
    catch (err) {
        logger_1.default.error(err.message);
        next(err);
    }
}));
exports.default = router;
