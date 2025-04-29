import { SurveyModel } from '../models/SurveyModel';

export interface SurveyManager {
    create(data: SurveyModel): Promise<void>;
}
