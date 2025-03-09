import { AccountRepository, Encrypter } from '../protocols';
import { AccountManager } from '../../domain/usecases/account';
import { AccountEntity } from '../../domain/entity';
import { AccountModel } from '../../domain/models/indext';

export class DbAddAccount implements AccountManager {
    private readonly encryper: Encrypter;
    private readonly accountRespository: AccountRepository;

    constructor(encrypter: Encrypter, accountRespository: AccountRepository) {
        this.encryper = encrypter;
        this.accountRespository = accountRespository;
    }

    public async create(
        accountData: AccountModel,
    ): Promise<AccountEntity | null> {
        const encryptedPassword = await this.encryper.encrypt(
            accountData.password,
        );

        Reflect.set(accountData, 'password', encryptedPassword);

        const account = await this.accountRespository.create(accountData);

        return account;
    }
}
