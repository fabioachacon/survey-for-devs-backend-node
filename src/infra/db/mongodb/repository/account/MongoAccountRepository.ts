import { AccountEntity } from '../../../../../domain/entity';
import { AccountModel } from '../../../../../domain/models/indext';

import { MongoUtils } from '../../helpers/mongo-utils';
import {
    AccessTokenRepository,
    AccountRepository,
} from '../../../../../data/protocols/repositories';

export class MongoAccountRepository implements AccountRepository {
    private readonly accessTokenRepository: AccessTokenRepository;

    constructor(accessTokenRepository: AccessTokenRepository) {
        this.accessTokenRepository = accessTokenRepository;
    }

    public async create(accountData: AccountModel) {
        const insertOneResult = await this.collection.insertOne(accountData);

        if (insertOneResult.acknowledged) {
            const data = await this.collection.findOne({
                _id: insertOneResult.insertedId,
            });

            return MongoUtils.map<AccountEntity>(data);
        }
    }

    public async findById(id: string): Promise<AccountEntity | null> {
        const account = await this.collection.findOne({ _id: id as any });

        if (!account) return null;

        return MongoUtils.map<AccountEntity>(account);
    }

    public async findByEmail(email: string) {
        const account = await this.collection.findOne({ email: email });

        if (!account) return null;

        return MongoUtils.map<AccountEntity>(account);
    }

    public async findAccessTokenByAccountId(id: string) {
        const result = await this.accessTokenRepository.findBy({
            account_id: id,
        });

        return result.token;
    }

    public async updateAccessToken(id: string, token: string) {
        await this.accessTokenRepository.update({ account_id: id }, token);
    }

    private get collection() {
        return MongoUtils.getCollection('accounts');
    }
}
