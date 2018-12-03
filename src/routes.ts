import { Express, Request, Response } from 'express';

import CategorizedDataLogger from './logger';

export function registerLoggerRoutes(app: Express, logger: CategorizedDataLogger) {
    app.post('/log/:category', (req: Request, res: Response) => {
        console.log(`${req.params['category']}: ${JSON.stringify(req.body)}`);
        
        logger.Log(req.params['category'], req.body)
        .then(() => {
            res.status(200).send();
        })
        .catch( (err) => {
            console.log(JSON.stringify(err));
            res.status(500).send(JSON.stringify(err));
        })
    });

    app.get('/log/:category')
}

