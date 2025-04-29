import { AccessTokenEntity, AccountEntity } from '../../../domain/entity';
import { SurveyEntity } from '../../../domain/entity/SurveyEntity';
import { AccountModel } from '../../../domain/models/indext';
import { SurveyModel } from '../../../domain/models/SurveyModel';

export interface AccountRepository {
    create(accountData: AccountModel): Promise<AccountEntity | null>;
    findById(id: string): Promise<AccountEntity | null>;
    findByEmail(email: string): Promise<AccountEntity | null>;
    updateAccessToken(id: string, token: string): Promise<void>;
    findAccessTokenByAccountId(id: string): Promise<string>;
}

export interface AccessTokenRepository {
    update<T>(filter: Partial<T>, token: string): Promise<void>;
    findBy<T>(filter: Partial<T>): Promise<AccessTokenEntity | null>;
}

export interface LogErrorRepository {
    log(stack: string): Promise<void>;
}

export interface SurveyRepository {
    create(data: SurveyModel): Promise<SurveyEntity | null>;
}
