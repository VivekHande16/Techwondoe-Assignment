import winston from 'winston';

const logger = winston.createLogger({
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'error.log', level: 'error' }), new winston.transports.File({ filename: 'combined.log' })],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`),
    ),
});

export default logger;
