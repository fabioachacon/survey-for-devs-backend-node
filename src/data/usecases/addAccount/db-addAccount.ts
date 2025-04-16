import { AccountEntity } from '../../../domain/entity';
import { AccountModel } from '../../../domain/models/indext';
import { AccountManager } from '../../../domain/usecases/account';

import { Encrypter } from '../../protocols/encryption/encrypter';
import { CreateAccountRepository } from '../../protocols/repositories';

export class DbAddAccount implements AccountManager {
    private readonly encryper: Encrypter;
    private readonly createAccountRespository: CreateAccountRepository;

    constructor(
        encrypter: Encrypter,
        createAccountRespository: CreateAccountRepository,
    ) {
        this.encryper = encrypter;
        this.createAccountRespository = createAccountRespository;
    }

    public async create(
        accountData: AccountModel,
    ): Promise<AccountEntity | null> {
        const encryptedPassword = await this.encryper.encrypt(
            accountData.password,
        );

        Reflect.set(accountData, 'password', encryptedPassword);

        const account = await this.createAccountRespository.create(accountData);

        return account;
    }
}
