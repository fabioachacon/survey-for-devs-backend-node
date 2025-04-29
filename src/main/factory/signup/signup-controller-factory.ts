import env from '../../config/env';

import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication';
import { MongoErrorLogRepository } from '../../../infra/db/mongodb/repository/LogErrorRepository';
import { MongoAccessTokenRepository } from '../../../infra/db/mongodb/repository/MongoAccessTokenRepository';
import { MongoAccountRepository } from '../../../infra/db/mongodb/repository/MongoAccountRepository';
import { BcryptAdapter } from '../../../infra/encryption/bcrypt/BcryptAdapter';
import { JwtAdapter } from '../../../infra/encryption/jwt/jwt-adapter';
import { Controller } from '../../../presentation/controllers/protocols';
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller';
import { LogControllerDecorator } from '../../decorators/log';
import { getSignUpValidations } from './signup-validation-factory';
import { DbAccount } from '../../../data/usecases/account/db-account';
import { getDbAuthentication } from '../usecases/db-authentication-factory';

export class SignUpControllerFactory {
    public static create(): Controller {
        return new LogControllerDecorator(
            new SignUpController(
                this.createDbAddAccount(),
                getDbAuthentication(),
                getSignUpValidations(),
            ),
            new MongoErrorLogRepository(),
        );
    }

    private static createDbAddAccount() {
        return new DbAccount(
            new MongoAccountRepository(new MongoAccessTokenRepository()),
            new BcryptAdapter(12),
        );
    }
}
