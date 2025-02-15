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
        this.body(body);
        this.statusCode(StatusCodes.Ok);
        return this;
    }

    public badRequest() {
        return this.statusCode(StatusCodes.BAD_REQUEST);
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
