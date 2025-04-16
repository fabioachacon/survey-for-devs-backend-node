import { mock, MockProxy } from 'jest-mock-extended';

import { DbAddAccount } from './db-addAccount';

import { AccountModel } from '../../../domain/models/indext';
import { Encrypter } from '../../protocols/encryption/encrypter';
import { CreateAccountRepository } from '../../protocols/repositories';

describe('DbAddAccountUsecase', () => {
    const fakeAccount = {
        name: 'valid_name',
        email: 'test@email.com',
        password: 'password',
    };

    let sut: DbAddAccount;
    let encrypterStub: MockProxy<Encrypter>;
    let addAccountRepositoryStub: MockProxy<CreateAccountRepository>;

    beforeEach(() => {
        encrypterStub = mock<Encrypter>();
        addAccountRepositoryStub = mock<CreateAccountRepository>();

        sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
    });

    it('should call Encryper with correct password', async () => {
        await sut.create(fakeAccount);
        expect(encrypterStub.encrypt).toHaveBeenCalledWith('password');
    });

    it('should throw an error if Encrypter.encrypt throws', async () => {
        encrypterStub.encrypt.mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.create(fakeAccount);

        expect(promise).rejects.toThrow();
    });

    it('should call AddAccountRepository.create with correct values', async () => {
        await sut.create(fakeAccount);

        expect(addAccountRepositoryStub.create).toHaveBeenCalledWith(
            fakeAccount,
        );
    });

    it('should return an account on success', async () => {
        addAccountRepositoryStub.create.mockImplementationOnce(
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
});
