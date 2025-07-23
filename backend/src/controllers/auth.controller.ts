import { Router, Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import logger from '../utils/logger';
import { AuthSchema } from '../schemas/auth.schema';
import { StatusCodes } from "http-status-codes";

const router = Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const parseResult = AuthSchema.safeParse(req.body);
		if (!parseResult.success) {
			return res.status(StatusCodes.BAD_REQUEST).json({ error: parseResult.error.issues });
		}
		const { email, password } = req.body;
		const user = await AuthService.register(email, password);
		res.status(StatusCodes.CREATED).json({ id: user.id, email: user.email });
	} catch (err: any) {
		logger.error(err.message);
		next(err);
	}
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const parseResult = AuthSchema.safeParse(req.body);
		if (!parseResult.success) {
			return res.status(StatusCodes.BAD_REQUEST).json({ error: parseResult.error.issues  });
		}
		const { email, password } = req.body;
		const { token } = await AuthService.login(email, password);
		res.json({ token });
	} catch (err: any) {
		logger.error(err.message);
		next(err);
	}
});

export default router;
