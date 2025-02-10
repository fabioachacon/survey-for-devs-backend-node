export class HttpResponse {
  private headers: object | unknown;
  private body: object | unknown;
  private code: number;

  public payload(body: any) {
    this.body = body;
    return this;
  }

  public statusCode(code: number) {
    this.code = code;
    return this;
  }

  public setHeaders(header: object) {
    this.headers = header;
    return this;
  }

  public getStatusCode() {
    return this.code;
  }

  public getBody() {
    return this.body;
  }

  public getHeaders() {
    return this.headers;
  }
}
