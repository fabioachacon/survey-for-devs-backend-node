import { mock, MockProxy } from 'jest-mock-extended';
import {
    InvalidParamError,
    MissingParamError,
} from '../../helpers/http/errors';
import { HttpRequest, HttpResponse } from '../../helpers/http/messages';
import { SignInController } from './signin';
import { EmailValidator } from '../protocols';
import { Authentication } from '../../../domain/usecases/authentication';
import { StatusCodes } from '../../helpers/http/StatusCode';
import { Validation } from '../../helpers/validators/validation';

const getMockHttpResponse = (error: Error) =>
    new HttpResponse().badRequest().body(error);

describe('SignInController', () => {
    let httpRequest: HttpRequest;
    let validationStub: MockProxy<Validation>;
    let authenticationStub: MockProxy<Authentication>;

    let sut: SignInController;

    beforeEach(() => {
        validationStub = mock<Validation>();
        authenticationStub = mock<Authentication>();

        sut = new SignInController(authenticationStub, validationStub);

        httpRequest = new HttpRequest().body({
            email: 'email@test.com',
            password: 'any_password',
        });
    });

    it('Should return 500 if Validation.validate throws an exception', async () => {
        validationStub.validate.mockImplementationOnce(() => {
            throw new Error('validation_error');
        });

        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.properties).toEqual(
            new HttpResponse().serverError(new Error('validation_error'))
                .properties,
        );
    });

    it('Should call Authentication.auth with correct values', async () => {
        validationStub.validate.mockReturnValueOnce(null);

        await sut.handle(httpRequest);

        expect(authenticationStub.auth).toHaveBeenCalledWith({
            email: 'email@test.com',
            password: 'any_password',
        });
    });

    it('Should return 401 if Authentication fails', async () => {
        validationStub.validate.mockReturnValueOnce(null);
        authenticationStub.auth.mockResolvedValueOnce(null);

        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.properties).toEqual(
            new HttpResponse().unathorized().properties,
        );
    });

    it('Should return 500 if Authentication throws an exception', async () => {
        validationStub.validate.mockReturnValueOnce(null);
        authenticationStub.auth.mockImplementationOnce(() => {
            throw new Error('authentication_error');
        });

        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.properties).toEqual(
            new HttpResponse().serverError(new Error('authentication_error'))
                .properties,
        );
    });

    it('Should return 200 valid credentials are provided', async () => {
        validationStub.validate.mockReturnValueOnce(null);
        authenticationStub.auth.mockResolvedValueOnce('any_token');

        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.properties).toEqual(
            new HttpResponse().ok({ token: 'any_token' }).properties,
        );
    });
});
