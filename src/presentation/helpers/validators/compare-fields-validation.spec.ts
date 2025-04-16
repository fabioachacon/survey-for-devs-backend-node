import { InvalidParamError } from '../http/errors';
import { CompareFieldsValidation } from './compare-fields-validation';

describe('CompareFieldsValidation', () => {
    let sut: CompareFieldsValidation;

    it('should return InvalidParamError if validation fails', () => {
        sut = new CompareFieldsValidation('field', 'toCompare');

        const error = sut.validate({ field: '123', toCompare: '1' });

        expect(error).toEqual(new InvalidParamError('toCompare'));
    });

    it('should not return any value if validation succeeds', () => {
        sut = new CompareFieldsValidation('field', 'toCompare');

        const error = sut.validate({ field: '123', toCompare: '123' });

        expect(error).toBe(undefined);
    });
});
