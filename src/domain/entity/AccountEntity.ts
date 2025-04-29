import { AccountModel } from '../models/AccountModel';

export type AccountEntity = {
    id: string;
} & AccountModel;
