import { EmailValidatorAdapter } from './EmailValidatorAdapter';
import validator from 'validator';

let sut: EmailValidatorAdapter;

describe('EmailValidatorAdapter', () => {
    beforeEach(() => {
        sut = new EmailValidatorAdapter();
    });

    it('should return false if validator returns false', () => {
        jest.spyOn(sut, 'isValid').mockReturnValueOnce(false);

        const result = sut.isValid('test@email.com');

        expect(result).toBe(false);
    });

    it('should return true if validator returns true', () => {
        jest.spyOn(sut, 'isValid').mockReturnValueOnce(true);

        const result = sut.isValid('test@email.com');

        expect(result).toBe(true);
    });

    it('should return true if a valid email is provided', () => {
        const isEmail = jest.spyOn(validator, 'isEmail');

        sut.isValid('test@email.com');

        expect(isEmail).toHaveBeenCalledWith('test@email.com');
        expect(isEmail).toHaveReturnedWith(true);
    });

    it('should return false if a invalid email is provided', () => {
        const isEmail = jest.spyOn(validator, 'isEmail');

        sut.isValid('testemail.com');

        expect(isEmail).toHaveReturnedWith(false);
    });
});
