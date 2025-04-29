import { SurveyManager } from '../../../domain/usecases/survey-manager';
import { HttpRequest, HttpResponse } from '../../helpers/http/messages';
import { Validation } from '../../helpers/validators/validation';
import { Controller } from '../protocols';

export class SurveyController implements Controller {
    private readonly validation: Validation;
    private readonly surveyManager: SurveyManager;

    constructor(validation: Validation, surveyManager: SurveyManager) {
        this.validation = validation;
        this.surveyManager = surveyManager;
    }

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const body = request.getBody();

            const error = this.validation.validate(body);
            if (error) {
                return new HttpResponse().badRequest().body(error);
            }

            await this.surveyManager.create({
                question: body.question,
                answers: body.answers,
            });

            return new HttpResponse().noContent();
        } catch (error) {
            return new HttpResponse().serverError(error);
        }
    }
}
