import { mock, MockProxy } from 'jest-mock-extended';
import { HttpRequest, HttpResponse } from '../../helpers/http/messages';
import { SurveyController } from './survey-controller';
import { Validation } from '../../helpers/validators/validation';
import { SurveyManager } from '../../../domain/usecases/survey-manager';

describe('SurveyController', () => {
    let httpRequest: HttpRequest;

    let validationStub: MockProxy<Validation>;

    let surveyManagerStub: MockProxy<SurveyManager>;

    let sut: SurveyController;

    beforeEach(() => {
        httpRequest = new HttpRequest().body({
            question: 'any_question',
            answers: [
                {
                    image: 'any_image.png',
                    answer: 'any_answer',
                },
            ],
        });

        validationStub = mock<Validation>();

        surveyManagerStub = mock<SurveyManager>();

        sut = new SurveyController(validationStub, surveyManagerStub);
    });

    it('should call Validation.validate with correct values', async () => {
        await sut.handle(httpRequest);

        expect(validationStub.validate).toHaveBeenCalledWith(
            httpRequest.getBody(),
        );
    });

    it('should return 400 if validation fails', async () => {
        validationStub.validate.mockReturnValueOnce(
            new Error('validation_error'),
        );

        const response = await sut.handle(httpRequest);

        expect(response.properties).toEqual(
            new HttpResponse().badRequest().body(new Error('validation_error'))
                .properties,
        );
    });

    it('should call SurveyManager.create with correct values', async () => {
        validationStub.validate.mockReturnValueOnce(null);

        await sut.handle(httpRequest);

        expect(surveyManagerStub.create).toHaveBeenCalledWith(
            httpRequest.getBody(),
        );
    });

    it('should return 500 if SurveyManager.create throws', async () => {
        surveyManagerStub.create.mockImplementationOnce(() => {
            throw new Error();
        });

        const response = await sut.handle(httpRequest);

        expect(response.properties).toEqual(
            new HttpResponse().serverError(new Error()).properties,
        );
    });

    it('should return 200 on success', async () => {
        surveyManagerStub.create.mockResolvedValueOnce(null);

        const response = await sut.handle(httpRequest);

        expect(response.properties).toEqual(
            new HttpResponse().noContent().properties,
        );
    });
});
