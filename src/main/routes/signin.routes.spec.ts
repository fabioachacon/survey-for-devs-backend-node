import request from 'supertest';
import app from '../config/app';
import { MongoUtils } from '../../infra/db/mongodb/helpers/mongo-utils';
import { Collection, Document } from 'mongodb';
import env from '../config/env';
import { hash } from 'bcrypt';

describe('POST /signin', () => {
    let collection: Collection<Document>;

    beforeAll(async () => {
        await MongoUtils.connect(env.mongUrl);
    });

    afterAll(async () => {
        await MongoUtils.disconnect();
    });

    beforeEach(async () => {
        collection = MongoUtils.getCollection('accounts');
        await collection.deleteMany({});
    });

    it('should return 200 on signin success', async () => {
        const password = await hash('123', 12);

        await collection.insertOne({
            name: 'Jon Doe',
            email: 'jon@email.com',
            password,
        });

        await request(app)
            .post('/api/signin')
            .send({
                email: 'jon@email.com',
                password: '123',
            })
            .expect(200);
    });

    it('should return 401 on unathorized', async () => {
        await request(app)
            .post('/api/signin')
            .send({
                email: 'jon@email.com',
                password: 'aaa',
            })
            .expect(401);
    });
});
