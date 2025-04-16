import { AccountEntity } from '../../../../domain/entity';
import { AccountModel } from '../../../../domain/models/indext';

import { MongoUtils } from '../helpers/connection';
import { CreateAccountRepository } from '../../../../data/protocols/repositories';

export class MongoAccountRepository implements CreateAccountRepository {
    async create(accountData: AccountModel): Promise<AccountEntity> {
        const accountCollection = MongoUtils.getCollection('accounts');

        const insertOneResult = await accountCollection.insertOne(accountData);

        if (insertOneResult.acknowledged) {
            const data = await accountCollection.findOne({
                _id: insertOneResult.insertedId,
            });

            return MongoUtils.map(data);
        }
    }
}
