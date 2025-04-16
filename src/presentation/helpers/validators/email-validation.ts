import { InvalidParamError } from '../http/errors';
import { EmailValidator } from '../../controllers/protocols';
import { Validation } from './validation';

export class EmailValidation implements Validation {
    private readonly fieldName: string;
    private readonly emailValidator: EmailValidator;

    constructor(fieldName: string, emailValidator: EmailValidator) {
        this.fieldName = fieldName;
        this.emailValidator = emailValidator;
    }

    public validate(value: any): Error {
        if (!this.emailValidator.isValid(value[this.fieldName])) {
            return new InvalidParamError(this.fieldName);
        }
    }
}
