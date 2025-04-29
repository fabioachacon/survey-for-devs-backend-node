import { ServerError } from '../errors/ServerError';
import { UnauthorizedError } from '../errors/Unauthorized';
import { StatusCodes } from '../StatusCode';

export class HttpResponse {
    #body: Record<string, any> | null;
    #headers: Record<string, any> | null;
    #statusCode: number;

    public body(body: any) {
        this.#body = body;
        return this;
    }

    public headers(header: object) {
        this.#headers = header;
        return this;
    }

    public statusCode(code: number) {
        this.#statusCode = code;
        return this;
    }

    public ok(body?: object | null) {
        return this.statusCode(StatusCodes.Ok).body(body);
    }

    public badRequest() {
        return this.statusCode(StatusCodes.BadRequest);
    }

    public noContent() {
        return this.statusCode(StatusCodes.noContent).body(null);
    }

    public serverError(error: Error) {
        return this.statusCode(StatusCodes.InternalServerError).body(
            new ServerError(error),
        );
    }

    public unathorized() {
        return this.statusCode(StatusCodes.Unauthorized).body(
            new UnauthorizedError(),
        );
    }

    public forbidden() {
        return this.statusCode(StatusCodes.Forbidden);
    }

    public getBody() {
        return this.#body;
    }

    public getHeaders() {
        return this.#headers;
    }

    public getStatusCode() {
        return this.#statusCode;
    }

    public get properties() {
        return {
            body: this.#body,
            headers: this.#headers,
            statusCode: this.#statusCode,
        };
    }
}
