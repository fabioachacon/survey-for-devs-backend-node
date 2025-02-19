import bcrypt from 'bcrypt';
import { Encrypter } from '../../data/protocols';

export class BcryptAdapter implements Encrypter {
    private readonly salt: number;

    constructor(salt: number) {
        this.salt = salt;
    }

    public async encrypt(value: string) {
        return bcrypt.hash(value, this.salt);
    }
}
