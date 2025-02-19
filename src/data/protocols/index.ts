import { AccountEntity } from '../../domain/entity';
import { AccountModel } from '../../domain/models/indext';

export interface Encrypter {
    encrypt(value: string): Promise<string>;
}

export interface AddAccountRepository {
    create(accountData: AccountModel): Promise<AccountEntity>;
}
