import pino from 'pino';

const logger = pino({
	transport: process.env.NODE_ENV === 'development' ? {
		target: 'pino-pretty',
		options: {
			colorize: true,
			translateTime: 'HH:MM:ss',
			ignore: 'pid,hostname',
		}
	} : undefined,
	serializers: {
		err: pino.stdSerializers.err
	}
});

export default logger;
