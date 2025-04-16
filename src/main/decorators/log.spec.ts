import { mock, MockProxy } from 'jest-mock-extended';
import { LogControllerDecorator } from './log';
import { Controller } from '../../presentation/controllers/protocols';
import {
    HttpRequest,
    HttpResponse,
} from '../../presentation/helpers/http/messages';
import { LogErrorRepository } from '../../data/protocols/repositories';

let sut: LogControllerDecorator;
let controllerStub: MockProxy<Controller>;
let logErrorRepository: MockProxy<LogErrorRepository>;

type CreateAccount = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

describe('LogControllerDecorator', () => {
    beforeEach(() => {
        controllerStub = mock<Controller>();
        logErrorRepository = mock<LogErrorRepository>();
        sut = new LogControllerDecorator(controllerStub, logErrorRepository);
    });

    it('should call Controller.handle', async () => {
        controllerStub.handle.mockResolvedValue(
            new HttpResponse().ok({ name: 'Fábio' }),
        );

        const httpRequest = new HttpRequest().body({
            email: '',
            name: '',
            password: '',
            passwordConfirmation: '',
        });

        await sut.handle(httpRequest);

        expect(controllerStub.handle).toHaveBeenCalledWith(httpRequest);
    });

    it('should return the same result as sut.handler', async () => {
        const mockResponse = new HttpResponse().ok({ name: 'Fábio' });

        jest.spyOn(sut, 'handle').mockResolvedValueOnce(mockResponse);
        controllerStub.handle.mockResolvedValue(mockResponse);

        const httpRequest = new HttpRequest().body({
            name: 'Fábio',
            email: 'fabio.costa@consistem.com.br',
            password: 'pass',
            passwordConfirmation: 'pass',
        });

        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.getBody()).toEqual(mockResponse.getBody());
    });

    it('should call LogErrorRepository with correct error if controller returns a server error', async () => {
        const error = new Error();
        error.stack = 'error_stack';

        controllerStub.handle.mockResolvedValueOnce(
            new HttpResponse().serverError(error),
        );

        const httpRequest = new HttpRequest().body<CreateAccount>({
            email: 'valid@email.com',
            name: 'John Doe',
            password: '123',
            passwordConfirmation: '123',
        });

        await sut.handle(httpRequest);

        expect(logErrorRepository.log).toHaveBeenCalledWith('error_stack');
    });
});
