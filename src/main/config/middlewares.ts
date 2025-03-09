import type { Express } from 'express';
import { bodyParser } from '../middleweres/body-parser';
import { cors } from '../middleweres/cors';
import { contentType } from '../middleweres/content-type';

export default (app: Express) => {
    app.use(bodyParser);
    app.use(cors);
    app.use(contentType);
};
