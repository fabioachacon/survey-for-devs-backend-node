import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validation';
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation';
import { RequiredFielValidation } from '../../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';
import { EmailValidatorAdapter } from '../../adapers/validators/EmailValidatorAdapter';

export const getSignUpValidations = (): ValidationComposite => {
    const validations: Validation[] = [];

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new RequiredFielValidation(field));
    }

    validations.push(
        new CompareFieldsValidation('password', 'passwordConfirmation'),
    );

    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

    return new ValidationComposite([...validations]);
};
