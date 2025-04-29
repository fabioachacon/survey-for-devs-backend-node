import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication';
import { MongoAccessTokenRepository } from '../../../infra/db/mongodb/repository/token/MongoAccessTokenRepository';
import { MongoAccountRepository } from '../../../infra/db/mongodb/repository/account/MongoAccountRepository';
import { BcryptAdapter } from '../../../infra/encryption/bcrypt/BcryptAdapter';
import { JwtAdapter } from '../../../infra/encryption/jwt/jwt-adapter';
import env from '../../config/env';

export const getDbAuthentication = () => {
    const accessTokenRepository = new MongoAccessTokenRepository();

    const accountRespository = new MongoAccountRepository(
        accessTokenRepository,
    );

    const jwtAdapter = new JwtAdapter(env.jwtSecret);

    const bcryptAdapter = new BcryptAdapter(12);

    return new DbAuthentication(
        accountRespository,
        accessTokenRepository,
        jwtAdapter,
        bcryptAdapter,
    );
};
