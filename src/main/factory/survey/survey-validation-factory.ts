import { RequiredFielValidation } from '../../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';

export const getSurveysValidations = (): ValidationComposite => {
    const validations: Validation[] = [];

    for (const field of ['question', 'answers']) {
        validations.push(new RequiredFielValidation(field));
    }

    return new ValidationComposite([...validations]);
};
