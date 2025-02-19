import { mock, MockProxy } from 'jest-mock-extended';
import { AddAccountRepository, Encrypter } from '../protocols';
import { DbAddAccount } from './DbAddAccount';
import { fakeAccount } from './tests/fake';
import { AccountModel } from '../../domain/models/indext';

let sut: DbAddAccount;
let encrypterStub: MockProxy<Encrypter>;
let addAccountRepositoryStub: MockProxy<AddAccountRepository>;

describe('DbAddAccountUsecase', () => {
    beforeEach(() => {
        encrypterStub = mock<Encrypter>();
        addAccountRepositoryStub = mock<AddAccountRepository>();

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
