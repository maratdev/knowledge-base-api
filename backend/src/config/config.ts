import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
	app: {
		port: process.env.PORT || 3000,
		nodeEnv: process.env.NODE_ENV || 'development',
	},
	db: {
		host: process.env.DB_HOST || 'localhost',
		port: Number(process.env.DB_PORT) || 5432,
		user: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		name: process.env.DB_NAME || 'knowledge_base',
	},
	jwt: {
		secret: process.env.JWT_SECRET || 'secret',
	}
};
