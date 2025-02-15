import { inject, injectable } from 'tsyringe';

import { Controller, EmailValidator } from './protocols';
import { MissingParamError, InvalidParamError } from './http/errors/';
import { HttpRequest, HttpResponse } from './http/messages/';
import { Account } from '../../domain/usecases/account';

@injectable()
export class SignUpController implements Controller {
    private readonly emailvalidator: EmailValidator;
    private readonly account: Account;

    constructor(
        @inject('EmailValidator') emailvalidator: EmailValidator,
        @inject('Account') account: Account,
    ) {
        this.emailvalidator = emailvalidator;
        this.account = account;
    }

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const requestBody = request.getBody();
            const field = this.validateRequiredFeilds(requestBody);
            if (field) {
                return new HttpResponse()
                    .badRequest()
                    .body(new MissingParamError(field));
            }
            if (requestBody.password !== requestBody.passwordConfirmation) {
                return new HttpResponse()
                    .badRequest()
                    .body(new InvalidParamError('passwordConfirmation'));
            }
            if (!this.isValidEmail(requestBody.email)) {
                return new HttpResponse()
                    .badRequest()
                    .body(new InvalidParamError('email'));
            }

            this.account.create({
                name: requestBody.name,
                email: requestBody.email,
                password: requestBody.password,
            });
        } catch (error) {
            return new HttpResponse().serverError();
        }
    }

    private validateRequiredFeilds(body: object): string | undefined {
        const fields = ['name', 'email', 'password', 'passwordConfirmation'];
        for (const field of fields) {
            if (!body[field]) {
                return field;
            }
        }
    }

    private isValidEmail(email: string) {
        return this.emailvalidator.isValid(email);
    }
}
