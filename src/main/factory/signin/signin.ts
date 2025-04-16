import { MongoErrorLogRepository } from '../../../infra/db/mongodb/repository/LogErrorRepository';
import { Controller } from '../../../presentation/controllers/protocols';
import { SignInController } from '../../../presentation/controllers/signin/signin';
import { LogControllerDecorator } from '../../decorators/log';
import { getSignInValidations } from './signin-validation';

export class SignInControllerFactory {
    public static create(): Controller {
        return new LogControllerDecorator(
            new SignInController(null, getSignInValidations()),
            new MongoErrorLogRepository(),
        );
    }
}
