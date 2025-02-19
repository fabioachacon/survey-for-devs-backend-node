import { MockProxy } from 'jest-mock-extended';

import { getFakeRequestData } from '../tests/data';
import { EmailValidator } from '../protocols/email-validator';
import { AccountManager } from '../../../domain/usecases/account';
import { mock } from 'jest-mock-extended';
import { SignUpController } from './signup';
import { HttpRequest } from '../http/messages';
import { StatusCodes } from '../http/StatusCode';
import {
    MissingParamError,
    InvalidParamError,
    ServerError,
} from '../http/errors';

let sut: SignUpController;
let accountStub: MockProxy<AccountManager>;
let emailValidatorStub: MockProxy<EmailValidator>;
let request: HttpRequest;

describe('SignUp Controller', () => {
    beforeEach(() => {
        request = getFakeRequestData();

        accountStub = mock<AccountManager>();
        emailValidatorStub = mock<EmailValidator>();
        sut = new SignUpController(emailValidatorStub, accountStub);
    });

    it('Should return 400 if no name is provided', async () => {
        Reflect.deleteProperty(request.getBody(), 'name');

        const response = await sut.handle(request);
        expect(response.getStatusCode()).toBe(StatusCodes.BAD_REQUEST);
        expect(response.getBody()).toEqual(new MissingParamError('name'));
    });

    it('Should return 400 if no email is provided', async () => {
        Reflect.deleteProperty(request.getBody(), 'email');

        const response = await sut.handle(request);
        expect(response.getStatusCode()).toBe(StatusCodes.BAD_REQUEST);
        expect(response.getBody()).toEqual(new MissingParamError('email'));
    });

    it('Should return 400 if no password is provided', async () => {
        Reflect.deleteProperty(request.getBody(), 'password');

        const response = await sut.handle(request);
        expect(response.getStatusCode()).toBe(StatusCodes.BAD_REQUEST);
        expect(response.getBody()).toEqual(new MissingParamError('password'));
    });

    it('Should return 400 if no passwordConfirmation is provided', async () => {
        Reflect.deleteProperty(request.getBody(), 'passwordConfirmation');

        const response = await sut.handle(request);
        expect(response.getStatusCode()).toBe(StatusCodes.BAD_REQUEST);
        expect(response.getBody()).toEqual(
            new MissingParamError('passwordConfirmation'),
        );
    });

    it('Should return 400 if an invalid email is provided', async () => {
        emailValidatorStub.isValid.mockReturnValueOnce(false);

        const response = await sut.handle(request);
        expect(response.getStatusCode()).toBe(StatusCodes.BAD_REQUEST);
        expect(response.getBody()).toEqual(new InvalidParamError('email'));
    });

    it('Should call EmailValidator.isValid with provided email', async () => {
        await sut.handle(request);
        expect(emailValidatorStub.isValid).toHaveBeenCalledWith(
            request.getBody().email,
        );
    });

    it('Should return 500 if EmailValidator throws an exception', async () => {
        emailValidatorStub.isValid.mockImplementationOnce(() => {
            throw new Error('');
        });

        const response = await sut.handle(request);
        expect(response.getStatusCode()).toBe(
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
        expect(response.getBody()).toEqual(new ServerError());
    });

    it('Should return 400 if password confirmation fails', async () => {
        Reflect.set(
            request.getBody(),
            'passwordConfirmation',
            'differentPassword',
        );

        const response = await sut.handle(request);
        expect(response.getStatusCode()).toBe(StatusCodes.BAD_REQUEST);
        expect(response.getBody()).toEqual(
            new InvalidParamError('passwordConfirmation'),
        );
    });

    it('Should call AccountMananger.create with correct values', async () => {
        emailValidatorStub.isValid.mockImplementationOnce((email: string) => {
            throw new Error('');
        });

        const response = await sut.handle(request);
        expect(response.getStatusCode()).toBe(
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
        expect(response.getBody()).toEqual(new ServerError());
    });

    it('Should call AccountMananger.create with correct values', async () => {
        emailValidatorStub.isValid.mockReturnValueOnce(true);

        await sut.handle(request);

        const { name, email, password } = request.getBody();
        expect(accountStub.create).toHaveBeenCalledWith({
            name: name,
            email: email,
            password: password,
        });
    });

    it('Should return 200 if valid data is provided', async () => {
        const { name, email, password } = request.getBody();

        emailValidatorStub.isValid.mockReturnValueOnce(true);
        accountStub.create.mockResolvedValueOnce({
            id: 'uuid',
            name: name,
            email: email,
            password: password,
        });

        const response = await sut.handle(request);

        expect(response.getStatusCode()).toBe(200);
        expect(response.getBody()).toEqual({
            id: 'uuid',
            name: name,
            email: email,
            password: password,
        });
    });
});
