import { Company } from './entity/Company';
import { Team } from './entity/Team';
import express from 'express';
import router from './routes';
import { PORT, DB_NAME, HOST, DB_PASSWORD, DB_TYPE } from '../config';
import logger from '../src/utils/logger';

const { createConnection } = require('typeorm');
const app = express();

const main = async () => {
    try {
        await createConnection({
            type: DB_TYPE,
            host: HOST,
            username: DB_NAME,
            password: DB_PASSWORD,
            database: DB_NAME,
            entities: [Company, Team],
            synchronize: true,
        });

        logger.info('Successfully connected to Postgres database');

        app.use(express.json());
        app.use(router);

        app.listen(PORT, () => {
            logger.info(`app is running on port ${PORT}`);
        });
    } catch (error) {
        logger.error(error);
        throw new Error('unable to connect to Postgres');
    }
};

main();
