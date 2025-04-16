export class HttpRequest<B = Record<string, any>, H = Record<string, any>> {
    #body: B;
    #headers: H;

    constructor(data?: { body?: B; headers?: H }) {
        this.#body = data?.body;
        this.#headers = data?.headers;
    }

    public body<T extends B>(body: T) {
        this.#body = body as T;
        return this;
    }

    public getBody() {
        return this.#body;
    }

    public getHeaders() {
        return this.#headers;
    }

    get properties() {
        return {
            body: this.#body,
            headers: this.#headers,
        };
    }
}
