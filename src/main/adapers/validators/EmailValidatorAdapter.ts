import validator from 'validator';
import { EmailValidator } from '../../../presentation/controllers/protocols';

export class EmailValidatorAdapter implements EmailValidator {
    isValid(email: string): boolean {
        return validator.isEmail(email);
    }
}
