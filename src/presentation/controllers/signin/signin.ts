import { Authentication } from '../../../domain/usecases/authentication';
import { Validation } from '../../helpers/validators/validation';
import {
    InvalidParamError,
    MissingParamError,
} from '../../helpers/http/errors';
import { HttpRequest, HttpResponse } from '../../helpers/http/messages';
import { Controller, EmailValidator } from '../protocols';

export class SignInController implements Controller {
    private readonly validation: Validation;
    private readonly authentication: Authentication;

    constructor(authentication: Authentication, validation: Validation) {
        this.validation = validation;
        this.authentication = authentication;
    }

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const requestBody = request.getBody();

            const validationError = this.validation.validate(requestBody);
            if (validationError) {
                return new HttpResponse().badRequest().body(validationError);
            }

            const { email, password } = requestBody;
            const authToken = await this.authentication.auth({
                email,
                password,
            });

            if (!authToken) {
                return new HttpResponse().unathorized();
            }

            return new HttpResponse().ok({ token: authToken });
        } catch (error) {
            return new HttpResponse().serverError(error as Error);
        }
    }

    private validateRequiredFeilds(body: object): string | undefined {
        const fields = ['email', 'password'];

        for (const field of fields) {
            if (!body[field]) {
                return field;
            }
        }
    }
}
