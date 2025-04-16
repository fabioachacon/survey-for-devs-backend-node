import { Validation } from './validation';

export class ValidationComposite implements Validation {
    private readonly validators: Validation[];

    constructor(validators: Validation[]) {
        this.validators = validators;
    }

    public validate(value: any): Error {
        for (const validator of this.validators) {
            const error = validator.validate(value);
            if (error) return error;
        }
    }
}
