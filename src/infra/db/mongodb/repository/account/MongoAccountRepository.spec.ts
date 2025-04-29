import { Collection, Document } from 'mongodb';
import env from '../../../../../main/config/env';

import { MongoAccountRepository } from './MongoAccountRepository';
import { MongoUtils } from '../../helpers/mongo-utils';
import { AccessTokenRepository } from '../../../../../data/protocols/repositories';
import { MongoAccessTokenRepository } from '../token/MongoAccessTokenRepository';

describe('MongoAccountRepository', () => {
    let accountCollection: Collection<Document>;

    let accessTokenCollection: Collection<Document>;

    let accessTokenRepository: AccessTokenRepository;

    let sut: MongoAccountRepository;

    beforeAll(async () => {
        await MongoUtils.connect(env.mongUrl);
    });

    beforeEach(async () => {
        accountCollection = MongoUtils.getCollection('accounts');
        accessTokenCollection = MongoUtils.getCollection('access_token');

        await accountCollection.deleteMany({});
        await accessTokenCollection.deleteMany({});
    });

    beforeEach(() => {
        accessTokenRepository = new MongoAccessTokenRepository();

        sut = new MongoAccountRepository(accessTokenRepository);
    });

    afterEach(async () => {
        accountCollection.deleteMany({});
        accessTokenCollection.deleteMany({});
    });

    it('should return an account on success', async () => {
        const account = await sut.create({
            email: 'test@email.com',
            name: 'jon',
            password: '123',
        });

        expect(account).toBeTruthy();
        expect(account?.id).toBeTruthy();
        expect(account?.name).toBe('jon');
        expect(account?.email).toBe('test@email.com');
    });

    it('should find an account by email', async () => {
        await accountCollection.insertOne({
            email: 'test@email.com',
            name: 'jon',
            password: '123',
        });

        const account = await sut.findByEmail('test@email.com');

        expect(account).toBeTruthy();
        expect(account?.name).toBe('jon');
    });

    it('should return null if account does not exist', async () => {
        const account = await sut.findByEmail('test@email.com');

        expect(account).toBeFalsy();
    });

    it('should update user account accessToken', async () => {
        const account = await accountCollection.insertOne({
            email: 'test@email.com',
            name: 'jon',
            password: '123',
        });

        await accessTokenCollection.insertOne({
            account_id: account.insertedId,
            token: 'any_token',
        });

        await sut.updateAccessToken(account.insertedId as any, 'test_token');

        const accessToken = await sut.findAccessTokenByAccountId(
            account.insertedId as any,
        );

        expect(accessToken).toBe('test_token');
    });
});
