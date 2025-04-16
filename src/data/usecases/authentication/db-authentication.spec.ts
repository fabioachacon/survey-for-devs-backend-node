import { mock, MockProxy } from 'jest-mock-extended';

import { DbAuthentication } from './db-authentication';
import {
    LoadAccountRespository,
    UpdateAccessTokenRepository,
} from '../../protocols/repositories';
import { HashComparer } from '../../protocols/encryption/hash-comparer';
import { TokenGenerator } from '../../protocols/encryption/token-generator';

describe('DbAuthentication', () => {
    const fakeEntity = {
        id: 'any_id',
        email: 'test@mail.com',
        name: 'Jon Doe',
        password: 'hashed_password',
    };

    let loadAccountRepositoryStub: MockProxy<LoadAccountRespository>;

    let hashComparerStub: MockProxy<HashComparer>;

    let tokenGeneratorStub: MockProxy<TokenGenerator>;

    let updateAccessTokenRepositoryStub: MockProxy<UpdateAccessTokenRepository>;

    let sut: DbAuthentication;

    beforeEach(() => {
        loadAccountRepositoryStub = mock<LoadAccountRespository>();

        hashComparerStub = mock<HashComparer>();

        tokenGeneratorStub = mock<TokenGenerator>();

        updateAccessTokenRepositoryStub = mock<UpdateAccessTokenRepository>();

        sut = new DbAuthentication(
            loadAccountRepositoryStub,
            hashComparerStub,
            tokenGeneratorStub,
            updateAccessTokenRepositoryStub,
        );
    });

    it('should call LoadAccountRepository.byEmail with correct email', async () => {
        await sut.auth({ email: 'test@email.com', password: '123' });

        expect(loadAccountRepositoryStub.byEmail).toHaveBeenCalledWith(
            'test@email.com',
        );
    });

    it('should throw if LoadAccountRepository.byEmail throws', async () => {
        loadAccountRepositoryStub.byEmail.mockImplementationOnce(() => {
            throw new Error('db_error');
        });

        const promise = sut.auth({ email: 'test@email.com', password: '123' });

        expect(promise).rejects.toThrow();
    });

    it('should return null if LoadAccountRepository.byEmail returns null', async () => {
        loadAccountRepositoryStub.byEmail.mockResolvedValueOnce(null);

        const token = await sut.auth({
            email: 'test@email.com',
            password: '123',
        });

        expect(token).toBeNull();
    });

    it('should call HashComparer.compare with correct values', async () => {
        loadAccountRepositoryStub.byEmail.mockResolvedValueOnce(fakeEntity);

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
        loadAccountRepositoryStub.byEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockImplementationOnce(() => {
            throw new Error('compare_error');
        });

        const promise = sut.auth({ email: 'test@email.com', password: '123' });

        expect(promise).rejects.toThrow();
    });

    it('should return null HashComparer.compare returns false', async () => {
        loadAccountRepositoryStub.byEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockResolvedValueOnce(false);

        const token = await sut.auth({
            email: 'test@email.com',
            password: '123',
        });

        expect(token).toBeNull();
    });

    it('should call TokenGenerator.generate with user id', async () => {
        loadAccountRepositoryStub.byEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockResolvedValueOnce(true);

        await sut.auth({
            email: 'test@email.com',
            password: '123',
        });

        expect(tokenGeneratorStub.generate).toHaveBeenCalledWith(fakeEntity.id);
    });

    it('should throw if TokenGenerator.generate throws', async () => {
        loadAccountRepositoryStub.byEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockResolvedValueOnce(true);

        tokenGeneratorStub.generate.mockImplementationOnce(() => {
            throw new Error('generation_error');
        });

        const promise = sut.auth({ email: 'test@email.com', password: '123' });

        expect(promise).rejects.toThrow();
    });

    it('should return a token if TokenGenerator.generate succeeds', async () => {
        loadAccountRepositoryStub.byEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockResolvedValueOnce(true);
        tokenGeneratorStub.generate.mockResolvedValueOnce('generated_token');

        const token = await sut.auth({
            email: 'test@email.com',
            password: '123',
        });

        expect(token).toBe('generated_token');
    });

    it('should call UpdateTokenRepository with correct values', async () => {
        loadAccountRepositoryStub.byEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockResolvedValueOnce(true);
        tokenGeneratorStub.generate.mockResolvedValueOnce('generated_token');

        const token = await sut.auth({
            email: 'test@email.com',
            password: '123',
        });

        expect(updateAccessTokenRepositoryStub.update).toHaveBeenCalledWith(
            fakeEntity.id,
            token,
        );
    });

    it('should throw UpdateTokenRepository.update throws', async () => {
        loadAccountRepositoryStub.byEmail.mockResolvedValueOnce(fakeEntity);
        hashComparerStub.compare.mockResolvedValueOnce(true);
        tokenGeneratorStub.generate.mockResolvedValueOnce('generated_token');

        updateAccessTokenRepositoryStub.update.mockImplementationOnce(() => {
            throw new Error('db_error');
        });

        const promise = sut.auth({ email: 'test@email.com', password: '123' });

        expect(promise).rejects.toThrow();
    });
});
