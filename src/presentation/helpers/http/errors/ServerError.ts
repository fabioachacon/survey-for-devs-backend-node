export class ServerError extends Error {
    constructor(error?: Error) {
        super('Internal Server Error');
        this.stack = error?.stack;
        this.name = 'ServerError';
    }
}
