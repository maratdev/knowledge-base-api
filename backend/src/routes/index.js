"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const article_controller_1 = __importDefault(require("../controllers/article.controller"));
const router = (0, express_1.Router)();
router.use('/auth', auth_controller_1.default);
router.use('/articles', article_controller_1.default);
exports.default = router;
