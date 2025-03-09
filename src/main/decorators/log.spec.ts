import { mock, MockProxy } from 'jest-mock-extended';
import { LogControllerDecorator } from './log';
import { Controller } from '../../presentation/controllers/protocols';
import {
    HttpRequest,
    HttpResponse,
} from '../../presentation/controllers/http/messages';

let sut: LogControllerDecorator;
let controllerStub: MockProxy<Controller>;

describe('LogControllerDecorator', () => {
    beforeEach(() => {
        controllerStub = mock<Controller>();
        sut = new LogControllerDecorator(controllerStub);
    });

    it('should call controller handle', async () => {
        controllerStub.handle.mockResolvedValueOnce(
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
});
