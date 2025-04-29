import request from 'supertest';
import { Collection, Document } from 'mongodb';

import env from '../config/env';

import { MongoUtils } from '../../infra/db/mongodb/helpers/mongo-utils';
import app from '../config/app';

describe('POST /surveys', () => {
    let collection: Collection<Document>;

    beforeAll(async () => {
        await MongoUtils.connect(env.mongUrl);
    });

    afterAll(async () => {
        await MongoUtils.disconnect();
    });

    beforeEach(async () => {
        collection = MongoUtils.getCollection('survey');
        await collection.deleteMany({});
    });

    it('should return 200 on success', async () => {
        await request(app)
            .post('/api/surveys')
            .send({
                question: 'any_question',
                answers: [
                    {
                        image: 'any_image.png',
                        anwser: 'answer1',
                    },
                ],
            })
            .expect(204);
    });
});
