import { AccountEntity } from '../../../domain/entity';
import { AccountModel } from '../../../domain/models/indext';

export interface CreateAccountRepository {
    create(accountData: AccountModel): Promise<AccountEntity>;
}

export interface LoadAccountRespository {
    byEmail(email: string): Promise<AccountEntity>;
}

export interface LogErrorRepository {
    log(stack: string): Promise<void>;
}

export interface UpdateAccessTokenRepository {
    update(id: string, token: string): Promise<void>;
}
