import { inject, injectable } from 'tsyringe';
import { AddAccountRepository, Encrypter } from '../protocols';
import { AccountManager } from '../../domain/usecases/account';
import { AccountEntity } from '../../domain/entity';
import { AccountModel } from '../../domain/models/indext';

@injectable()
export class DbAddAccount implements AccountManager {
    private readonly encryper: Encrypter;
    private readonly addAccountRespository: AddAccountRepository;

    constructor(
        @inject('Encrypter') encrypter: Encrypter,
        @inject('AddAccountRepository')
        addAccountRespository: AddAccountRepository,
    ) {
        this.encryper = encrypter;
        this.addAccountRespository = addAccountRespository;
    }

    public async create(
        accountData: AccountModel,
    ): Promise<AccountEntity | null> {
        const encryptedPassword = await this.encryper.encrypt(
            accountData.password,
        );

        Reflect.set(accountData, 'password', encryptedPassword);

        const account = await this.addAccountRespository.create(accountData);

        return account;
    }
}
