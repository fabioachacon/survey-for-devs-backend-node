import { container } from 'tsyringe';
import {
    Controller,
    EmailValidator,
} from '../../presentation/controllers/protocols';
import { SignUpController } from '../../presentation/controllers/signup/signup';
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter';
import { AccountManager } from '../../domain/usecases/account';
import { DbAddAccount } from '../../data/usecases/DbAddAccount';
import { AccountRepository, Encrypter } from '../../data/protocols';
import { BcryptAdapter } from '../../infra/encryption/BcryptAdapter';
import { MongoAccountRepository } from '../../infra/db/mongodb/repository/MongoAccountRepository';

// container.registerSingleton<Controller>('Controller', SignUpController);
// container.registerSingleton<AccountManager>('AccountManager', DbAddAccount);
// container.registerSingleton<Encrypter>('Encrypter', BcryptAdapter);
// container.registerSingleton<AccountRepository>(
//     'AccountRepository',
//     MongoAccountRepository,
// );
// container.registerSingleton<EmailValidator>(
//     'EmailValidator',
//     EmailValidatorAdapter,
// );
