import bcrypt from 'bcrypt';
import { BcryptAdapter } from './BcryptAdapter';

jest.mock('bcrypt', () => ({
    hash: async () => {
        return 'hashed_value';
    },
}));

const SALT = 12;
let sut: BcryptAdapter;

describe('BCryptAdapter', () => {
    beforeEach(() => {
        sut = new BcryptAdapter(SALT);
    });

    it('should call bcrypt with correct value', async () => {
        const hashSpy = jest.spyOn(bcrypt, 'hash');

        await sut.encrypt('dehashed_value');

        expect(hashSpy).toHaveBeenCalledWith('dehashed_value', SALT);
    });

    it('should return a hashed string on success', async () => {
        const hashed = await sut.encrypt('dehashed');

        expect(hashed).toBe('hashed_value');
    });
});
