import { InvalidParamError } from '../http/errors';
import { Validation } from './validation';

export class CompareFieldsValidation implements Validation {
    private readonly targetField: string;
    private readonly toCompare: string;

    constructor(targetField: string, toCompare: string) {
        this.targetField = targetField;
        this.toCompare = toCompare;
    }

    public validate(value: any): Error {
        if (value[this.targetField] !== value[this.toCompare]) {
            return new InvalidParamError(this.toCompare);
        }
    }
}
