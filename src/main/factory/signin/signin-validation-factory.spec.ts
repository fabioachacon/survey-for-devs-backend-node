import { mock, MockProxy } from 'jest-mock-extended';
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';

import { RequiredFielValidation } from '../../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../../presentation/helpers/validators/validation';
import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validation';
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation';
import { EmailValidator } from '../../../presentation/controllers/protocols';
import { getSignInValidations } from './signin-validation-factory';

jest.mock('../../../presentation/helpers/validators/validation-composite');

class EmailValidatorStub implements EmailValidator {
    isValid(_email: string) {
        return true;
    }
}

describe('SignUpValidation Factory', () => {
    it('should call ValidationComposite with all validations', () => {
        getSignInValidations();

        const validations: Validation[] = [];

        for (const field of ['email', 'password']) {
            validations.push(new RequiredFielValidation(field));
        }

        validations.push(
            new EmailValidation('email', new EmailValidatorStub()),
        );

        expect(ValidationComposite).toHaveBeenCalledWith([...validations]);
    });
});
