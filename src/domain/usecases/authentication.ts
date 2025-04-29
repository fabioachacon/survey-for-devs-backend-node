import { AuthenticationModel } from '../models/indext';

export interface Authentication {
    auth(credentials: AuthenticationModel): Promise<string | null>;
}
