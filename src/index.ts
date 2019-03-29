import { default as BuildExpressApp, Express } from 'express';
import { default as CategorizedDataLogger } from './logger';
import { registerLoggerRoutes } from './routes';
import { default as bodyParser } from 'body-parser';

const PORT = 8080;
const LOGGING_PATH = './logs';

const app: Express = BuildExpressApp();

const logger = new CategorizedDataLogger(LOGGING_PATH);

app.use(bodyParser.json());

registerLoggerRoutes(app, logger);

app.listen(PORT, () => {
    console.log(`${new Date().toISOString()}: started listening on ${PORT}`);
})
