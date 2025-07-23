"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("./errors/AppError");
const errorHandler = (err, req, res, next) => {
    const status = err instanceof AppError_1.AppError ? err.status : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
};
exports.errorHandler = errorHandler;
