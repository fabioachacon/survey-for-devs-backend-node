import {
    HttpRequest,
    HttpResponse,
} from '../../presentation/helpers/http/messages';
import { StatusCodes } from '../../presentation/helpers/http/StatusCode';
import { Controller } from '../../presentation/controllers/protocols';
import { LogErrorRepository } from '../../data/protocols/repositories';

export class LogControllerDecorator implements Controller {
    private readonly controller: Controller;
    private readonly logErrorRepository: LogErrorRepository;

    constructor(
        controller: Controller,
        logErrorRepository: LogErrorRepository,
    ) {
        this.controller = controller;
        this.logErrorRepository = logErrorRepository;
    }

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        const response = await this.controller.handle(request);

        if (response.getStatusCode() === StatusCodes.InternalServerError) {
            await this.logErrorRepository.log(response.getBody().stack);
        }

        return response;
    }
}
