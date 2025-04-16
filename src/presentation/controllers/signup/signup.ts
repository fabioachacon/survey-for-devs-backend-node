import { Controller, EmailValidator } from '../protocols';
import {
    MissingParamError,
    InvalidParamError,
} from '../../helpers/http/errors';
import { HttpRequest, HttpResponse } from '../../helpers/http/messages';
import { AccountManager } from '../../../domain/usecases/account';
import { Validation } from '../../helpers/validators/validation';

export class SignUpController implements Controller {
    private readonly account: AccountManager;
    private readonly validation: Validation;

    constructor(account: AccountManager, validation: Validation) {
        this.account = account;
        this.validation = validation;
    }

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const requestBody = request.getBody();

            const validationError = this.validation.validate(requestBody);
            if (validationError) {
                return new HttpResponse().badRequest().body(validationError);
            }

            const account = await this.account.create({
                name: requestBody.name,
                email: requestBody.email,
                password: requestBody.password,
            });

            if (account) {
                return new HttpResponse().ok(account);
            }
        } catch (error) {
            return new HttpResponse().serverError(error);
        }
    }
}
