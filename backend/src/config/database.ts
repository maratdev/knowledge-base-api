import { Sequelize } from 'sequelize';
import { config } from './config';
import logger from '../utils/logger';

const sequelize = new Sequelize(
	config.db.name,
	config.db.user,
	config.db.password,
	{
		host: config.db.host,
		port: config.db.port,
		dialect: 'postgres',
		logging: (msg) => logger.debug(msg),
	}
);

export default sequelize;
