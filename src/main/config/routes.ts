import { Express, Router } from 'express';
import fastGlob from 'fast-glob';

export default (app: Express) => {
    const router = Router();

    app.use('/api', router);

    fastGlob.sync('**/src/main/routes/**.routes.ts').forEach(async file => {
        (await import(`../../../${file}`)).default(router);
    });
};
