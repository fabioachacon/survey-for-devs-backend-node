import env from '../../../../../main/config/env';
import { Collection, Document } from 'mongodb';
import { MongoUtils } from '../../helpers/mongo-utils';

import { MongoErrorLogRepository } from './MongoErrorLogRepository';

describe('LogMongoRepository', () => {
    let errorCollection: Collection<Document>;

    beforeAll(async () => {
        await MongoUtils.connect(env.mongUrl);
    });

    afterAll(async () => {
        await MongoUtils.disconnect();
    });

    beforeEach(async () => {
        errorCollection = MongoUtils.getCollection('errors');
        await errorCollection.deleteMany({});
    });

    it('should insert an error log document on success', async () => {
        const sut = new MongoErrorLogRepository();

        await sut.log('any_error');

        const count = await errorCollection.countDocuments();

        expect(count).toBe(1);
    });
});
