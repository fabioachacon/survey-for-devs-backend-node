import { Authentication } from '../../../domain/usecases/authentication';
import { Validation } from '../../helpers/validators/validation';

import { HttpRequest, HttpResponse } from '../../helpers/http/messages';
import { Controller } from '../protocols';

export class SignInController implements Controller {
    private readonly authentication: Authentication;
    private readonly validation: Validation;

    constructor(authentication: Authentication, validation: Validation) {
        this.validation = validation;
        this.authentication = authentication;
    }

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const body = request.getBody();

            const validationError = this.validation.validate(body);
            if (validationError) {
                return new HttpResponse().badRequest().body(validationError);
            }

            const { email, password } = body;
            const token = await this.authentication.auth({
                email,
                password,
            });

            if (!token) {
                return new HttpResponse().unathorized();
            }

            return new HttpResponse().ok({ token });
        } catch (error) {
            return new HttpResponse().serverError(error);
        }
    }
}
