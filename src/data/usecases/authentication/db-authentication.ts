import { CredentialsModel } from '../../../domain/models/indext';
import { Authentication } from '../../../domain/usecases/authentication';
import { HashComparer } from '../../protocols/encryption/hash-comparer';
import { TokenGenerator } from '../../protocols/encryption/token-generator';
import {
    LoadAccountRespository,
    UpdateAccessTokenRepository,
} from '../../protocols/repositories';

export class DbAuthentication implements Authentication {
    private readonly loadAccountRespository: LoadAccountRespository;
    private readonly hashComparer: HashComparer;
    private readonly tokenGenerator: TokenGenerator;
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository;

    constructor(
        loadAccountRespository: LoadAccountRespository,
        hashComparer: HashComparer,
        tokenGenerator: TokenGenerator,
        updateAccessTokenRepository: UpdateAccessTokenRepository,
    ) {
        this.loadAccountRespository = loadAccountRespository;
        this.hashComparer = hashComparer;
        this.tokenGenerator = tokenGenerator;
        this.updateAccessTokenRepository = updateAccessTokenRepository;
    }

    public async auth(credentials: CredentialsModel): Promise<string> {
        const account = await this.loadAccountRespository.byEmail(
            credentials.email,
        );

        if (!account) return null;

        const mached = await this.hashComparer.compare(
            credentials.password,
            account.password,
        );

        if (mached === false) return null;

        const token = await this.tokenGenerator.generate(account.id);

        await this.updateAccessTokenRepository.update(account.id, token);

        return token;
    }
}
