import { mock, MockProxy } from 'jest-mock-extended';
import { EmailValidation } from './email-validation';
import { EmailValidator } from '../../controllers/protocols';

describe('EmailValidation', () => {
    let sut: EmailValidation;

    let emailValidatorStub: MockProxy<EmailValidator>;

    beforeEach(() => {
        emailValidatorStub = mock<EmailValidator>();

        sut = new EmailValidation('email', emailValidatorStub);
    });

    it('Should call EmailValidator.isValid with provided email', async () => {
        sut.validate({ email: 'test@test.com' });

        expect(emailValidatorStub.isValid).toHaveBeenCalledWith(
            'test@test.com',
        );
    });

    it('Should return an error EmailValidator returns an error', async () => {
        emailValidatorStub.isValid.mockReturnValueOnce(false);

        const result = sut.validate({});

        expect(result).toBeInstanceOf(Error);
    });
});
