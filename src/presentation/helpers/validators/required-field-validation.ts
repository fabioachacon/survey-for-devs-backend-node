import { MissingParamError } from '../http/errors';
import { Validation } from './validation';

export class RequiredFielValidation implements Validation {
    private readonly fieldName: string;

    constructor(fieldName: string) {
        this.fieldName = fieldName;
    }

    public validate(value: any): Error {
        if (!Reflect.has(value, this.fieldName) || !value[this.fieldName]) {
            return new MissingParamError(this.fieldName);
        }
    }
}
