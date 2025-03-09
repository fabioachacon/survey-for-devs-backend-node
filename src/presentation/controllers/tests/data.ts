import { HttpRequest } from '../http/messages/HttpRequest';

export const getFakeRequestData = () => {
    return new HttpRequest().body({
        name: 'any_name',
        email: 'email@test.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
    });
};
