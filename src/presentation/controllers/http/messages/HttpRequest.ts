export class HttpRequest<B = Record<string, any>, H = Record<string, any>> {
    private _body: B;
    private headers: H;

    constructor(data?: { body?: B; headers?: H }) {
        this._body = data?.body;
        this.headers = data?.headers;
    }

    public body<T extends B>(body: T) {
        this._body = body as T;
        return this;
    }

    public getBody() {
        return this._body;
    }

    public getHeaders() {
        return this.headers;
    }
}
