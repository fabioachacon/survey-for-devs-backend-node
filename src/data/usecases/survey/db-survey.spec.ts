import { mock, MockProxy } from 'jest-mock-extended';
import { DbSurvey } from './db-survey';
import { SurveyRepository } from '../../protocols/repositories';

describe('DbSurvey', () => {
    const surveyData = {
        question: 'any_question',
        answers: [
            {
                image: 'any_image.png',
                answer: 'any_answer',
            },
        ],
    };

    let surveryRepositoryStub: MockProxy<SurveyRepository>;

    let sut: DbSurvey;

    beforeEach(() => {
        surveryRepositoryStub = mock<SurveyRepository>();

        sut = new DbSurvey(surveryRepositoryStub);
    });

    it('should call SurveyRepository.create with correct values', async () => {
        await sut.create(surveyData);

        expect(surveryRepositoryStub.create).toHaveBeenCalledWith(surveyData);
    });

    it('should throw if SurveyRepository.create throws', async () => {
        surveryRepositoryStub.create.mockImplementationOnce(() => {
            throw new Error('');
        });

        const promise = sut.create(surveyData);

        expect(promise).rejects.toThrow();
    });
});
