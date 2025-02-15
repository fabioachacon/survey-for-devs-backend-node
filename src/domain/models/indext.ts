export type AccountModel = {
    name: string;
    email: string;
    password: string;
};

export type AccountEntity = {
    id: string;
} & AccountModel;
