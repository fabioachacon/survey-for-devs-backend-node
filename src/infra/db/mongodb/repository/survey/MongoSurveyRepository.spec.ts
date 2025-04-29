import { Collection, Document } from 'mongodb';
import env from '../../../../../main/config/env';
import { MongoUtils } from '../../helpers/mongo-utils';

import { MongoSurveyRepository } from './MongoSurveyRepository';

describe('MongoSurveyRepository', () => {
    let surveyCollection: Collection<Document>;

    let sut: MongoSurveyRepository;

    beforeAll(async () => {
        await MongoUtils.connect(env.mongUrl);
    });

    beforeEach(async () => {
        surveyCollection = MongoUtils.getCollection('survey');
        await surveyCollection.deleteMany({});
    });

    beforeEach(() => {
        sut = new MongoSurveyRepository();
    });

    afterAll(async () => {
        await MongoUtils.disconnect();
    });

    it('should create a new survey', async () => {
        await sut.create({
            question: 'any_question',
            answers: [
                {
                    image: 'any_image1.png',
                    answer: 'any_answer1',
                },
                {
                    answer: 'any_answer2',
                },
            ],
        });

        const insertionResult = await surveyCollection.findOne({
            question: 'any_question',
        });

        expect(insertionResult?._id).toBeTruthy();
    });
});
