import { SurveyRepository } from '../../../../../data/protocols/repositories';
import { SurveyEntity } from '../../../../../domain/entity/SurveyEntity';
import { SurveyModel } from '../../../../../domain/models/SurveyModel';
import { MongoUtils } from '../../helpers/mongo-utils';

export class MongoSurveyRepository implements SurveyRepository {
    public async create(data: SurveyModel) {
        await this.collection.insertOne(data);
    }

    private get collection() {
        return MongoUtils.getCollection('survey');
    }
}
