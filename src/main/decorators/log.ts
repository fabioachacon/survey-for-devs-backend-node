import {
    HttpRequest,
    HttpResponse,
} from '../../presentation/controllers/http/messages';
import { Controller } from '../../presentation/controllers/protocols';

export class LogControllerDecorator implements Controller {
    private readonly controller: Controller;

    constructor(controller: Controller) {
        this.controller = controller;
    }

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        await this.controller.handle(request);

        return null;
    }
}
