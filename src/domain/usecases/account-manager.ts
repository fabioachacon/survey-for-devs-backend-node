import { AccountEntity } from '../entity';
import { AccountModel } from '../models/indext';

export interface AccountManager {
    create(accountData: AccountModel): Promise<AccountEntity | null>;
}
