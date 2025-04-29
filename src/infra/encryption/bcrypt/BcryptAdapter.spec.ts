import bcrypt from 'bcrypt';
import { BcryptAdapter } from './BcryptAdapter';

jest.mock('bcrypt', () => ({
    hash: async () => {
        return 'hashed_value';
    },
    compare: async () => {
        return true;
    },
}));

describe('BCryptAdapter', () => {
    const SALT = 12;

    let sut: BcryptAdapter;

    beforeEach(() => {
        sut = new BcryptAdapter(SALT);
    });

    it('should call bcrypt.hash with correct value', async () => {
        const hashSpy = jest.spyOn(bcrypt, 'hash');
        await sut.hash('dehashed_value');
        expect(hashSpy).toHaveBeenCalledWith('dehashed_value', SALT);
    });

    it('should return a valid hashed string on success', async () => {
        const hashed = await sut.hash('dehashed');
        expect(hashed).toBe('hashed_value');
    });

    it('should throw if bcrypt.hash throws', async () => {
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
            throw new Error();
        });

        const promise = sut.hash('any_value');

        expect(promise).rejects.toThrow();
    });

    it('should call bcrypt.compare with correct value', async () => {
        const compareSpy = jest.spyOn(bcrypt, 'compare');

        await sut.compare('dehashed_value', 'hashed_value');

        expect(compareSpy).toHaveBeenCalledWith(
            'dehashed_value',
            'hashed_value',
        );
    });

    it('should return true when compare succeeds', async () => {
        const compareResult = await sut.compare(
            'dehashed_value',
            'hashed_value',
        );

        expect(compareResult).toBe(true);
    });

    it('should return false when compare succeeds', async () => {
        jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => {
            return false;
        });

        const compareResult = await sut.compare(
            'dehashed_value',
            'hashed_value',
        );

        expect(compareResult).toBe(false);
    });

    it('should throw if bcrypt.compare throws', async () => {
        jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => {
            throw new Error();
        });

        const promise = sut.compare('dehashed_value', 'hashed_value');

        expect(promise).rejects.toThrow();
    });
});
