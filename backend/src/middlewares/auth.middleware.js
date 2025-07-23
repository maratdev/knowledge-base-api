"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = authGuard;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const http_status_codes_1 = require("http-status-codes");
function authGuard(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
        req.user = payload;
        next();
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
    }
}
