import { mock, MockProxy } from 'jest-mock-extended';

import { DbAuthentication } from './db-authentication';
import {
    AccountRepository,
    AccessTokenRepository,
} from '../../protocols/repositories';
import { HashComparer } from '../../protocols/encryption/hash-comparer';
import { Encrypter } from '../../protocols/encryption/encrypter';

describe('DbAuthentication', () => {
    const fakeEntity = {
        id: 'any_id',
        email: 'test@mail.com',
        name: 'Jon Doe',
        password: 'hashed_password',
        accessTokenId: 'b1234',
    };

    let accountRepositoryStub: MockProxy<AccountRepository>;

    let hashComparerStub: MockProxy<HashComparer>;

    let encrypterStub: MockProxy<Encrypter>;

    let accessTokenRepositoryStub: MockProxy<AccessTokenRepository>;

    let sut: DbAuthentication;

    beforeEach(() => {
        accountRepositoryStub = mock<AccountRepository>();

        accessTokenRepositoryStub = mock<AccessTokenRepository>();

        hashComparerStub = mock<HashComparer>();

        encrypterStub = mock<Encrypter>();

        sut = new DbAuthentication(
            accountRepositoryStub,
            accessTokenRepositoryStub,
            encrypterStub,
            hashComparerStub,
        );
    });

    it('should call LoadAccountRepository.byEmail with correct email', async () => {
        await sut.auth({ email: 'test@email.com', password: '123' });

        expect(accountRepositoryStub.findByEmail).toHaveBeenCalledWith(
            'test@email.com',
        );
    });

    it('should throw if LoadAccountRepository.byEmail throws', async () => {
        accountRepositoryStub.findByEmail.mockImplementationOnce(() => {
            throw new Error('db_error');
        });

        const promise = sut.auth({ email: 'test@email.com', password: '123' });

        expect(promise).rejects.toThrow();
    });

    it('should return null if LoadAccountRepository.byEmail returns null', async () => {
        accountRepositoryStub.findByEmail.mockResolvedValueOnce(null);

        const token = await sut.auth({
            email: 'test@email.com',
            password: '123',
        });

        expect(token).toBeNull();
    });

    it('should call HashComparer.compare with correct values', async () => {
        accountRepositoryStub.findByEmail.mockResolvedValueOnce(fakeEntity);

        await sut.auth({
            email: 'test@email.com',
            password: '123',
        });

        expect(hashComparerStub.compare).toHaveBeenCalledWith(
            '123',
            'hashed_password',
        );
    });

    it('should throw if HashComparer.compare throws', async () => {
        accountRepositoryStub.findByEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockImplementationOnce(() => {
            throw new Error('compare_error');
        });

        const promise = sut.auth({ email: 'test@email.com', password: '123' });

        expect(promise).rejects.toThrow();
    });

    it('should return null HashComparer.compare returns false', async () => {
        accountRepositoryStub.findByEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockResolvedValueOnce(false);

        const token = await sut.auth({
            email: 'test@email.com',
            password: '123',
        });

        expect(token).toBeNull();
    });

    it('should call Encrypter.generate with user id', async () => {
        accountRepositoryStub.findByEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockResolvedValueOnce(true);

        await sut.auth({
            email: 'test@email.com',
            password: '123',
        });

        expect(encrypterStub.encrypt).toHaveBeenCalledWith(fakeEntity.id);
    });

    it('should throw if Encrypter.generate throws', async () => {
        accountRepositoryStub.findByEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockResolvedValueOnce(true);

        encrypterStub.encrypt.mockImplementationOnce(() => {
            throw new Error('generation_error');
        });

        const promise = sut.auth({ email: 'test@email.com', password: '123' });

        expect(promise).rejects.toThrow();
    });

    it('should return a token if Encrypter.encrypt succeeds', async () => {
        accountRepositoryStub.findByEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockResolvedValueOnce(true);
        encrypterStub.encrypt.mockResolvedValueOnce('generated_token');

        const token = await sut.auth({
            email: 'test@email.com',
            password: '123',
        });

        expect(token).toBe('generated_token');
    });

    it('should call UpdateTokenRepository with correct values', async () => {
        accountRepositoryStub.findByEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockResolvedValueOnce(true);
        encrypterStub.encrypt.mockResolvedValueOnce('generated_token');

        const token = await sut.auth({
            email: 'test@email.com',
            password: '123',
        });

        expect(accessTokenRepositoryStub.update).toHaveBeenCalledWith(
            fakeEntity.id,
            token,
        );
    });

    it('should throw UpdateTokenRepository.update throws', async () => {
        accountRepositoryStub.findByEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockResolvedValueOnce(true);
        encrypterStub.encrypt.mockResolvedValueOnce('generated_token');

        accessTokenRepositoryStub.update.mockImplementationOnce(() => {
            throw new Error('db_error');
        });

        const promise = sut.auth({ email: 'test@email.com', password: '123' });

        expect(promise).rejects.toThrow();
    });
});
