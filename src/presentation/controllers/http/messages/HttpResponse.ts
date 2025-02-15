import { ServerError } from '../errors/ServerError';
import { StatusCodes } from '../StatusCode';

export class HttpResponse {
    private _body: object | unknown;
    private _headers: object | unknown;
    private _statusCode: number;

    public body(body: any) {
        this._body = body;
        return this;
    }

    public headers(header: object) {
        this._headers = header;
        return this;
    }

    public statusCode(code: number) {
        this._statusCode = code;
        return this;
    }

    public ok(body?: object) {
        return this.statusCode(StatusCodes.Ok).body(body);
    }

    public badRequest() {
        return this.statusCode(StatusCodes.BAD_REQUEST);
    }

    public serverError() {
        return this.statusCode(StatusCodes.INTERNAL_SERVER_ERROR).body(
            new ServerError(),
        );
    }

    public getBody() {
        return this._body;
    }

    public getHeaders() {
        return this._headers;
    }

    public getStatusCode() {
        return this._statusCode;
    }
}
