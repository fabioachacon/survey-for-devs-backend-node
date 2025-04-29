import { mock, MockProxy } from 'jest-mock-extended';

import { SignUpController } from './signup-controller';
import { HttpRequest, HttpResponse } from '../../helpers/http/messages';
import { StatusCodes } from '../../helpers/http/StatusCode';
import { ServerError } from '../../helpers/http/errors';
import { Validation } from '../../helpers/validators/validation';
import { Authentication } from '../../../domain/usecases/authentication';
import { AccountManager } from '../../../domain/usecases/account-manager';

describe('SignUp Controller', () => {
    let httpRequest: HttpRequest;

    let accountStub: MockProxy<AccountManager>;

    let authenticationStub: MockProxy<Authentication>;

    let validationStub: MockProxy<Validation>;

    let sut: SignUpController;

    beforeEach(() => {
        httpRequest = new HttpRequest().body({
            name: 'any_name',
            email: 'email@test.com',
            password: 'any_password',
            passwordConfirmation: 'any_password',
        });

        accountStub = mock<AccountManager>();

        authenticationStub = mock<Authentication>();

        validationStub = mock<Validation>();

        sut = new SignUpController(
            accountStub,
            authenticationStub,
            validationStub,
        );
    });

    it('Should call Authentication.auth with correct values', async () => {
        validationStub.validate.mockReturnValueOnce(null);

        accountStub.create.mockResolvedValueOnce({
            id: 'any_id',
            name: 'jon',
            email: 'email@test.com',
            password: 'any_password',
        });

        await sut.handle(httpRequest);

        expect(authenticationStub.auth).toHaveBeenCalledWith({
            email: 'email@test.com',
            password: 'any_password',
        });
    });

    it('Should return 500 if Authentication throws an exception', async () => {
        validationStub.validate.mockReturnValueOnce(null);

        accountStub.create.mockResolvedValueOnce({
            id: 'any_id',
            name: 'jon',
            email: 'email@test.com',
            password: 'any_password',
        });

        authenticationStub.auth.mockImplementationOnce(() => {
            throw new Error('authentication_error');
        });

        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.properties).toEqual(
            new HttpResponse().serverError(new Error('authentication_error'))
                .properties,
        );
    });

    it('Should return 500 it Validation.validate returns an error', async () => {
        validationStub.validate.mockImplementationOnce(() => {
            throw new Error('');
        });

        const response = await sut.handle(httpRequest);

        expect(response.getStatusCode()).toBe(StatusCodes.InternalServerError);
        expect(response.getBody()).toEqual(new ServerError());
    });

    it('Should call AccountMananger.create with correct values', async () => {
        validationStub.validate.mockReturnValueOnce(null);

        await sut.handle(httpRequest);

        const { name, email, password } = httpRequest.getBody();

        expect(accountStub.create).toHaveBeenCalledWith({
            name: name,
            email: email,
            password: password,
        });
    });

    it('Should return 200 if valid data is provided', async () => {
        validationStub.validate.mockReturnValueOnce(null);

        const { name, email, password } = httpRequest.getBody();

        accountStub.create.mockResolvedValueOnce({
            id: 'uuid',
            name: name,
            email: email,
            password: password,
        });

        const response = await sut.handle(httpRequest);

        expect(response.getStatusCode()).toBe(200);
        expect(response.getBody()).toEqual({
            name: name,
            email: email,
        });
    });

    it('should call Validation.validate with correct value', async () => {
        await sut.handle(httpRequest);

        expect(validationStub.validate).toHaveBeenCalledWith(
            httpRequest.getBody(),
        );
    });

    it('should return 400 if Validation.validate returns an error', async () => {
        validationStub.validate.mockReturnValueOnce(
            new Error('validation_error'),
        );

        const response = await sut.handle(httpRequest);

        expect(response.properties).toEqual(
            new HttpResponse().badRequest().body(new Error('validation_error'))
                .properties,
        );
    });
});
