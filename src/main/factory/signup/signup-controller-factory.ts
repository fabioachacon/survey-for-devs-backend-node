import { MongoAccessTokenRepository } from '../../../infra/db/mongodb/repository/token/MongoAccessTokenRepository';
import { MongoAccountRepository } from '../../../infra/db/mongodb/repository/account/MongoAccountRepository';
import { BcryptAdapter } from '../../../infra/encryption/bcrypt/BcryptAdapter';
import { Controller } from '../../../presentation/controllers/protocols';
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller';
import { LogControllerDecorator } from '../../decorators/log';
import { getSignUpValidations } from './signup-validation-factory';
import { DbAccount } from '../../../data/usecases/account/db-account';
import { getDbAuthentication } from '../usecases/db-authentication-factory';
import { MongoErrorLogRepository } from '../../../infra/db/mongodb/repository/log/MongoErrorLogRepository';

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
