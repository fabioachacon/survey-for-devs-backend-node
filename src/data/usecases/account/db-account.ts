import { AccountEntity } from '../../../domain/entity';
import { AccountModel } from '../../../domain/models/indext';
import { AccountManager } from '../../../domain/usecases/account-manager';

import { Hasher } from '../../protocols/encryption/hasher';
import { AccountRepository } from '../../protocols/repositories';

export class DbAccount implements AccountManager {
    private readonly accountRespository: AccountRepository;
    private readonly hasher: Hasher;

    constructor(accountRespository: AccountRepository, hasher: Hasher) {
        this.hasher = hasher;
        this.accountRespository = accountRespository;
    }

    public async create(
        accountData: AccountModel,
    ): Promise<AccountEntity | null> {
        const findAccount = await this.accountRespository.findByEmail(
            accountData.email,
        );

        if (findAccount) return null;

        const encryptedPassword = await this.hasher.hash(accountData.password);

        Reflect.set(accountData, 'password', encryptedPassword);

        const account = await this.accountRespository.create(accountData);

        return account;
    }
}
