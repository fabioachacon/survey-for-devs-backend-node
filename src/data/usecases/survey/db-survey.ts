import { registry } from 'tsyringe';
import { SurveyEntity } from '../../../domain/entity/SurveyEntity';
import { SurveyModel } from '../../../domain/models/SurveyModel';
import { SurveyManager } from '../../../domain/usecases/survey-manager';
import { SurveyRepository } from '../../protocols/repositories';

export class DbSurvey implements SurveyManager {
    private readonly surveyRepository: SurveyRepository;

    constructor(surveyRepository: SurveyRepository) {
        this.surveyRepository = surveyRepository;
    }

    public async create(data: SurveyModel): Promise<SurveyEntity | null> {
        const survey = await this.surveyRepository.create(data);

        return survey;
    }
}
