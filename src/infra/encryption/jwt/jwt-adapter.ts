import jwt from 'jsonwebtoken';
import { Encrypter } from '../../../data/protocols/encryption/encrypter';

export class JwtAdapter implements Encrypter {
    private readonly secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    public async encrypt(value: string): Promise<string> {
        const jwtToken = jwt.sign({ id: value }, this.secret);

        return jwtToken;
    }
}
