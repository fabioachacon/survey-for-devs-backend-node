import bcrypt from 'bcrypt';
import { Hasher } from '../../../data/protocols/encryption/hasher';
import { HashComparer } from '../../../data/protocols/encryption/hash-comparer';

export class BcryptAdapter implements Hasher, HashComparer {
    private readonly salt: number;

    constructor(salt: number) {
        this.salt = salt;
    }

    public async hash(value: string) {
        const hashed = await bcrypt.hash(value, this.salt);
        return hashed;
    }

    public async compare(value: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(value, hash);
    }
}
