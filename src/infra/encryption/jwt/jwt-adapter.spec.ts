import jwt from 'jsonwebtoken';
import { JwtAdapter } from './jwt-adapter';

jest.mock('jsonwebtoken', () => ({
    sign: () => {
        return 'any_token';
    },
}));

describe('JwtAdapter', () => {
    let sut: JwtAdapter;

    beforeEach(() => {
        sut = new JwtAdapter('secret_key');
    });

    it('Should call sign with correct values', async () => {
        const signSpy = jest.spyOn(jwt, 'sign');

        await sut.encrypt('any_id');

        expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret_key');
    });

    it('Should return a token on sign success', async () => {
        const token = await sut.encrypt('any_id');

        expect(token).toBe('any_token');
    });

    it('Should throw if sign throws', async () => {
        jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
            throw new Error('jwt_error');
        });

        const promise = sut.encrypt('any_id');

        expect(promise).rejects.toThrow();
    });
});
