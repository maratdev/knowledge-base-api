import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/config';
import logger from './utils/logger';
import sequelize from './config/database';
import router from './routes';
import { StatusCodes } from 'http-status-codes';
import { errorHandler } from "./middlewares/error-handler";

const app = express();
const PORT = config.app.port || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Тестовый маршрут
app.get('/ping', (req: Request, res: Response) => {
	res.json({ message: 'pong' });
});

app.use((req: Request, res: Response) => {
	res.status(StatusCodes.NOT_FOUND).json({ message: 'Express route not found' });
});

app.use(errorHandler);

process.on('unhandledRejection', (reason) => {
	logger.error('Unhandled Rejection:', reason);
	process.exit(1);
});

process.on('uncaughtException', (err) => {
	logger.error('Uncaught Exception:', err);
	process.exit(1);
});

(async () => {
	try {
		await sequelize.authenticate();
		logger.info('Database connected successfully');

		app.listen(PORT, () => {
			logger.info(`Server is running on port ${PORT}`);
		});

	} catch (err) {
		logger.error('Unable to connect to the database');
		logger.error(err);
		process.exit(1);
	}
})();
