import { MockProxy } from 'jest-mock-extended';
import { InvalidParamError } from './http/errors/InvalidParamError';
import { MissingParamError } from './http/errors/MissingParamError';
import { getFakeRequestData } from './tests/data';
import { EmailValidator } from './protocols/email-validator';
import { mock } from 'jest-mock-extended';
import { SignUpController } from './signup';
import { HttpRequest } from './http/messages';

let sut: SignUpController;
let emailValidatorStub: MockProxy<EmailValidator>;
let request: HttpRequest;

describe('SignUp Controller', () => {
    beforeEach(() => {
        request = getFakeRequestData();
        emailValidatorStub = mock<EmailValidator>();
        sut = new SignUpController(emailValidatorStub);
    });

    it('Should return 400 if no name is provided', async () => {
        Reflect.deleteProperty(request.getBody(), 'name');

        const response = await sut.handleRequest(request);
        expect(response.getStatusCode()).toBe(400);
        expect(response.getBody()).toEqual(new MissingParamError('name'));
    });

    it('Should return 400 if no email is provided', async () => {
        Reflect.deleteProperty(request.getBody(), 'email');

        const response = await sut.handleRequest(request);
        expect(response.getStatusCode()).toBe(400);
        expect(response.getBody()).toEqual(new MissingParamError('email'));
    });

    it('Should return 400 if no password is provided', async () => {
        Reflect.deleteProperty(request.getBody(), 'password');

        const response = await sut.handleRequest(request);
        expect(response.getStatusCode()).toBe(400);
        expect(response.getBody()).toEqual(new MissingParamError('password'));
    });

    it('Should return 400 if no passwordConfirmation is provided', async () => {
        Reflect.deleteProperty(request.getBody(), 'passwordConfirmation');

        const response = await sut.handleRequest(request);
        expect(response.getStatusCode()).toBe(400);
        expect(response.getBody()).toEqual(
            new MissingParamError('passwordConfirmation'),
        );
    });

    it('Should return 400 if an invalid email is provided', async () => {
        emailValidatorStub.isValid.mockReturnValueOnce(false);

        const response = await sut.handleRequest(request);
        expect(response.getStatusCode()).toBe(400);
        expect(response.getBody()).toEqual(new InvalidParamError('email'));
    });
});
