import { StatusCodes } from 'http-status-codes';
export class AppError extends Error {
	constructor(public message: string, public status: number = 400) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class BadRequestError extends AppError {
	constructor(message = 'Forbidden') {
		super(message, StatusCodes.BAD_REQUEST);
	}
}

export class NotFoundError extends AppError {
	constructor(message = 'Not Found') {
		super(message, StatusCodes.NOT_FOUND);
	}
}

export class ForbiddenError extends AppError {
	constructor(message = 'Forbidden') {
		super(message, StatusCodes.FORBIDDEN);
	}
}
