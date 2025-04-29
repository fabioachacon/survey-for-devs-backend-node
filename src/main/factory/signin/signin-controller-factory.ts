import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication';
import { MongoErrorLogRepository } from '../../../infra/db/mongodb/repository/LogErrorRepository';
import { MongoAccessTokenRepository } from '../../../infra/db/mongodb/repository/MongoAccessTokenRepository';
import { MongoAccountRepository } from '../../../infra/db/mongodb/repository/MongoAccountRepository';
import { BcryptAdapter } from '../../../infra/encryption/bcrypt/BcryptAdapter';
import { JwtAdapter } from '../../../infra/encryption/jwt/jwt-adapter';
import { Controller } from '../../../presentation/controllers/protocols';
import { SignInController } from '../../../presentation/controllers/signin/signin-controller';
import env from '../../config/env';
import { LogControllerDecorator } from '../../decorators/log';
import { getDbAuthentication } from '../usecases/db-authentication-factory';
import { getSignInValidations } from './signin-validation-factory';

export class SignInControllerFactory {
    public static create(): Controller {
        return new LogControllerDecorator(
            new SignInController(getDbAuthentication(), getSignInValidations()),
            new MongoErrorLogRepository(),
        );
    }
}
