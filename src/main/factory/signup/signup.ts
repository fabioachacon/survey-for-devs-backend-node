import { DbAddAccount } from '../../../data/usecases/addAccount/db-addAccount';
import { MongoErrorLogRepository } from '../../../infra/db/mongodb/repository/LogErrorRepository';
import { MongoAccountRepository } from '../../../infra/db/mongodb/repository/MongoAccountRepository';
import { BcryptAdapter } from '../../../infra/encryption/BcryptAdapter';
import { Controller } from '../../../presentation/controllers/protocols';
import { SignUpController } from '../../../presentation/controllers/signup/signup';
import { LogControllerDecorator } from '../../decorators/log';
import { getSignUpValidations } from './signup-validation';

export class SignUpControllerFactory {
    public static create(): Controller {
        return new LogControllerDecorator(
            new SignUpController(getDbAddAccount(), getSignUpValidations()),
            new MongoErrorLogRepository(),
        );
    }
}

const getDbAddAccount = () => {
    return new DbAddAccount(
        new BcryptAdapter(12),
        new MongoAccountRepository(),
    );
};
