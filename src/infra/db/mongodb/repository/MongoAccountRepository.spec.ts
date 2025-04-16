import { MongoAccountRepository } from './MongoAccountRepository';
import { MongoUtils } from '../helpers/connection';

describe('MongoAccountRepository', () => {
    let sut: MongoAccountRepository;

    beforeAll(async () => {
        await MongoUtils.connect('mongodb://localhost:4444/mongo-db');
    });

    afterEach(async () => {
        MongoUtils.getCollection('accounts').deleteMany({});
    });

    beforeEach(() => {
        sut = new MongoAccountRepository();
    });

    it('should return an account on success', async () => {
        const account = await sut.create({
            email: 'test@email.com',
            name: 'jon',
            password: '123',
        });

        expect(account).toBeTruthy();
        expect(account.id).toBeTruthy();
        expect(account.name).toBe('jon');
    });
});
