import { mock, MockProxy } from 'jest-mock-extended';

import { DbAccount } from './db-account';

import { AccountModel } from '../../../domain/models/indext';
import { Hasher } from '../../protocols/encryption/hasher';
import { AccountRepository } from '../../protocols/repositories';

describe('DbAddAccountUsecase', () => {
    const fakeAccount = {
        name: 'valid_name',
        email: 'test@email.com',
        password: 'password',
    };

    let accountRepositoryStub: MockProxy<AccountRepository>;

    let hasherStub: MockProxy<Hasher>;

    let sut: DbAccount;

    beforeEach(() => {
        accountRepositoryStub = mock<AccountRepository>();

        hasherStub = mock<Hasher>();

        sut = new DbAccount(accountRepositoryStub, hasherStub);
    });

    it('should call Hasher with correct password', async () => {
        await sut.create(fakeAccount);
        expect(hasherStub.hash).toHaveBeenCalledWith('password');
    });

    it('should throw an error if Hasher.hash throws', async () => {
        hasherStub.hash.mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.create(fakeAccount);

        expect(promise).rejects.toThrow();
    });

    it('should call AddAccountRepository.create with correct values', async () => {
        await sut.create(fakeAccount);

        expect(accountRepositoryStub.create).toHaveBeenCalledWith(fakeAccount);
    });

    it('should return an account on success', async () => {
        accountRepositoryStub.create.mockImplementationOnce(
            async (accont: AccountModel) => {
                return {
                    id: 'valid_id',
                    ...accont,
                    password: 'hashed',
                };
            },
        );

        const account = await sut.create(fakeAccount);

        expect(account).toEqual({
            id: 'valid_id',
            ...fakeAccount,
            password: 'hashed',
        });
    });

    it('should prevent the creation of an account with an already used email address', async () => {
        accountRepositoryStub.findByEmail.mockResolvedValueOnce({
            id: 'any_id',
            ...fakeAccount,
        });

        const account = await sut.create(fakeAccount);

        expect(account).toBeNull();
    });
});
