import { RequiredFielValidation } from '../../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';
import { getSurveysValidations } from './survey-validation-factory';

jest.mock('../../../presentation/helpers/validators/validation-composite');

describe('SignUpValidation Factory', () => {
    it('should call ValidationComposite with all validations', () => {
        getSurveysValidations();

        const validations: Validation[] = [];

        for (const field of ['question', 'answers']) {
            validations.push(new RequiredFielValidation(field));
        }

        expect(ValidationComposite).toHaveBeenCalledWith([...validations]);
    });
});
