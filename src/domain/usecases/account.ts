import { AccountEntity, AccountModel } from '../models/indext';

export interface Account {
    create(accountData: AccountModel): AccountEntity;
}
