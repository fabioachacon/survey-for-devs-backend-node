import { Collection, Document } from 'mongodb';
import { MongoAccessTokenRepository } from './MongoAccessTokenRepository';

import env from '../../../../../main/config/env';
import { MongoUtils } from '../../helpers/mongo-utils';

describe('MongoAccessTokenRepository', () => {
    let accessTokenCollection: Collection<Document>;

    let sut: MongoAccessTokenRepository;

    beforeAll(async () => {
        await MongoUtils.connect(env.mongUrl);
    });

    beforeEach(async () => {
        accessTokenCollection = MongoUtils.getCollection('access_token');
        await accessTokenCollection.deleteMany({});
    });

    beforeEach(() => {
        sut = new MongoAccessTokenRepository();
    });

    afterEach(() => {
        accessTokenCollection.deleteMany({});
    });

    it('should be able to update accessToken', async () => {
        await accessTokenCollection.insertOne({
            account_id: 'any_id',
            token: 'any_token',
        });

        await sut.update({ account_id: 'any_id' } as any, 'test_token');

        const result = await sut.findBy({ account_id: 'any_id' });

        expect(result.account_id).toBe('any_id');
        expect(result.token).toBe('test_token');
    });
});
