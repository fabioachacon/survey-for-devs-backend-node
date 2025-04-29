import { SurveyEntity } from '../entity/SurveyEntity';
import { SurveyModel } from '../models/SurveyModel';

export interface SurveyManager {
    create(data: SurveyModel): Promise<SurveyEntity | null>;
}
