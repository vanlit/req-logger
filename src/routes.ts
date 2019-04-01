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
            console.log(err);
            res.status(500).send(JSON.stringify(err));
        });
    });

    app.get('/log/:category', (req: Request, res: Response) => {
        const catg = req.params['category'];
        console.log(`Returning the whole "${catg}" category.`);

        const byteSizeLimit: number = 1024*100
        const buff = Buffer.allocUnsafe(byteSizeLimit);
        logger.GetLog(catg, buff, byteSizeLimit)
        .then(()=>{
            res.send(buff);
        })
        .catch((err)=>{
            res.status(500);
            res.send(JSON.stringify(err));
        });
    });
}

