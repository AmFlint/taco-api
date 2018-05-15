import * as express from 'express';
import * as bodyParser from 'body-parser';

class App {
    public app: express.Application;

    public constructor() {
        this.app = express();
        this.start();
    }

    public start(): void {
        const router = express.Router();

        console.log('called')

        router.get('/health', (req: express.Request, res: express.Response) => {
            return res.status(200).send({healthy: true});
        });

        this.app.use(router);
    }
};

export default new App().app;