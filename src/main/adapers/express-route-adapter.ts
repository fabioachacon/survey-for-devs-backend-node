import { Request, Response } from 'express';
import { Controller } from '../../presentation/controllers/protocols';
import { HttpRequest } from '../../presentation/helpers/http/messages';
import { StatusCodes } from '../../presentation/helpers/http/StatusCode';

export const controllerAdapter = (controller: Controller) => {
    return async function (req: Request, res: Response) {
        const httpRequest = new HttpRequest({
            body: req.body,
            headers: req.headers,
        });

        const httpResponse = await controller.handle(httpRequest);

        const statusCode = httpResponse.getStatusCode();
        if (statusCode === StatusCodes.Ok) {
            res.status(statusCode).json(httpResponse.getBody());
        } else {
            res.status(statusCode).json({
                error: httpResponse.getBody()?.message,
            });
        }
    };
};
