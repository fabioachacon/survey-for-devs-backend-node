import 'reflect-metadata';

import { HttpRequest } from './http/messages/HttpRequest';
import { HttpResponse } from './http/messages/HttpResponse';
import { MissingParamError } from './http/errors/MissingParamError';
import { Controller } from './protocols/controller';
import { inject, injectable } from 'tsyringe';
import { EmailValidator } from './protocols/email-validator';
import { InvalidParamError } from './http/errors/InvalidParamError';

@injectable()
export class SignUpController implements Controller {
    private readonly emailvalidator: EmailValidator;

    constructor(@inject('EmailValidator') emailvalidator: EmailValidator) {
        this.emailvalidator = emailvalidator;
    }

    public async handleRequest(request: HttpRequest): Promise<HttpResponse> {
        const requestBody = request.getBody();

        const missingField = this.validateRequiredFeilds(requestBody);
        if (missingField) {
            return new HttpResponse()
                .badRequest()
                .body(new MissingParamError(missingField));
        }
        if (!this.isValidEmail(requestBody.email)) {
            return new HttpResponse()
                .badRequest()
                .body(new InvalidParamError('email'));
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
