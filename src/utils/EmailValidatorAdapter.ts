import { EmailValidator } from '../presentation/controllers/protocols';
import validator from 'validator';

export class EmailValidatorAdapter implements EmailValidator {
    isValid(email: string): boolean {
        return validator.isEmail(email);
    }
}
