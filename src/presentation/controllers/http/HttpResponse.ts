export class HttpResponse {
  public body: object | unknown;
  public statusCode: number;

  constructor(params?: { body?: unknown; statusCode?: number }) {
    this.body = params?.body;
    this.statusCode = params?.statusCode;
  }
}
