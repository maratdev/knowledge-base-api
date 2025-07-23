import {User} from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {BadRequestError} from "../middlewares/errors/AppError";
import {config} from '../config/config';

export class AuthService {
	static async register(email: string, password: string) {
		const existing = await User.findOne({ where: { email } });
		if (existing) {
			throw new BadRequestError('User already exists');
		}

		const passwordHash = await bcrypt.hash(password, 10);

		return await User.create({email, passwordHash});
	}

	static async login(email: string, password: string) {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			throw new BadRequestError('Invalid credentials');
		}

		const valid = await bcrypt.compare(password, user.passwordHash);

		if (!valid) {
			throw new BadRequestError('Invalid credentials');
		}

		const token = jwt.sign(
			{ userId: user.id, email: user.email },
			config.jwt.secret,
			{ expiresIn: '1d' }
		);

		return { token };
	}
}
