import { AccountRepository } from '../../../../data/protocols';
import { AccountEntity } from '../../../../domain/entity';
import { AccountModel } from '../../../../domain/models/indext';
import { MongoUtils } from '../helpers/connection';

export class MongoAccountRepository implements AccountRepository {
    async create(accountData: AccountModel): Promise<AccountEntity> {
        const accountCollection = MongoUtils.getCollection('accounts');
        const result = await accountCollection.insertOne(accountData);
        return MongoUtils.map(result);
    }
}
