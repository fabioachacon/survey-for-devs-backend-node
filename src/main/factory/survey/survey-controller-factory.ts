import { DbSurvey } from '../../../data/usecases/survey/db-survey';
import { MongoSurveyRepository } from '../../../infra/db/mongodb/repository/survey/MongoSurveyRepository';
import { SurveyController } from '../../../presentation/controllers/survey/survey-controller';
import { getSurveysValidations } from './survey-validation-factory';

export class SurveyControllerFactory {
    public static create() {
        return new SurveyController(
            getSurveysValidations(),
            new DbSurvey(new MongoSurveyRepository()),
        );
    }
}
