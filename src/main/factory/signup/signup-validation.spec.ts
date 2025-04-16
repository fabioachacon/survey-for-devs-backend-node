import { mock, MockProxy } from 'jest-mock-extended';
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';

import { RequiredFielValidation } from '../../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../../presentation/helpers/validators/validation';
import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validation';
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation';
import { EmailValidator } from '../../../presentation/controllers/protocols';
import { getSignUpValidations } from './signup-validation';

jest.mock('../../../presentation/helpers/validators/validation-composite');

class EmailValidatorStub implements EmailValidator {
    isValid(_email: string) {
        return true;
    }
}

describe('SignUpValidation Factory', () => {
    it('should call ValidationComposite with all validations', () => {
        getSignUpValidations();

        const validations: Validation[] = [];

        for (const field of [
            'name',
            'email',
            'password',
            'passwordConfirmation',
        ]) {
            validations.push(new RequiredFielValidation(field));
        }

        validations.push(
            new CompareFieldsValidation('password', 'passwordConfirmation'),
        );

        validations.push(
            new EmailValidation('email', new EmailValidatorStub()),
        );

        expect(ValidationComposite).toHaveBeenCalledWith([...validations]);
    });
});
