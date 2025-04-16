import { mock, MockProxy } from 'jest-mock-extended';
import { Validation } from './validation';
import { ValidationComposite } from './validation-composite';
import { InvalidParamError, MissingParamError } from '../http/errors';

describe('ValidationComposite', () => {
    let validationStub: MockProxy<Validation>;

    let sut: ValidationComposite;

    beforeEach(() => {
        validationStub = mock<Validation>();
    });

    it('should return an error if any validation fails', () => {
        validationStub.validate.mockReturnValueOnce(
            new MissingParamError('field'),
        );

        sut = new ValidationComposite([validationStub]);

        const error = sut.validate({ field: 'any_value' });

        expect(error).toEqual(new MissingParamError('field'));
    });

    it('should return the first error if more than one validation is passed', () => {
        validationStub.validate.mockReturnValueOnce(
            new MissingParamError('field'),
        );

        const validationStubNoError = mock<Validation>();
        validationStubNoError.validate.mockReturnValueOnce(
            new InvalidParamError('field'),
        );

        sut = new ValidationComposite([validationStub, validationStubNoError]);

        const error = sut.validate({ field: 'any_value' });

        expect(error).toEqual(new MissingParamError('field'));
    });

    it('should not return if validation succeeds', () => {
        validationStub.validate.mockReturnValueOnce(null);

        sut = new ValidationComposite([validationStub]);

        const error = sut.validate({ field: 'any_value' });

        expect(error).toBe(undefined);
    });
});
