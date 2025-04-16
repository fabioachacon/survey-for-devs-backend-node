import { CredentialsModel } from '../models/indext';

export interface Authentication {
    auth(credentials: CredentialsModel): Promise<string>;
}
