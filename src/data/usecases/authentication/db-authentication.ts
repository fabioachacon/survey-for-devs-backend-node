import { AuthenticationModel } from '../../../domain/models/indext';
import { Authentication } from '../../../domain/usecases/authentication';
import { HashComparer } from '../../protocols/encryption/hash-comparer';
import { Encrypter } from '../../protocols/encryption/encrypter';
import {
    AccountRepository,
    AccessTokenRepository,
} from '../../protocols/repositories';

export class DbAuthentication implements Authentication {
    private readonly accountRespository: AccountRepository;
    private readonly accessTokenRepository: AccessTokenRepository;
    private readonly encrypter: Encrypter;
    private readonly hashComparer: HashComparer;

    constructor(
        accountRespository: AccountRepository,
        accessTokenRepository: AccessTokenRepository,
        Encrypter: Encrypter,
        hashComparer: HashComparer,
    ) {
        this.accountRespository = accountRespository;
        this.accessTokenRepository = accessTokenRepository;
        this.encrypter = Encrypter;
        this.hashComparer = hashComparer;
    }

    public async auth(credentials: AuthenticationModel): Promise<string> {
        const userAccount = await this.accountRespository.findByEmail(
            credentials.email,
        );

        if (!userAccount) return null;

        const matched = await this.hashComparer.compare(
            credentials.password,
            userAccount.password,
        );

        if (matched === false) return null;

        const token = await this.encrypter.encrypt(userAccount.id);

        await this.accessTokenRepository.update(userAccount.id, token);

        return token;
    }
}
