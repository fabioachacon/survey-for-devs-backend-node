import bcrypt from 'bcrypt';
import { Encrypter } from '../../data/protocols/encryption/encrypter';

export class BcryptAdapter implements Encrypter {
    private readonly salt: number;

    constructor(salt: number) {
        this.salt = salt;
    }

    public async encrypt(value: string) {
        const hashed = await bcrypt.hash(value, this.salt);

        return hashed;
    }
}
