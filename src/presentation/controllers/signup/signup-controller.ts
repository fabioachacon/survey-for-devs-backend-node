import { Controller } from '../protocols';

import { HttpRequest, HttpResponse } from '../../helpers/http/messages';
import { AccountManager } from '../../../domain/usecases/account-manager';
import { Validation } from '../../helpers/validators/validation';
import { Authentication } from '../../../domain/usecases/authentication';

export class SignUpController implements Controller {
    private readonly accountManager: AccountManager;
    private readonly authentication: Authentication;
    private readonly validation: Validation;

    constructor(
        accountManager: AccountManager,
        authentication: Authentication,
        validation: Validation,
    ) {
        this.accountManager = accountManager;
        this.authentication = authentication;
        this.validation = validation;
    }

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const body = request.getBody();

            const validationError = this.validation.validate(body);
            if (validationError) {
                return new HttpResponse().badRequest().body(validationError);
            }

            const { name, email, password } = body;

            const account = await this.accountManager.create({
                name,
                email,
                password,
            });

            if (account) {
                const token = await this.authentication.auth({
                    email,
                    password,
                });

                return new HttpResponse().ok({
                    name: account.name,
                    email: account.email,
                    token: token,
                });
            }
        } catch (error) {
            return new HttpResponse().serverError(error);
        }
    }
}
