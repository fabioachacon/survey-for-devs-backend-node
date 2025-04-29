import { LogErrorRepository } from '../../../../data/protocols/repositories';
import { MongoUtils } from '../helpers/mongo-utils';

export class MongoErrorLogRepository implements LogErrorRepository {
    public async log(stack: string): Promise<void> {
        const errorCollection = MongoUtils.getCollection('errors');

        await errorCollection.insertOne({
            stack: stack,
            date: new Date(),
        });
    }
}
