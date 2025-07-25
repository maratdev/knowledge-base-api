require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

module.exports = {
		[env]: {
				username: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
				host: process.env.DB_HOST,
				port: process.env.DB_PORT || 5432,
				dialect: 'postgres'
		}
};