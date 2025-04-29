import { AccessTokenRepository } from '../../../../../data/protocols/repositories';
import { AccessTokenEntity } from '../../../../../domain/entity';
import { MongoUtils } from '../../helpers/mongo-utils';

export class MongoAccessTokenRepository implements AccessTokenRepository {
    public async update<T>(filter: Partial<T>, token: string) {
        await this.collection.updateOne(
            { ...filter },
            {
                $set: {
                    token: token,
                },
            },
        );
    }

    public async findBy<T>(filter: Partial<T>) {
        const result = await this.collection.findOne({ ...filter });

        return MongoUtils.map<AccessTokenEntity>(result);
    }

    private get collection() {
        return MongoUtils.getCollection('access_token');
    }
}
