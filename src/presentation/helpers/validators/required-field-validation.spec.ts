import { MissingParamError } from '../http/errors';
import { RequiredFielValidation } from './required-field-validation';

describe('RequiredFieldValidation', () => {
    let sut: RequiredFielValidation;

    it('should return MissingParamError if validation fails', () => {
        sut = new RequiredFielValidation('field');

        const error = sut.validate({ name: 'any_name' });

        expect(error).toEqual(new MissingParamError('field'));
    });

    it('should not return any value if validation succeeds', () => {
        sut = new RequiredFielValidation('name');

        const error = sut.validate({ name: 'any_name' });

        expect(error).toBe(undefined);
    });
});
