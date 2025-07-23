import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import {AppError} from "./errors/AppError";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	const status = err instanceof AppError ? err.status : StatusCodes.INTERNAL_SERVER_ERROR;
	const message = err.message || 'Internal Server Error';

	res.status(status).json({ message });
};