import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {config} from '../config/config';
import { StatusCodes } from 'http-status-codes';

export interface UserPayload {
	userId: string;
	email: string;
}
declare module 'express-serve-static-core' {
	interface Request {
		user?: UserPayload;
	}
}


export function authGuard(req: Request, res: Response, next: NextFunction): void {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
		return;
	}

	const token = authHeader.split(' ')[1];

	try {
		const payload = jwt.verify(token, config.jwt.secret) as UserPayload;
		req.user = payload;

		next();
	} catch (err) {
		res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
	}
}
