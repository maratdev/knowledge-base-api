"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.NotFoundError = exports.BadRequestError = exports.AppError = void 0;
const http_status_codes_1 = require("http-status-codes");
class AppError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.message = message;
        this.status = status;
        this.name = this.constructor.name;
    }
}
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(message = 'Forbidden') {
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends AppError {
    constructor(message = 'Not Found') {
        super(message, http_status_codes_1.StatusCodes.NOT_FOUND);
    }
}
exports.NotFoundError = NotFoundError;
class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
        super(message, http_status_codes_1.StatusCodes.FORBIDDEN);
    }
}
exports.ForbiddenError = ForbiddenError;
