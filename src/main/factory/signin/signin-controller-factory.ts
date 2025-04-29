import { Controller } from '../../../presentation/controllers/protocols';
import { SignInController } from '../../../presentation/controllers/signin/signin-controller';
import { LogControllerDecorator } from '../../decorators/log';
import { getDbAuthentication } from '../usecases/db-authentication-factory';
import { getSignInValidations } from './signin-validation-factory';
import { MongoErrorLogRepository } from '../../../infra/db/mongodb/repository/log/MongoErrorLogRepository';

export class SignInControllerFactory {
    public static create(): Controller {
        return new LogControllerDecorator(
            new SignInController(getDbAuthentication(), getSignInValidations()),
            new MongoErrorLogRepository(),
        );
    }
}
