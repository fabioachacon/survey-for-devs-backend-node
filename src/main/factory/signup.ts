import { DbAddAccount } from '../../data/usecases/DbAddAccount';
import { MongoAccountRepository } from '../../infra/db/mongodb/repository/MongoAccountRepository';
import { BcryptAdapter } from '../../infra/encryption/BcryptAdapter';
import {
    HttpRequest,
    HttpResponse,
} from '../../presentation/controllers/http/messages';
import { Controller } from '../../presentation/controllers/protocols';
import { SignUpController } from '../../presentation/controllers/signup/signup';
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter';
import { LogControllerDecorator } from '../decorators/log';

export class SignUpControllerFactory {
    public static create(): Controller {
        const emailValidator = new EmailValidatorAdapter();
        const bcryptAdapter = new BcryptAdapter(12);
        const mongoAddAccountRepository = new MongoAccountRepository();
        const dbAddAccount = new DbAddAccount(
            bcryptAdapter,
            mongoAddAccountRepository,
        );

        return new LogControllerDecorator(
            new SignUpController(dbAddAccount, emailValidator),
        );
    }
}
