import { Request, Response } from 'express';
import { Controller } from '../../presentation/controllers/protocols';
import { HttpRequest } from '../../presentation/controllers/http/messages';

export const controllerAdapter = (controller: Controller) => {
    return async function (req: Request, res: Response) {
        const httpRequest = new HttpRequest({
            body: req.body,
            headers: req.headers,
        });

        const httpResponse = await controller.handle(httpRequest);

        res.status(httpResponse.getStatusCode()).json(httpResponse.getBody());
    };
};
