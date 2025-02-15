import { inject, injectable } from 'tsyringe';

import { HttpRequest } from './http/messages/HttpRequest';
import { HttpResponse } from './http/messages/HttpResponse';
import { MissingParamError, InvalidParamError } from './http/errors/';
import { Controller } from './protocols/controller';

import { EmailValidator } from './protocols/email-validator';

@injectable()
export class SignUpController implements Controller {
    private readonly emailvalidator: EmailValidator;

    constructor(@inject('EmailValidator') emailvalidator: EmailValidator) {
        this.emailvalidator = emailvalidator;
    }

    public async handleRequest(request: HttpRequest): Promise<HttpResponse> {
        try {
            const requestBody = request.getBody();
            const field = this.validateRequiredFeilds(requestBody);
            if (field) {
                return new HttpResponse()
                    .badRequest()
                    .body(new MissingParamError(field));
            }
            if (!this.isValidEmail(requestBody.email)) {
                return new HttpResponse()
                    .badRequest()
                    .body(new InvalidParamError('email'));
            }
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
