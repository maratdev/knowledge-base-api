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
const auth_service_1 = require("../services/auth.service");
const logger_1 = __importDefault(require("../utils/logger"));
const auth_schema_1 = require("../schemas/auth.schema");
const http_status_codes_1 = require("http-status-codes");
const router = (0, express_1.Router)();
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseResult = auth_schema_1.AuthSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: parseResult.error.issues });
        }
        const { email, password } = req.body;
        const user = yield auth_service_1.AuthService.register(email, password);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ id: user.id, email: user.email });
    }
    catch (err) {
        logger_1.default.error(err.message);
        next(err);
    }
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseResult = auth_schema_1.AuthSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: parseResult.error.issues });
        }
        const { email, password } = req.body;
        const { token } = yield auth_service_1.AuthService.login(email, password);
        res.json({ token });
    }
    catch (err) {
        logger_1.default.error(err.message);
        next(err);
    }
}));
exports.default = router;
