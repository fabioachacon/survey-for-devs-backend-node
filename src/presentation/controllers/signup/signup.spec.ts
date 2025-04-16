import { MockProxy } from 'jest-mock-extended';

import { getFakeRequestData } from '../tests/data';
import { EmailValidator } from '../protocols/email-validator';
import { AccountManager } from '../../../domain/usecases/account';
import { mock } from 'jest-mock-extended';
import { SignUpController } from './signup';
import { HttpRequest, HttpResponse } from '../../helpers/http/messages';
import { StatusCodes } from '../../helpers/http/StatusCode';
import {
    MissingParamError,
    InvalidParamError,
    ServerError,
} from '../../helpers/http/errors';
import { Validation } from '../../helpers/validators/validation';

describe('SignUp Controller', () => {
    let sut: SignUpController;
    let request: HttpRequest;
    let accountStub: MockProxy<AccountManager>;
    let validationStub: MockProxy<Validation>;

    beforeEach(() => {
        request = getFakeRequestData();

        accountStub = mock<AccountManager>();
        validationStub = mock<Validation>();

        sut = new SignUpController(accountStub, validationStub);
    });

    it('Should return 500 it Validation.validate returns an error', async () => {
        validationStub.validate.mockImplementationOnce(() => {
            throw new Error('');
        });

        const response = await sut.handle(request);

        expect(response.getStatusCode()).toBe(StatusCodes.InternalServerError);
        expect(response.getBody()).toEqual(new ServerError());
    });

    it('Should call AccountMananger.create with correct values', async () => {
        validationStub.validate.mockReturnValueOnce(null);

        await sut.handle(request);

        const { name, email, password } = request.getBody();

        expect(accountStub.create).toHaveBeenCalledWith({
            name: name,
            email: email,
            password: password,
        });
    });

    it('Should return 200 if valid data is provided', async () => {
        validationStub.validate.mockReturnValueOnce(null);

        const { name, email, password } = request.getBody();

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

    it('should call Validation.validate with correct value', async () => {
        await sut.handle(request);

        expect(validationStub.validate).toHaveBeenCalledWith(request.getBody());
    });

    it('should return 400 if Validation.validate returns an error', async () => {
        validationStub.validate.mockReturnValueOnce(
            new Error('validation_error'),
        );

        const response = await sut.handle(request);

        expect(response.properties).toEqual(
            new HttpResponse().badRequest().body(new Error('validation_error'))
                .properties,
        );
    });
});
